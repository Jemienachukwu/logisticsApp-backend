import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/userRouter.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.listen(PORT, () =>
  console.log(`Server has started in port: ${PORT}`.yellow)
);

// setup mongoose
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(`Error: ${err.message}`);
      // process.exit(1);
    }
    console.log("Mongodb connection successful".blue);
  },
  { useFindAndModify: false }
);
app.get("/", (req, res) => {
  res.send("API IS RUNNING...");
});

app.use("/api/users", UserRoutes);
