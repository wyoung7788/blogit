import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import authRoutes from './routes.js';


const app = express();
const port = 5175;

app.use(cors());
app.use(bodyParser.json())
app.use('/api/auth', authRoutes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));