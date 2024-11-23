import { client } from "../connection.cjs";
const db = client.db('blogit_data');
const postsCollection = db.collection('posts');
import { Post} from "./post_model.js";

export const loadPosts = async (req, res) => {
    try{
        const posts = await postsCollection.find({}).toArray();

    return res.status(200).json({ success: true, data: posts});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error occured during fetching posts'});
    }
};

export const createPost = async (req, res) =>{
    try {

        
        const { title, contents, user_id, date_created } = req.body;
        console.log(req.body)
        if (!title || !contents || !user_id || !date_created){
            return res.status(400).json({ success: false, message: 'Missing required fields'})
        }
        

        const postCount = await postsCollection.countDocuments()
        const newPostId = postCount + 1;
        console.log(postCount, newPostId)
        //this will later have to account for when posts are deleted, update all the postIds??
        const newPost = new Post({
            post_id: newPostId,
            title,
            contents, 
            user_id,
            date_created,
        });

        const result = await postsCollection.insertOne(newPost);

        if (result.acknowledged) {
            return res.status(201).json({
                success: true,
                message: 'Post created successfully',
                data: result,
            });
        } else{
            return res.status(500).json({ 
                success:false,
                message: 'Failed to create post',
            });
        }
            
    } catch (error){
        return res.status(500).json({ success: false, message: 'Error occured during post process'});
    }
        
        
}