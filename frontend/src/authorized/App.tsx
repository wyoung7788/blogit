import { useNavigate } from "react-router-dom";


export default function AuthorizedPage(){
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('username');
        navigate('/');
    }

    return(
        <div>
            <h3> You are logged in</h3>
            <button onClick={logOut}>Log out</button>
        </div>
    )
}