import { useNavigate } from "react-router-dom";
import PostsLoggedIn from "./PostsLoggedIn";
import CreatePost from "../components/CreatePost";

export default function AuthorizedPage(){
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('username');
        navigate('/');
    }

    return(
        <div className="bg-blue-400 min-h-screen text-white">
            <h3> Hello</h3>
            <CreatePost/>
            <PostsLoggedIn/>
            <button onClick={logOut} className="bg-blue-300">Log out</button>
        </div>
    )
}