import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types"; 
import path from "path";
import uploadConfig from "../../../../config/upload";

export class S3StorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async saveFile(file: string, folder: string): Promise<string> {
    
    const originalName = path.resolve(uploadConfig.directory, file);
    
    const fileContent = await fs.promises.readFile(originalName);
    const contentType = mime.lookup(originalName);

    const fileName = `${folder}/${file}`;

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
      ContentType: contentType || undefined,
    });

    await this.client.send(command);

   
    await fs.promises.unlink(originalName);

    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  }

  async deleteFile(file: string, folder: string): Promise<void> {
    const fileName = `${folder}/${file}`;

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileName,
    });

    await this.client.send(command);
  }
}