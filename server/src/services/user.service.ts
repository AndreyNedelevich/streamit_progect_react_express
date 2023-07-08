import { EActionTokenTypes } from "../enums/action-token-type.enum";
import { EEmailActions } from "../enums/email.enum";
import { EUserStatus } from "../enums/user-status.enum";
import { ApiError } from "../errors";
import { User } from "../models/User.mode";
import { userRepository } from "../repositories/user.repository";
import { IUser } from "../types/user.type";
import { emailService } from "./email.service";
import { tokenService } from "./token.service";

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
