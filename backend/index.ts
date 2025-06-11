import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import userRoutes from './src/routes/userRoutes'

const app = express();

// convert to json
app.use(express.json());

// mounting routes
app.use('/api/user', userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});