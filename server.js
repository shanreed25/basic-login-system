import 'dotenv/config';
import express from 'express';
import connectToDB from './config/connection.js';
import userRoutes from './routes/userRoutes.js'

const app = express();
const port = process.env.PORT || 3000;

app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Zenith Products API started' });
});


app.post('/', (req, res) => {
  res.json({ message: 'Zenith Products API started' });
});

await connectToDB();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});