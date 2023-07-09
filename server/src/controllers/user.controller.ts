import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { userMapper } from "../mapers/user.mapper";
import { userService } from "../services/user.service";
import { IUser } from "../types/user.type";

class UserController {
  public async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.findAll();

      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async findByIdUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;

      const user = await userService.findById(userId);

      const response = userMapper.toResponse(user);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  public async findByTokenUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const dataFromToken = req.res.locals.tokenPayload;

      const user = await userService.findById(dataFromToken._id);

      const response = userMapper.toResponse(user);

      return res.json(response);
    } catch (e) {
      next(e);
    }
  }

  public async updateDataUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;

      const updatedUser = await userService.updateById(userId, req.body);

      const response = userMapper.toResponse(updatedUser);

      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  public async updateEmailUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;

      const user = await userService.updateEmailUserById(req.body, userId);

      const response = userMapper.toResponse(user);

      return res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;

      await userService.deleteById(userId);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;
      //Достаем iD пользователя
      const avatar = req.files.avatar as UploadedFile;
      //Достаем файл с req.files. Типизируем его при помощи UploadedFile. Указывая что это будет только один файл.
      console.log(avatar);

      const user = await userService.uploadAvatar(userId, avatar);
      //Сервис будет принимать userId  и  avatar

      const response = userMapper.toResponse(user);
      return res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  public async deleteAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;

      const user = await userService.deleteAvatar(userId);

      const response = userMapper.toResponse(user);
      //Вызываем метод toResponse и передаем в него данные User. Данный метод вернет нам обработанные поля user (avatar) для фронта.
      // или сформирует полный путь url на аvatar добавив в путь строку  **https://express-node.s3.amazonaws.com**
      return res.status(201).json(response);
      //Возвращаем в response статус и  данные о самом user (бработанные в userMapper.toResponse)
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
