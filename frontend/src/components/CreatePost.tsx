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
            <h2 className="font-bold text-2xl">Publish Something
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>

            </h2>
            <form className="bg-blue-400 m-5 text-gray-700" onSubmit={handleSubmit}>
                <div>
                    <input 
                    className="username m-5 p-4 pl-5"
                    placeholder="Title"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <textarea  
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