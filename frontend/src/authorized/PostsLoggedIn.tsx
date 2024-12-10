import { useState, useEffect } from "react";

export default function PostsLoggedIn() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({}); // Comments are stored by post_id
    const [newComment, setCommentContent] = useState('');
    const handleTextChange = (e) => {
        setCommentContent(e.target.value);  // Update state when user types in the textarea
    };
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
    const handleCommentSubmit = async (postId, content: string) => {
        const authorId = localStorage.getItem('userId');
        
        try{ 
        const commentData = {
            post_id: postId, 
            author_id: authorId,
            content: content
        }

        console.log(commentData)

            const response = await fetch('http://localhost:5177/api/comments/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commentData),
            });

            if (!response.ok) {
                throw new Error('Failed to create comment');
            }
            const result = await response.json();
            console.log('Comment created successfully:', result);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen w-50">
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
                            <textarea className="text-slate-800"
                                placeholder="Add a comment..."
                                value= {newComment}
                                onChange={handleTextChange}
                            />
                            <button className="bg-blue-400" onClick={() => handleCommentSubmit(post.post_id, newComment)}>
                                Submit Comment
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        </div>
    );
}
