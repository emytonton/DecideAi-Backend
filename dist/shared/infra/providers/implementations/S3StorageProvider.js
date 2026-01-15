"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3StorageProvider = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const fs_1 = __importDefault(require("fs"));
const mime_types_1 = __importDefault(require("mime-types"));
const path_1 = __importDefault(require("path"));
const upload_1 = __importDefault(require("../../../../config/upload"));
class S3StorageProvider {
    constructor() {
        this.client = new client_s3_1.S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }
    async saveFile(file, folder) {
        const originalName = path_1.default.resolve(upload_1.default.directory, file);
        const fileContent = await fs_1.default.promises.readFile(originalName);
        const contentType = mime_types_1.default.lookup(originalName);
        const fileName = `${folder}/${file}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
            Body: fileContent,
            ContentType: contentType || undefined,
        });
        await this.client.send(command);
        await fs_1.default.promises.unlink(originalName);
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    }
    async deleteFile(file, folder) {
        const fileName = `${folder}/${file}`;
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
        });
        await this.client.send(command);
    }
}
exports.S3StorageProvider = S3StorageProvider;
