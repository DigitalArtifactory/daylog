import * as S3 from '@aws-sdk/client-s3';

const globalForS3Client = global as unknown as { s3Client: S3.S3Client };

const createS3Client = () => {
  if (
    !process.env.S3_ENDPOINT ||
    !process.env.S3_REGION ||
    !process.env.S3_ACCESS_KEY_ID ||
    !process.env.S3_SECRET_ACCESS_KEY
  ) {
    console.error('S3 environment variables are not set');
    return null;
  }

  const s3Client = new S3.S3Client({
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  return s3Client;
};

export const s3Client = globalForS3Client.s3Client || createS3Client();

if (process.env.NODE_ENV !== 'production')
  globalForS3Client.s3Client = s3Client;
