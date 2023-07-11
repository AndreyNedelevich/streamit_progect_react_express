import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const PORT = configs.API_PORT || 5110;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(
  cors({
    credentials: true,
    origin: configs.FRONT_URL,
  })
);

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 5100;

  return res.status(status).json({
    message: err.message,
    status: err.status,
  });
});

app.listen(PORT, async () => {
  await mongoose.connect(configs.MONGODB_URL);
  cronRunner();
  console.log(`Server has started on PORT $${PORT} 🥸`);
});


