import React, { useState} from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();


    async function logIn(username: string, password: string){

        try { 
            const userInfo = { username, password };
            const response = await fetch('http://localhost:5175/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo) //package into a JSON object
                
            });
            if (!response.ok){
                const data = await response.json()
                throw new Error(data.message || 'Failed to login');
            }
            const data = await response.json();
            console.log('Login response:', data);
            localStorage.setItem('username', username);

            return data;
        } catch (error) {
            console.error('Error during authentication:', error);
            return { success: false, message: 'Error occured during authentication' };
        }
    }
    

   async function handleSubmit(event: React.FormEvent){
        event.preventDefault();

        const result = await logIn(username, password);
        if (result.success){
            navigate('/authorized')

        } else{
            console.error('Error logging in:', result.message);
        }
   }


    return(
        <div className="loginForm bg-indigo-400 rounded-xl p-5 m-5" >
            <h2 className="font-bold justify-center m-5">Log in Here</h2>
            <form className="text-gray-700" onSubmit={handleSubmit}>
                <div>
                    <input 
                    className="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    className="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button className="btn-submit m-5 bg-indigo-300" type="submit">Log in</button>
                </div>
            </form>
        </div>
    )
}