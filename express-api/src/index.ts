import express, { Application } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
const users = require("./routes/users");
app.use("/api", users);

const PORT: string | number = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Connected on port ${PORT}`);
});
