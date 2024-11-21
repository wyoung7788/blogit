import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    post_id : { type: Number, required: true, unique: true},
    title: { type: String, required: true}, 
    contents: { type: String, required: true},
    user_id: { type: String, required: true},
    date_created: { type: Date, required: true, default: Date.now},
});

const counterSchema = new mongoose.Schema({
    _id: {type: String, required: true}, 
    sequence_value: { type: Number, default: 0}
})

export const Post = mongoose.model('Post', postSchema);
export const Counter = mongoose.model('Counter', counterSchema);
