import mongoose from 'mongoose';

// Define the Crop schema
const cropSchema = new mongoose.Schema({
    crop: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
}, {
    timestamps: true // Optional: Adds createdAt and updatedAt fields
});

// Create the Crop model with the collection name 'cropname'
const Crop = mongoose.model('Crop', cropSchema, 'cropname');

export default Crop;
