const User = require('./login_model');

export async function authenticateUser(username, password){
    try {
        const user = await User.findOne({username});

        if (user && user.password === password){
            return { success: true, message: 'Login successful'};
        } else {
            return { success: false, message: 'Invalid username or password'};
        }
    } catch (error) {
        return { success: false, message: 'Error occured during authentication'};
    }
}

