import { client } from "../connection.cjs";
const db = client.db('blogit_data');
const postsCollection = db.collection('posts');


export const loadPosts = async (req, res) => {
    try{
        const posts = await postsCollection.find({}).toArray();
        console.log(posts)

    return res.status(200).json({ success: true, data: posts});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error occured during fetching posts'});
    }
};