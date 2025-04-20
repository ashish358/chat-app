import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connetCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import chatbotRoutes from "./routes/chatbotRoutes.js"; // ✅ Now it will work

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connetCloudinary();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/chatbot", chatbotRoutes);

app.get("/", (req, res) => {
  res.send("API working");
});

app.listen(port, () => console.log("Server started on PORT: " + port));
