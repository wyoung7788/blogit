import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true}, 
    password: { type: String, required: true},
});

const registerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 5,
        max: 10,
        validate: {
            validator: function (value) {
                return /^\S+$/.test(value); //check for no spaces
            }
        }
    },
    password:{
        type: String, 
        required: true,
        min: 8, 
        max: 20,
        validate: [
            {
                validator: function (value) {
                    return /^\S+$/.test(value);
                },
                message: 'Password must not contain spaces.'
            },
            {
                validator: function (value) {
                    return /[!@#$%^&*(),.?":{}|<>]/.test(value); 
                },
                message: 'Password must contain at least one special character.'
            }
        ]
    }
})

export const User = mongoose.model('User', userSchema);
export const RegisterUser = mongoose.model('Register', registerSchema);
