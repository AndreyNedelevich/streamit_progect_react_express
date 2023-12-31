import path from "node:path";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";
import { Readable } from "stream";
import { v4 } from "uuid";

import { configs } from "../configs/config";

class S3Service {
  constructor(
    private client = new S3Client({
      region: configs.AWS_REGION,

      credentials: {
        accessKeyId: configs.AWS_ACCESS,
        secretAccessKey: configs.AWS_KEY,
      },
    })
  ) {}

  public async uploadFile(
    file: UploadedFile,
    itemType: "user",
    itemId: string
  ): Promise<string> {
    const filePath = this.buildPath(itemType, itemId, file.name);

    await this.client.send(
      new PutObjectCommand({
        Bucket: configs.AWS_NAME,

        Key: filePath,

        Body: file.data,

        ACL: configs.AWS_S3_ACL,

        ContentType: file.mimetype,
      })
    );
    return filePath;
  }

  public async deleteFile(filePath: string): Promise<void> {
    //Метод удаляещий фото с Bucket. Как аргумент принимает путь к файлу.
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: configs.AWS_NAME,
        Key: filePath,
      })
    );
  }

  public async uploadFileStream(
    stream: Readable,

    itemType: string,
    itemId: string,
    file: UploadedFile
  ): Promise<void> {
    const filePath = this.buildPath(itemType, itemId, file.name);

    await this.client.send(
      new PutObjectCommand({
        Bucket: configs.AWS_NAME,
        Key: filePath,
        Body: stream,

        ACL: configs.AWS_S3_ACL,
        ContentType: file.mimetype,

        ContentLength: file.size,
      })
    );
  }

  private buildPath(type: string, id: string, fileName: string): string {
    return `${type}/${id}/${v4()}${path.extname(fileName)}`;
  }
}

export const s3Service = new S3Service();
