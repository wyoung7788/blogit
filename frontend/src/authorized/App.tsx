
import PostsLoggedIn from "./PostsLoggedIn";
import CreatePost from "../components/CreatePost";
import MainHeader from "./MainHeader";

export default function AuthorizedPage(){
    

    return(
        
        <div className="bg-blue-400 min-h-screen text-white">
            <MainHeader/>
            <CreatePost/>
            <PostsLoggedIn/>
        </div>
    )
}