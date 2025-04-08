import express from 'express';
import jsonServer from 'json-server';
import cors from 'cors';

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS for all routes
app.use(cors());

// Add /api prefix to the routes
app.use('/api', router); // This will now serve /api/jobs, /api/posts, etc.

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
