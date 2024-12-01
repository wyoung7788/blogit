import bcrypt from 'bcryptjs';
import { client } from '../connection.cjs';
import { RegisterUser } from './login_model.js';
const db = client.db('blogit_data');
const usersCollection = db.collection('users');


export const authenticateUser = async (req, res) => {
    try {
        const { username, password} = req.body;
        const user = await usersCollection.findOne({username}); 

        if (!user){
            console.log('User not found');
            return res.status(401).json({ success: false, message: 'Invalid username'})
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (passwordMatch){
            return res.status(200).json({ success: true, message: 'Login successful'})
        } else {
            console.log('Password mismatch');
            return res.status(401).json({ success: false, message: 'Invalid username or password'})
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error occured during authentication'});
    }
}

export const registerUser  = async (req, res) =>{
    //check if username is available
        const { username, password: plainTextPassword } = req.body;
        const user = await usersCollection.findOne({username}); 

        if (user){
            return res.status(400).send('User already exists. Please sign in')
        } else{
            try {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(plainTextPassword, salt);
                const newUser = new RegisterUser({
                    username: username,
                    password: hashedPassword,
                })
                await usersCollection.insertOne(newUser);
                return res.status(201).json(newUser)
            } catch (err) {
                return res.status(400).json({ message: err.message})
            }
            
    }}

