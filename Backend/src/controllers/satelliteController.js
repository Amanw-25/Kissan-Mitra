// controllers/satelliteController.js
import puppeteer from 'puppeteer';
import cloudinary from '../config/cloudinaryConfig.js';
import UserModel from "../models/usermodel.js"; 

export const generateSatelliteImage = async (req, res) => {
    try {
        const { lat, lng } = req.params;
        const zoom = req.query.zoom || 500;  // Default zoom level to 500
        const radius = req.query.radius || 50;  // Default radius to 50 meters
        const userId = req.user._id;  

        if (!lat || !lng) {
            console.error('Missing latitude or longitude');
            return res.status(400).json({ message: 'Please provide latitude and longitude' });
        }

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Satellite Image</title>
            <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
            <style>
                #map { height: 800px; width: 800px; }
                body { margin: 0; }
            </style>
        </head>
        <body>
            <div id="map"></div>
            <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
            <script>
                var map = L.map('map').setView([${lat}, ${lng}], ${zoom});
                
                L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'Tiles &copy; Esri'
                }).addTo(map);

                L.circle([${lat}, ${lng}], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.2,
                    radius: ${radius}
                }).addTo(map);

                // Add a marker to indicate the location
                L.marker([${lat}, ${lng}]).addTo(map)
                    .bindPopup('Your Location')
                    .openPopup();
            </script>
        </body>
        </html>
        `;

        await page.setContent(html);
        
        // Capture the screenshot
        const screenshotBuffer = await page.screenshot({ type: 'png' });

        await browser.close();

        // Upload to Cloudinary
        cloudinary.v2.uploader.upload_stream(
            { resource_type: 'image', public_id: `satellite-image-${Date.now()}` },
            async (error, result) => {
                if (error) {
                    console.error('Cloudinary upload error:', error);
                    return res.status(500).json({ message: 'Error uploading image to Cloudinary' });
                }

                // Find the user and update their satellite image URL
                const user = await UserModel.findById(userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                user.satelliteImage = result.secure_url;
                await user.save();

                res.json({
                    message: 'Satellite image generated and uploaded successfully',
                    imageUrl: result.secure_url,
                });
            }
        ).end(screenshotBuffer);

    } catch (error) {
        console.error('Error during image generation:', error);
        res.status(500).json({ message: 'Error generating satellite image' });
    }
};
