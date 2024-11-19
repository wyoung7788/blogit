import React, { useState} from "react";

export default function LoginPage() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   interface UserInfo {
    username: string;
    password: string;
   }
    
    async function authenticateUser(userInfo: UserInfo): Promise<void>{
        try { 
            const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInfo)
            });
            const data = response.status !== 204 ? await response.json() : null;
            if (response.ok) {
                console.log('Login successful', data);
            } else {
                console.error('Error logging in:', data.message);
            } 
        } catch (error) {
            console.error('Error during authentication:', error);
        }
        }
    

   async function handleSubmit(event: React.FormEvent){
        event.preventDefault();
        const userInfo = { username, password};
        await authenticateUser(userInfo);
   }


    return(
        <div className="loginForm">
            <h2>Log in Here</h2>
            <form className="flex" onSubmit={handleSubmit}>
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
                    <button className="btn-submit" type="submit">Log in</button>
                </div>
            </form>
        </div>
    )
}