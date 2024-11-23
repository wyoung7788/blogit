import LoginPage from "../components/LoginPage";
import { useNavigate } from "react-router-dom";
import UnAuthBlog from "../components/UnAuthBlog";

export default function UnAuthorizedPage(){
    const navigate = useNavigate();

    const handleRegister = () => {
        navigate('/register')
    }
 
    return(
        <div>
        <div className="min-h-screen flex flex-col text-white items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-300">
            <h1 className="mt-5 text-4xl font-bold mb-8">BlogIt!</h1>
            <div className="grid grid-cols-2 gap-8 w-3/4">
                <div className="flex justify-center items-center">
                <UnAuthBlog/>
                </div>
                <div className="flex-col flex">
                <LoginPage/>
                Not a user?

                <button onClick={handleRegister}>Register Here</button>
                </div>
            </div>
            
           
        </div>
        </div>
    )
}