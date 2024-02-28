import Loader from "@/components/Loader";

export default function Loading() {
  return (
    <Loader />
  );
}




// import express from 'express';
// import { deleteAvatar, followUser, getAllUsers, getAuthenticatedUser, getSingleUser, getSingleUserByUsername, unfollowUser, updateAuthenticatedUser, uploadAvatar } from '../controllers/userController.js';
// import { loginUser, createUser, resendOTP, verifyOTP, resetPassword, forgotPassword, loginWithGoogle } from '../controllers/authController.js';
// import { authenticate } from '../middlewares/authMiddleware.js';

// const router = express.Router();

// // Get all users (protected route)
// router.get('/', getAllUsers);


// //GET
// router.get("/authUser", authenticate, getAuthenticatedUser);

// // Get a single user by ID
// router.get('/:userId', getSingleUser);
// router.get('/:username', getSingleUserByUsername);

// // Create a new user
// router.post('/signup', createUser);
// router.post('/login', loginUser);
// router.post('/google', loginWithGoogle);

// // Forget Password
// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password', resetPassword);

// // Upload avatar route
// router.post('/upload-avatar', authenticate, uploadAvatar);

// router.delete('/delete-avatar', authenticate, deleteAvatar);

// // Update authenticated user details
// router.put('/update', authenticate, updateAuthenticatedUser);

// // Resend OTP route
// router.post('/resend-otp', resendOTP);

// router.post('/verify-otp', verifyOTP);

// // Follow user route
// router.post('/follow', authenticate, followUser);

// // Unfollow user route
// router.post('/unfollow', authenticate, unfollowUser);

// export default router;


// // User schema

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },

//   email: {
//     type: String,
//     unique: [true, 'Email already exists!'],
//     required: true,
//     validate: {
//       validator: (value) => {
//         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         return emailRegex.test(value);
//       },
//       message: 'Invalid email format',
//     },
//   },

//   otp: {
//     type: String,
//   },

//   otpExpiration: {
//     type: Date,
//   },

//   verified: {
//     type: Boolean,
//     default: false, // Set to false by default, indicating the user is not verified
//   },

//   username: {
//     type: String,
//     required: [true, 'Username is required!'],
//     match: [
//       /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
//       'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
//     ],
//   },

//   password: {
//     type: String,
//     required: [true, 'Password is required!'],
//     match: [
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])(?=.*\d).{8,}$/,
//       'Password should be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 special character, and 1 digit.',
//     ],
//   },

//   avatar: {
//     type: String,
//   },

//   portfolio: {
//     type: String,
//   },

//   linkedin: {
//     type: String,
//   },

//   github: {
//     type: String,
//   },

//   cityName: {
//     type: String,
//   },

//   stateName: {
//     type: String,
//   },

//   // Add any user-specific fields here
//   codeComponents: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'CodeComponent',
//     },
//   ],

//   webTemplates: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'WebTemplate',
//     },
//   ],

//   bookmarks: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'CodeComponent',
//     },
//   ],

//   following: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//   ],

//   // New field to store the followers
//   followers: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'User',
//     },
//   ],
// }, { timestamps: true });

// const User = mongoose.model("User", userSchema);

// export default User;

// // Middleware
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const authenticate = async (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         console.log('No token provided');
//         return res.status(401).json({ message: 'Authentication failed' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // Fetch user details, including avatar, from the database
//         const user = await User.findById(decoded.userId);
        
//         if (!user) {
//             console.log('User not found');
//             return res.status(401).json({ message: 'Authentication failed' });
//         }

//         // Attach user details to the request object
//         req.userId = decoded.userId;

//         next();
//     } catch (err) {
//         console.log('Error decoding token:', err);
//         res.status(401).json({ message: 'Authentication failed' });
//     }
// };


// export const loginUser = async (req, res) => {
//   try {
//     const { usernameOrEmail, password } = req.body;
//     const user = await User.findOne({
//       $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
//     });

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Generate and send an authentication token (e.g., JWT) to the client
//     const token = jwt.sign(
//       {
//         userId: user._id
//       },
//       jwtTokenUser,
//       {
//         expiresIn: '7d', // Token expiration time
//       }
//     );

//     await user.save();

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         username: user.username,
//         avatar: user.avatar || null,
//         codeComponents: user.codeComponents,
//         webTemplates: user.webTemplates,
//       }
//     });
//   } catch (error) {
//     console.log("Error Error Error Error ")
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// export const loginWithGoogle = async (req, res) => {
//   try {
//     console.log("Start google auth");
   
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server Error' });
//   }
// };

// complete loginWithGoogle controller
