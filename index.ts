import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
