const cloudinary = require("cloudinary").v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Get from Cloudinary dashboard
  api_key: process.env.CLOUDINARY_API_KEY, // Get from Cloudinary dashboard
  api_secret: process.env.CLOUDINARY_API_SECRET, // Get from Cloudinary dashboard
});

module.exports = cloudinary;
