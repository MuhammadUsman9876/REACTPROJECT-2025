const jsonServer = require("json-server");
const cors = require("cors"); // ✅ Enable CORS

const server = jsonServer.create();
const router = jsonServer.router("db.json"); // ✅ Ensure correct path
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 5000;

server.use(cors()); // ✅ Allow frontend to access API
server.use(middlewares);
server.use("/api", router); // ✅ Prefix API route to avoid conflicts

server.listen(PORT, () => {
  console.log(`✅ JSON Server is running on port ${PORT}`);
});
