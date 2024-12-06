
import { client } from '../connection.cjs';
const db = client.db('blogit_data');
const commentsCollection = db.collection('comments');

export const loadComments = async (req, res) => {
    try {
        const comments = await commentsCollection.find({}).toArray();
        res.status(200).json({ success: true, data: comments });
    } catch (error) {
        console.error('Error loading comments:', error);
        res.status(500).json({ success: false, message: 'Failed to load comments' });
    }
};


//post_id, author_id, content
export const createComment = async (req, res) => {
    try {
        const { post_id, author_id, content } = req.body;

        if (!post_id || !author_id || !content) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const newComment = {
            post_id,
            author_id,
            content,
            created_at: new Date(),
        };

        const result = await commentsCollection.insertOne(newComment);

        if (result.acknowledged) {
            res.status(201).json({ success: true, message: 'Comment created successfully', comment: newComment });
        } else {
            res.status(500).json({ success: false, message: 'Failed to create comment' });
        }
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ success: false, message: 'Failed to create comment' });
    }
};
