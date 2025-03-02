'use server';

import fs from 'fs';
import path from 'path';

export async function getFileToBase64(filePath: string | null) {
  try {
    if (filePath && filePath.startsWith('data:')) {
      return filePath;
    }
    if (filePath && fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      const mime = getMimeType(filePath);
      return `data:${mime};base64,${fileBuffer.toString('base64')}`;
    } else return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).slice(1);
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'pdf':
      return 'application/pdf';
    default:
      return 'application/octet-stream';
  }
}
