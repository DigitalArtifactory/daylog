import nodemailer from 'nodemailer';

export async function createAndVerifyTransporter() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER_HOST,
    port: Number(process.env.SMTP_SERVER_PORT),
    auth: {
      user: process.env.SMTP_SERVER_USER,
      pass: process.env.SMTP_SERVER_PASS,
    },
  });

  await new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        reject(error);
      } else {
        resolve(success);
      }
    });
  });

  return transporter;
}
