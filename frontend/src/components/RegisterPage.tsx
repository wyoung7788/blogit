import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function RegisterPage(){

    const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();
    const goHome = () =>{
        navigate('/');
    }

    async function Register(username: string, password: string){

        try { 
            const userInfo = { username, password };
            const response = await fetch('http://localhost:5175/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo) //package into a JSON object
                
            });
            console.log(response)
            if (!response.ok){
                const data = await response.json()
                throw new Error(data.message || 'Failed to create user');
            }
            const data = await response.json();
            console.log('Register response:', data);
   
            return data;
        } catch (error) {
            console.error('Error during creation:', error);
            return { success: false, message: 'Error occured during creation' };
        }

    }
    async function handleSubmit(event: React.FormEvent){
        event.preventDefault();

        const result = await Register(username, password);
        if (result.success){
            console.log('Register successful', result);
            navigate('/login')

        } else{
            console.error('Error creating user:', result.message);
            alert(result.message);
        }
   }


    

    return(

        <div className="bg-blue-400 h-screen">
        <div className="registerForm p-5 text-white" >
            <h2 className="font-extrabold text-3xl m-5 p-5">Register Here</h2>
            <form className="bg-blue-300 rounded-xl" onSubmit={handleSubmit}>
                <div>
                    <input 
                    className="username m-5 p-1 text-black"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    className="password m-5 p-1 text-black"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button className="btn-submit bg-sky-400 m-5" type="submit">Create User</button>
                    
                </div>
                <button className="bg-sky-400 p-5 m-5"onClick={goHome}>Go Home</button>
            </form>
        </div>
    
        </div>
    )
}