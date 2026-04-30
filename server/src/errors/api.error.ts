export class ApiError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  static async from<T>(
      cb: () => Promise<T>,
      status = 500,
      code = EErrorCode.INTERNAL_SERVER_ERROR
  ): Promise<T>  {
    try {
      return await cb();
    } catch (e: any) {
      console.error(e);
      throw new ApiError(
          code,
          status
      );
    }
  }

  static runAsync<T>(
      cb: () => Promise<T>,
      onError?: (e: any) => void
  ): void {
    Promise.resolve()
        .then(cb)
        .catch((e) => {
          console.error(e);
          onError?.(e);
        });
  }
}


export enum EErrorCode {
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",

  ACTION_TOKEN_CREATE_FAILED = "ACTION_TOKEN_CREATE_FAILED",

  EMAIL_SEND_FAILED = "EMAIL_SEND_FAILED",

  USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS",

  DATABASE_SAVE_ERROR = "DATABASE_SAVE_ERROR"
}