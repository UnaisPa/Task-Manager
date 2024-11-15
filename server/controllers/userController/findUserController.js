import User from "../../models/UserSchema.js";
import bcrypt from "bcrypt"
import { generateToken } from "../../utils/generateToken.js";
const findUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email });
        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                const token = generateToken(user._id);
                res.status(200).json({ status: true, message: 'Login success', token, user });
            } else {
                res.status(404).json({ status: false, message: 'Password Incorrect' });
            }

        } else {
            res.status(404).json({ status: false, message: 'User not found' });
        }

    } catch (err) {
        // Handle errors (e.g., email already exists)
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

export default findUser