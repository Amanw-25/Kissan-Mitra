import Crop from '../models/AllCropModel.js'; // Adjust the path as needed

// Controller to fetch all crops
const getAllCrops = async (req, res) => {
    try {
        const crops = await Crop.find(); // Fetch all crops from the database
        res.status(200).json({
            success: true,
            data: crops
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

export { getAllCrops };
