import bcrypt from "bcrypt"
import User from "../../models/UserSchema.js";
const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Create a new user instance

        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword, // In a real-world app, you should hash the password before saving
        });
        const user = await User.findOne({ email: email });
        if (user) {
            res.status(201).json({ status:false, message: 'User Already exists', user: newUser });

        } else {  

            await newUser.save();

            // Send response
            res.status(201).json({status:true, message: 'User created successfully', user: newUser });
        }
       
    } catch (err) {
        // Handle errors (e.g., email already exists)
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

export { createUser }