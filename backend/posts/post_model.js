import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    post_id: Number,
    title:  String, 
    contents: String,
    user_id: String,
    date_created: String,
});


export const Post = mongoose.model('Post', postSchema);
