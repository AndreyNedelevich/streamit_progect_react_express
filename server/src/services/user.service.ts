import { EActionTokenTypes } from "../enums/action-token-type.enum";
import { EEmailActions } from "../enums/email.enum";
import { EUserStatus } from "../enums/user-status.enum";
import { ApiError } from "../errors";
import { User } from "../models/User.mode";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/user.type";
import { emailService } from "./email.service";
import { tokenService } from "./token.service";
import { UploadedFile } from "express-fileupload";
import { s3Service } from "./s3.service";

class UserService {
  public async findAll(): Promise<IUser[]> {
    return await User.find();
  }

  public async create(data: IUser): Promise<IUser> {
    return await userRepository.create(data);
  }

  public async findById(id: string): Promise<IUser> {
    return await this.getOneByIdOrThrow(id);
  }

  public async updateEmailUserById(
    dto: Partial<IUser>,
    userId: string
  ): Promise<IUser> {
    const userWithBD = await this.getOneByIdOrThrow(userId);

    if (userWithBD.email === dto.email) {
      throw new ApiError(
        "This is the email address used by your account.",
        422
      );
    }

    const user = await User.findOneAndUpdate(
      { _id: userWithBD._id },
      { $set: { email: dto.email, status: EUserStatus.Inactive } },
      { returnDocument: "after" }
    );

    if (user) {
      const actionToken = tokenService.generateActionToken(
        { _id: userWithBD._id, userName: userWithBD.userName },
        EActionTokenTypes.Activate
      );

      emailService.sendMail(dto.email, EEmailActions.WELCOME, {
        email: user.email,
        userName: user.userName,
        actionToken,
      });
    }

    return user;
  }

  public async updateById(userId: string, dto: Partial<IUser>): Promise<IUser> {
    await this.getOneByIdOrThrow(userId);

    return await User.findOneAndUpdate(
      { _id: userId },
      { ...dto },
      { returnDocument: "after" }
    );
  }

  public async uploadAvatar(
      userId: string,
      avatar: UploadedFile
      //Типизируем при помощи  UploadedFile с библиотеки express-fileupload
  ): Promise<IUser> {
    const user = await this.getOneByIdOrThrow(userId);
    //Находим user в БД по id используя внутрений  метод getOneByIdOrThrow он вернет екземпляр класса user
    if (user.avatar) {
      //Если фото у пользователя уже установленно то просто делаем его заменну. Удаляя предидущий c Bucket.
      await s3Service.deleteFile(user.avatar);
    }
    const pathToFile = await s3Service.uploadFile(avatar, "user", userId);
    //Запускаем s3Service.uploadFile передаем в него: 1)файл, 2)категорию по которой мы внутри бакета хотим разделить фото по папкам для удобства (внутри user
    // могут быть другие папки), 3)ID User  кто загрузил avatar.
    //В pathToFile  -> это будет путь к файлу.

    return await User.findByIdAndUpdate(
        //Получив путь с сервисса далее просто сохраняем его для нашего user в поле avatar
        userId,
        { $set: { avatar: pathToFile } },
        //Если необходимо только изменить одно поле используем set, если его не тспользовать то будет переписан весь объект.
        { new: true }
        //Третий параметр даст возможность вернуть актуальные данные.
    );
  }

  public async deleteAvatar(userId: string): Promise<IUser> {
    //Метод который будет удалять фото пользователя с бакета по  ID пользователя.
    const user = await this.getOneByIdOrThrow(userId);
    //Находит user по id.

    if (!user.avatar) {
      //User не имеет avatar просто возвращаем user. Если у него есть avatar и функция была вызвана тоидем в сервис s3Service.deleteFile(user.avatar);
      return user;
    }

    await s3Service.deleteFile(user.avatar);

    return await User.findByIdAndUpdate(
        userId,
        { $unset: { avatar: true } },
        //Используем если нам необходимо удалить только значения с одного поля.А не обновлять весь объект. Делать противоположное действия
        // чем  $set
        { new: true }
        // ЧТо бы были возвращенны данные уже обновленные. Если не поставитьданные вернуться до обновления.
    );
  }


  public async deleteById(userId: string): Promise<void> {
    await this.getOneByIdOrThrow(userId);

    await User.deleteOne({ _id: userId });
  }

  private async getOneByIdOrThrow(userId: string): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError("User not found", 422);
    }
    return user;
  }
}

export const userService = new UserService();
