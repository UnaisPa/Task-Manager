// models/User.js

import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt timestamps
});

// Create the model from the schema and export it
const User = mongoose.model('User', userSchema);

export default User
