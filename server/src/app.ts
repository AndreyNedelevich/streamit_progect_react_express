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

//После коннекта попадаем в терминал Машинки

//Далее необходимо установить env

//Инструкция о настройке машинки Setting up Node.js on an Amazon EC2 instance
//1)curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
//2). ~/.nvm/nvm.sh
//3)nvm install --lts

//Если мы хотип переключиться на другую версию node - nvm use -16 (если указывать только цифры то устан послед в 16 версии)
//Аповерить вермию node -  node -v

//проверка обновленний -  sudo yum update
//устанавливаем GIT  -  sudo yum install git
// проверка версии  -  git version

//git clone - (сылка на проект https://github.com/AndreyNedelevich/streamit_progect_react_express.git) клонируем проект в машинку

//После клонирования на магинке будет проект
//Далее заходим при помощи cd в директории в которой нужно создать файл .env

//оздаем файл touch .env

//nano .env  -  заходим в созданный файл .env

//В данный файл копируем все переменные с файла .env
//contrl C сохранить   /  contrl X  выйти назад

//алее мы можем перемищаться при помощи cd (пакки) и nano(файлы) по Linux
//Если нужно поменять ветку git checkout (название ветки)

//npm i  -   что бы установить зависимости

//осле установки зависимостей можно запускать npm run start

//После запуска необходимо зайни в seurity group -
//далеее -  Edit inbound rules.   В нем add rule  выбираем custop TCP и указываем порт (к примеру 5100)
// на котором должна крутиться машинка и указываем для всех 0.0.0.0/0
