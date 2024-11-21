import { useState } from "react";

export default function CreatePost(){

const [title, setTitle] = useState('');
const [content, setContent] = useState('');

//collect the user_id, date/time published,
//future: add photo and tags 
async function createPost(title: string, content: string){
    const user = localStorage.getItem('username');
    const time = new Date().toISOString();
    try {
        const postInfo = { title, content, user, time};
        const response = await fetch('http://localhost:5176/api/posts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postInfo),
        })
        if (!response.ok){
            const data = await response.json()
            throw new Error(data.message || 'Failed to create post');
        }
        const data = await response.json();
        console.log('Post creation:', data);
        return data;
    } catch (error){
        console.error('Error during post creation:', error);
        return { success: false, message: 'Error occured during post creation'};
    }

}

async function handleSubmit(event: React.FormEvent){
    event.preventDefault();

    const result = await createPost(title, content);
    if (result.success){
        console.log('Post created successfully', result);
    } else{
        console.error('Error creating post', result.message);
    }
    
}
    return(
        <div className="">
            <h2>Publish Something</h2>
            <form className="bg-blue-400 m-5 text-gray-700" onSubmit={handleSubmit}>
                <div>
                    <input 
                    className="username m-5"
                    placeholder="Title"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <input  
                    className="content m-5"
                    value={content}
                    placeholder="Contents"
                    onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    <button className="btn-submit bg-blue-200" type="submit">Create Post</button>
                </div>
            </form>

            
            
        </div>
    )
}