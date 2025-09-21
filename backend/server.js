import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import UserRouter from "./routes/userRoutes.js";
import resourcesRoutes from "./routes/resourcesRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

//db connect
await connectDB();

//Middlewares
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRouter);
app.use("/api/user", UserRouter);
app.use("/api/resource", resourcesRoutes);

app.get("/", (req, res) => {
  res.send("Hello from your Express Server!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
