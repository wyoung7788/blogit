import { client } from "../connection.cjs";
const db = client.db('blogit_data');
const postsCollection = db.collection('posts');
import { Post, Counter } from "./post_model";

export const loadPosts = async (req, res) => {
    try{
        const posts = await postsCollection.find({}).toArray();
        console.log(posts)

    return res.status(200).json({ success: true, data: posts});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error occured during fetching posts'});
    }
};

export const createPost = async (req, res) =>{
    try {
        const { title, content, author_username, time } = req.body;

        if (!title || !content || !author_username || !time){
            return res.status(400).json({ success: false, message: 'Missing required fields'})
        }

        const counter = await Counter.findOneAndUpdate(
            { _id: 'post_id'},
            { $inc: { sequence_value: 1}},
            { new: true, upsert: true}
        );

        const newPostId = counter.sequence_value;

        const newPost = new Post({
            post_id: newPostId,
            title,
            content, 
            author_username,
            published_at: time,
        });

        const result = await postsCollection.insertOne(newPost);

        if (result.acknowledged) {
            return res.status(201).json({
                success: true,
                message: 'Post created succesfully',
                data: result,
            });
        } else{
            return res.status(500).json({ 
                success:false,
                message: 'Failed to create post',
            });
        }
    } catch (error){
        return res.status(500).json({ success: false, message: 'Error occured during post creation'});
    }
}