import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import commentRoutes from './routes.js';


const app = express();
const port = 5177;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use('/api/comments', commentRoutes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));