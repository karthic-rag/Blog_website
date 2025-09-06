import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

//db connect
await connectDB();

//Middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/api/admin", adminRouter);
app.use("api/blog", blogRouter);
app.get("/", (req, res) => {
  res.send("Hello from your Express Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
