import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";

import { configs } from "./configs/config";
import { cronRunner } from "./crons";
import { ApiError } from "./errors";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();

const PORT = configs.API_PORT || 5110;

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

//Deploy AVS

//Название машинки
//Генерируем новую пару ключей в Create new key pair. выбираем .pem
//Выделяем галочками эти пунткты
// Allow HTTPS traffic from the internetTo set up an endpoint
// Allow HTTP traffic from the internet

//Нажимаем создать и после нажимаем на ссылку и заходим в машинку.

//Внутри машинки нажимаем Connect
//Внутри машинки c -2 это дефолтный userName
