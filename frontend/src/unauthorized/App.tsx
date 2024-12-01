
import { useNavigate } from "react-router-dom";
import UnAuthBlog from "../components/UnAuthBlog";

export default function UnAuthorizedPage(){
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register')
    }
    const handleLogin = () => {
        navigate('/login')
    }
 
    return(
        <div>
        <div className="min-h-screen flex flex-col text-white items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-300">
            <h1 className="mt-5 text-4xl font-bold mb-8">BlogIt!</h1>
            <div className="flex p-5 space-x-5"> 
            <button className="bg-indigo-300" onClick={handleLogin}>Login</button>
            <button className="bg-indigo-300" onClick={handleRegister}>Register Here</button>
            </div>
                <UnAuthBlog/>
        </div>
        </div>
    )
}