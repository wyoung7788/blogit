import { useState, useEffect } from "react";

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({}); // Store comments for each post

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5176/api/posts/load', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data.data || []);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const fetchCommentsForAllPosts = async () => {
            for (let post of posts) {
                try {
                    const response = await fetch(`http://localhost:5177/api/comments/load?postId=${post.post_id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch comments');
                    }

                    const data = await response.json();
                    // Filter the comments for the specific post based on the post_id
                    const filteredComments = data.data.filter((comment) => comment.post_id === post.post_id);

                    // Update comments for the specific post
                    setComments((prevComments) => ({
                        ...prevComments,
                        [post.post_id]: filteredComments, // Store only the comments for the current post
                    }));
                } catch (error) {
                    console.error('Error fetching comments:', error);
                }
            }
        };

        if (posts.length > 0) {
            fetchCommentsForAllPosts();
        }
    }, [posts]); // This effect runs whenever posts are updated

    return (
        <div className="bg-blue-500 rounded-xl m-5 p-5">
            <h1>Recent Posts</h1>
            {posts.length === 0 ? (
                <p>No posts available.</p>
            ) : (
                <ul>
                    {posts.map((post) => (
                        <li key={post.post_id} className="bg-blue-600 m-5 p-5 ">
                            <h2 className="font-bold">{post.title}</h2>
                            <p>Published at: {post.published_at}</p>
                            <p>{post.content}</p>
                            <p>Author: {post.author_username}</p>

                            {comments[post.post_id] && comments[post.post_id].length > 0 ? (
                                <ul className="ml-4">
                                    {comments[post.post_id].map((comment, index) => (
                                        <li key={index} className="bg-blue-300 mt-2 p-2 rounded">
                                            {comment.content}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No comments available for this post.</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
