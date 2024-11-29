import UserModel from '../models/usermodel.js'; // Adjust the path accordingly

// Controller function to get profile photos of the first 5 users
export const getProfilePhotos = async (req, res) => {
  try {
    // Fetch the first 5 users sorted by creation date
    const users = await UserModel.find({}, 'profilePhoto')
      .sort({ createdAt: 1 })
      .limit(4);

    // Extract the profile photos
    const profilePhotos = users.map(user => user.profilePhoto);

    res.status(200).json({
      success: true,
      data: profilePhotos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching profile photos',
      error: error.message,
    });
  }
};
