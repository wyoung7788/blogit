import bcrypt from 'bcryptjs';
import { User } from './login_model.js';

export const authenticateUser = async(req, res) => {
    try {
        const { username, password} = req.body;
        console.log(username); // works - fetches username from frontend
        const user = await User.findOne({username});
        if (!user){
            console.log('User not found');
            return res.status(401).json({ success: false, message: 'Invalid username'})
        }
        const passwordMatch = await bcrypt.compare(password, user.password)

        if (passwordMatch){
            console.log('success')
            return res.status(200).json({ success: true, message: 'Login successful'})
        } else {
            console.log('Password mismatch');
            return res.status(401).json({ success: false, message: 'Invalid username or password'})
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error occured during authentication'});
    }
}

