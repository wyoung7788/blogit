import { useState, useEffect } from "react";


export default function Posts(){
    const [posts, setPosts] = useState([]);

    useEffect(()=> {
        async function fetchPosts(){
        try { 
            const response = await fetch('http://localhost:5175/api/auth/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok){
                const data = await response.json()
                throw new Error(data.message || 'Failed to fetch posts');
            }
            const data = await response.json();
            console.log('Login response:', data);
            setPosts(data.data);
        } catch (error) {
            console.error('Error during authentication:', error);
            return { success: false, message: 'Error occured during authentication' };
        }
    }
    fetchPosts();
    }, []);
    

        
    return(

        <div>
            <h1>Recent Posts</h1>
            {posts.length === 0? (
                <p>No posts available.</p>
            ): (
                <ul>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <h2>{post.title}</h2>
                            <p>Published at: {post.published_at}</p>
                            <p>{post.content}</p>
                            <p>Author: {post.author_id}</p>
                        </li>
                    ))}
                </ul>
            )}
            
        </div>
    )
}