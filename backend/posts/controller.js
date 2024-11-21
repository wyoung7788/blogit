import { client } from "../connection.cjs";
const db = client.db('blogit_data');
const postsCollection = db.collection('posts');


export const loadPosts = async (req, res) => {
    try{
        const posts = await postsCollection.find({},{
            projection: {
                title: 1,
                published_at: 1,
                content: 1,
                author_id: 1,
                post_image: 1,
                post_tages: 1,
            },
        
    }).toArray();
    return res.status(200).json({ success: true, data: posts});
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error occured during fetching posts'});
    }
};