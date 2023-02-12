const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const PORT = process.env.PORT || 8000;

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
      process.exit(1);
    }
    console.log("Mongodb connection successful".blue);
  },
  { useFindAndModify: false }
);

app.use("/users", require("./routes/userRouter"));
