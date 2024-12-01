import { useNavigate } from "react-router-dom";
export default function MainHeader(){
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('username');
        navigate('/');
    }
    return(

        <div className="header flex-row font-extrabold">
            <nav>
                <ul>
                    <li><a href="/authorized">Home</a></li>
                    <li><a href="/authorized/yourposts">Created Posts</a></li>
                    <li><a href="/authorized/profile">Profile</a></li>
                    <li><button onClick={logOut} className="bg-blue-300">Log out</button></li>
                </ul>
            </nav>
        </div>
    )
}