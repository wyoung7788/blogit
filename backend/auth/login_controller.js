import bcrypt from 'bcryptjs';
import { client } from '../connection.cjs';
import { RegisterUser } from './login_model.js';
const db = client.db('blogit_data');
const usersCollection = db.collection('users');


export const authenticateUser = async (req, res) => {
    try {
        const { username, password} = req.body;
        
        
        //console.log(username); // works - fetches username from frontend
        const user = await usersCollection.findOne({username}); // not working from here

        if (!user){
            console.log('User not found');
            return res.status(401).json({ success: false, message: 'Invalid username'})
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        //console.log(password);
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
    //check if username is avaiable

        const { username, password } = req.body;
        const user = await usersCollection.findOne({username}); 

        if (user){
            return res.status(400).send('User already exists. Please sign in')
        } else{
            try {
                const salt = await bcrypt.genSalt(password);
                const password = await bcrypt.hash(req.body.password, salt);
                const user = new RegisterUser({
                    username: req.body.username,
                    password: req.body.password
                })
                await user.save()
                return res.status(201).json(user)
            } catch (err) {
                return res.status(400).json({ message: err.message})
            }
            
    }}

