import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Import route files

import authRoutes from './auth/login_route.js';
import postRoutes from './posts/posts_route.js';
import commentRoutes from './comments/comments_route.js';

const app = express();
const port = 5175;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mount the routes
app.use('/api/auth', authRoutes); // Routes for authentication
app.use('/api/posts', postRoutes); // Routes for posts
app.use('/api/comments', commentRoutes); // Routes for comments

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
