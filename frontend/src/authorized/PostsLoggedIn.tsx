import { useState, useEffect } from "react";

export default function PostsLoggedIn() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({}); // Comments are stored by post_id

    // Fetch posts
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

    // Fetch comments for a specific post
    const fetchComments = async (postId) => {
        try {
            const response = await fetch(`http://localhost:5177/api/comments/load?postId=${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }

            const data = await response.json();
            setComments((prevComments) => ({
                ...prevComments,
                [postId]: data.data || [],
            }));
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    // Handle comment submission
    const handleCommentSubmit = async (postId, content) => {
        try {
            const response = await fetch('http://localhost:5177/api/comments/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, content }),
            });

            if (!response.ok) {
                throw new Error('Failed to create comment');
            }

            const data = await response.json();
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post.post_id === postId
                        ? { ...post, comments: [...(post.comments || []), data.data] }
                        : post
                )
            );
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <div className="bg-blue-500 rounded-xl m-5 p-5 w-30">
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

                            {/* Fetch comments when the post is loaded */}
                            <h3>Comments:</h3>
                            <button onClick={() => fetchComments(post.post_id)}>
                                Load Comments
                            </button>

                            {comments[post.post_id] && comments[post.post_id].length > 0 ? (
                                <ul className="ml-4">
                                    {comments[post.post_id].map((comment, index) => (
                                        <li key={index} className="bg-blue-300 mt-2 p-2 rounded">
                                            {comment.content}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No comments yet.</p>
                            )}

                            {/* Comment Submission */}
                            <textarea
                                placeholder="Add a comment..."
                                onChange={(e) => handleCommentSubmit(post.post_id, e.target.value)}
                            />
                            <button onClick={(e) => handleCommentSubmit(post.post_id, e.target.value)}>
                                Submit Comment
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
