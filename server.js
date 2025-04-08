import express from 'express';
import jsonServer from 'json-server';
import cors from 'cors';

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 5000;  // Fallback to 5000 if PORT isn't defined
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Server Error:', err);
});


// Enable CORS for all routes
const allowedOrigins = [
  'http://localhost:3000',  // Local development
  'https://reactproject-2025-production.up.railway.app'  // Production URL
];

app.use(cors({
  origin: allowedOrigins,
}));

// Add /api prefix to the routes
app.use('/api', router); // This will now serve /api/jobs, /api/posts, etc.


