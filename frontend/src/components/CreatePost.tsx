import { useState } from "react";

export default function CreatePost(){

const [title, setTitle] = useState('');
const [contents, setContents] = useState('');

//collect the user_id, date/time published,
//future: add photo and tags 
async function createPost(title: string, contents: string){
    const user_id = localStorage.getItem('username');
    const date_created = new Date().toISOString();
    try {
        const postInfo = { title, contents, user_id, date_created};
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

    const result = await createPost(title, contents);
    if (result.success){
        console.log('Post created successfully', result);
    } else{
        console.error('Error creating post', result.message);
    }
    
}
    return(
        <div className="bg-blue-500 p-5 m-5 rounded-xl">
            <h2 className="font-bold text-2xl">Publish Something</h2>
            <form className="bg-blue-400 m-5 text-gray-700" onSubmit={handleSubmit}>
                <div>
                    <input 
                    className="username m-5 p-1"
                    placeholder="Title"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <input  
                    className="content m-5 p-5"
                    value={contents}
                    placeholder="Contents"
                    onChange={(e) => setContents(e.target.value)}
                    />
                </div>
                <div>
                    <button className="btn-submit m-5 bg-blue-200" type="submit">Create Post</button>
                </div>
            </form>

            
            
        </div>
    )
}