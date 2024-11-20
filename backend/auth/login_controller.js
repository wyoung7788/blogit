import bcrypt from 'bcryptjs';
import { client } from '../connection.cjs';

export const authenticateUser = async (req, res) => {
    try {
        const { username, password} = req.body;
        const db = client.db('blogit_data');
        const usersCollection = db.collection('users');
        //console.log(username); // works - fetches username from frontend
        const user = await usersCollection.findOne({username}); // not working from here

        if (!user){
            console.log('User not found');
            return res.status(401).json({ success: false, message: 'Invalid username'})
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        console.log(passwordMatch)
        //console.log(password);
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

