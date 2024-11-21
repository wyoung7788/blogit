
import { useState, useEffect } from "react";


export default function PostsLoggedIn(){
    const [posts, setPosts] = useState([]);

    useEffect(()=> {
        const  fetchPosts = async () => {
        try { 
            const response = await fetch('http://localhost:5176/api/posts/load', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok){
                throw new Error('HTTP error! Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data.data || []);
        } catch (error) {
            console.error('Error during posts retrieval:', error);
            return { success: false, message: 'Error occured during post fetching' };
        }
    }
    fetchPosts();
    }, []);
    

        
    return(

        <div className="bg-blue-500 rounded-xl m-5 p-5">
            <h1>Recent Posts</h1>
            {posts.length === 0? (
                <p>No posts available.</p>
            ): (
                <ul>
                    {posts.map((post) => (
                        <li key={post.post_id} className="bg-blue-600 m-5 p-5 ">
                            <h2 className="font-bold">{post.title}</h2>
                            <p>Published at: {post.published_at}</p>
                            <p>{post.content}</p>
                            <p>Author: {post.author_username}</p>
                        </li>
                    ))}
                </ul>
            )}
            
        </div>
    )
}