import User from "../../models/UserSchema.js";
import { generateToken } from "../../utils/generateToken.js";

const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body


        const user = await User.findOne({ email: email });
        if (user) {
            const token = generateToken(res, user._id);
            //remove password from the response
            const { password: pass, ...rest } = user._doc;
            res.status(201).json({ status: true, message: 'User login success', token: token, user: rest });

        } else {
            const hashedPassword = await bcrypt.hash(name, 10);
            // console.log(hashedPassword);
            const newUser = new User({
                firstName: name,
                lastName: '',
                email,
                password: hashedPassword, // In a real-world app, you should hash the password before saving
            });

            await newUser.save();

            // // Send response
            // res.status(201).json({ status: true, message: 'User created successfully', user: newUser });

            const token = generateToken(res, newUser._id);
            //remove password from the response
            const { password: pass, ...rest } = newUser._doc;
            res.status(201).json({ status: true, message: 'User login success', token: token, user: rest });
        }


    } catch (err) {
        // Handle errors (e.g., email already exists)
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

export default googleAuth