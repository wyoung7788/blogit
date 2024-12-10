
import PostsLoggedIn from "./PostsLoggedIn";
import CreatePost from "../components/CreatePost";
import MainHeader from "./MainHeader";

export default function AuthorizedPage(){
    

    return(
        
        <div className="bg-blue-400 min-h-screen text-white">
            <MainHeader/>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                <PostsLoggedIn/>
                </div>
                <div className="col-start-3">
                <CreatePost/>
                </div>
            </div>
            
            
            </div>
          
    )
}