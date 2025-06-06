import * as S3 from '@aws-sdk/client-s3';
import { s3Client } from './s3Client';

export async function uploadFileS3(
  buffer: Buffer<ArrayBuffer>,
  key: string,
  type: string,
  size: number
) {
  if (!process.env.S3_BUCKET) {
    console.error('S3_BUCKET environment variable is not set');
    return;
  }

  const byteArray = new Uint8Array(buffer);

  const command = new S3.PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
    Body: byteArray,
    ContentType: type,
    ContentLength: size,
  });

  await s3Client.send(command);
}

export async function deleteFileS3(key: string) {
  if (!s3Client) {
    console.error('S3 client is not initialized');
    return;
  }

  const command = new S3.DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
  });

  await s3Client.send(command);
}
