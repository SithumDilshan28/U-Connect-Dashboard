const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../cloudinaryConfig");

//        !!!!!!!!   IMPORTANT     !!!!!!!!!
// GET USER ROLE
const getRole = async (req, res) => {
  const { role } = await User.findById(req.user.id);

  res.status(200).json(role);
};

//Register user
const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    address,
    birthday,
    username,
    password,
    email,
  } = req.body;

  // Set default profile picture
  let profilePicture = "/assets/images/profile-34.jpeg";

  try {
    // If profile picture is provided in the request, upload to Cloudinary
    if (req.body.profilePicture) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(
          req.body.profilePicture,
          { folder: "profile_pictures" } // Specify folder in Cloudinary
        );
        profilePicture = uploadResponse.secure_url; // Store uploaded image URL
      } catch (cloudinaryError) {
        return res.status(500).json({
          error: "Error uploading image to Cloudinary",
        });
      }
    }

    // Check if user with the same username or email already exists
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User with the same email or username already exists",
      });
    }

    // Encrypt the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    // Create the new user
    const user = await User.create({
      firstName,
      lastName,
      phone,
      address,
      birthday,
      username,
      password: hashedPwd,
      email,
      profilePicture, // Either default or Cloudinary URL
      status: null,
      lastSeen: null,
      role: "user",
      resetPasswordToken: null,
      resetPasswordExpires: null,
      userType: null,
      field: null,
      description: null,
    });

    // Return success response
    if (user) {
      return res.status(201).json({
        message: "User registered successfully",
        user, // Optionally, return the user data
      });
    }
  } catch (error) {
    // Catch general errors during registration
    return res.status(500).json({
      error: "Something went wrong during registration",
    });
  }
};

//Register EXPERT
const registerExpert = async (req, res) => {
  const {
    firstName,
    lastName,
    phone,
    address,
    birthday,
    username,
    password,
    email,
    field,
    description,
  } = req.body;

  // Set default profile picture
  let profilePicture = "/assets/images/profile-34.jpeg";

  try {
    // If profile picture is provided in the request, upload to Cloudinary
    if (req.body.profilePicture) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(
          req.body.profilePicture,
          { folder: "profile_pictures" } // Specify folder in Cloudinary
        );
        profilePicture = uploadResponse.secure_url; // Store uploaded image URL
      } catch (cloudinaryError) {
        return res.status(500).json({
          error: "Error uploading image to Cloudinary",
        });
      }
    }

    // Check if user with the same username or email already exists
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User with the same email or username already exists",
      });
    }

    // Encrypt the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);

    // Create the new user
    const user = await User.create({
      firstName,
      lastName,
      phone,
      address,
      birthday,
      username,
      password: hashedPwd,
      email,
      profilePicture, // Either default or Cloudinary URL
      status: null,
      lastSeen: null,
      role: "expert",
      resetPasswordToken: null,
      resetPasswordExpires: null,
      userType: null,
      field,
      description,
    });

    // Return success response
    if (user) {
      return res.status(201).json({
        message: "Expert registered successfully",
        user, // Optionally, return the user data
      });
    }
  } catch (error) {
    // Catch general errors during registration
    return res.status(500).json({
      error: "Something went wrong during registration",
    });
  }
};

//Login user

const login = async (req, res) => {
  try {
    if (req.body && req.body.email && req.body.password) {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (await bcrypt.compareSync(req.body.password, user.password)) {
          //generate jwt token
          const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
          });

          res.status(200).json({ message: "Login successful", token });
        } else {
          res.status(401).json({
            error: "Incorrect Password!",
          });
        }
      } else {
        res.status(401).json({
          error: "User not registered!",
        });
      }
    } else {
      res.status(401).json({
        error: "Please fill out the form!",
      });
    }
  } catch (e) {
    res.status(401).json({
      error: "Something went wrong!\n",
    });
  }
};

// Get Currently logged user
const getCurrentUser = async (req, res) => {
  try {
    // Assuming you have a middleware that adds the user ID to the req object (e.g., from a JWT)
    const userId = req.user.id;

    // Fetch the user's data from the database
    const user = await User.findById(userId).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send back user data
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user data" });
  }
};

// get token
const getNewToken = async (req, res) => {
  try {
    const userId = req.params.id; // Access the "id" from the URL parameter
    if (userId) {
      const userFetch = await User.findById({ _id: userId });
      if (userFetch) {
        // generate token
        const token = jwt.sign({ id: userFetch._id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res.json(token);
      } else {
        res.status(404).json({
          errorMessage: "User not found",
        });
      }
    } else {
      res.status(400).json({
        errorMessage: "Id not found in URL parameter",
      });
    }
  } catch (e) {
    res.status(401).json({
      errorMessage: "Something went wrong!\n" + e,
    });
  }
};

//Get user
const getUser = async (req, res) => {
  const {
    _id,
    fullName,
    email,
    username,
    password,
    role,
    dob,
    designation,
    nic,
    etfNo,
    epfNo,
    address,
    isOnline,
    contact,
    leaveDates,
    creditPoints,
    grade,
    baseSalary,
    totCP,
    performance,
    tenure,
    ranking,
    cv,
  } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    fullName,
    email,
    username,
    password,
    role,
    dob,
    designation,
    nic,
    etfNo,
    epfNo,
    address,
    isOnline,
    contact,
    leaveDates,
    creditPoints,
    grade,
    baseSalary,
    totCP,
    performance,
    tenure,
    ranking,
    cv,
  });
};

//Get one user
const viewProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    if (userId) {
      await User.findById({ _id: userId })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.json(err);
        });
    } else {
      res.status(400).json({
        errorMessage: "Id not found in URL parameter",
      });
    }
  } catch (e) {
    res.status(401).json({
      errorMessage: "Something went wrong!\n" + e,
    });
  }
};

//Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });

    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({
      error: "Error fetching users",
    });
  }
};

//Get All Experts
const getAllExperts = async (req, res) => {
  try {
    const users = await User.find({ role: "expert" });

    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({
      error: "Error fetching users",
    });
  }
};

//Delete User
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    await User.findByIdAndDelete(id);

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong during deletion",
    });
  }
};

//Update User details
const updateUser = async (req, res) => {
  const {
    userId, // The ID of the user to update
    firstName,
    lastName,
    phone,
    address,
    birthday,
    username,
    email,
  } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Check if the new email or username already exists (excluding the current user)
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
      _id: { $ne: userId }, // Exclude current user
    });
    if (existingUser) {
      return res.status(400).json({
        error: "Email or username already in use",
      });
    }

    // Update user details
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.birthday = birthday || user.birthday;
    user.username = username || user.username;
    user.email = email || user.email;

    // Save the updated user
    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong during update",
    });
  }
};

//Update Expert details
const updateExpert = async (req, res) => {
  const {
    userId,
    firstName,
    lastName,
    field,
    description,
    phone,
    address,
    birthday,
    username,
    email,
  } = req.body;

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    // Check if the new email or username already exists (excluding the current user)
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
      _id: { $ne: userId }, // Exclude current user
    });
    if (existingUser) {
      return res.status(400).json({
        error: "Email or username already in use",
      });
    }

    // Update user details
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.field = field || user.field;
    user.description = description || user.description;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.birthday = birthday || user.birthday;
    user.username = username || user.username;
    user.email = email || user.email;

    // Save the updated user
    await user.save();

    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong during update",
    });
  }
};

//Download User profile summery
const downProfileSummery = async (req, res) => {
  var report = [];

  try {
    const profileDets = await User.findById(req.params.id);

    report.push({
      userId: profileDets._id,
      fullName: profileDets.fullName,
      email: profileDets.email,
      username: profileDets.username,
      role: profileDets.role,
      dob: profileDets.dob,
      designation: profileDets.designation,
      nic: profileDets.nic,
      etfNo: profileDets.etfNo,
      epfNo: profileDets.epfNo,
      address: profileDets.address,
      contact: profileDets.contact,
      leaveDates: profileDets.leaveDates,
      totCP: profileDets.totCP,
      grade: profileDets.grade,
      baseSalary: profileDets.baseSalary,
    });

    res.json(report);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRole,
  registerUser,
  registerExpert,
  login,
  getUser,
  getAllUsers,
  getAllExperts,
  deleteUser,
  updateUser,
  updateExpert,
  getNewToken,
  downProfileSummery,
  viewProfile,
  getCurrentUser,
};
