
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function CreatePost(){

const [title, setTitle] = useState('');
const [content, setContent] = useState('');
const navigate = useNavigate();
const goHome = () =>{
        navigate('/');
        }
async function handleSubmit(event: React.FormEvent){
    event.preventDefault();
        /*
        const result = await logIn(username, password);
        if (result.success){
            console.log('Login successful', result);
            navigate('/authorized')

        } else{
            console.error('Error logging in:', result.message);
        }
   }*/


    return(


        <div>
            <h2>Publish Something</h2>
            <form className="flex bg-blue-400" onSubmit={handleSubmit}>
                <div>
                    <input 
                    className="username"
                    placeholder="Username"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <input 
                    className="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    <button className="btn-submit" type="submit">Log in</button>
                </div>
            </form>

            
            
        </div>
    )
}