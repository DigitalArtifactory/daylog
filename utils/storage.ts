import fs from 'fs';
import path from 'path';

export function saveBase64File(
  base64String: string,
  existentFileName?: string | null
) {
  const folderPath = process.env.STORAGE_PATH ?? 'storage';

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Extract the MIME type and Base64 data
  const matches =
    base64String.match(/^data:(image\/\w+);base64,(.+)$/) ||
    base64String.match(/^data:(\w+\/[\w-+\d.]+);base64,(.+)$/); // For general files
  if (!matches) {
    throw new Error('Invalid Base64 format');
  }

  const ext = matches[1].split('/')[1]; // Extract file extension
  const buffer = Buffer.from(matches[2], 'base64'); // Convert to buffer
  const fileName = generateRandomFilename(ext);
  const filePath = existentFileName || path.join(folderPath, fileName);

  fs.writeFileSync(filePath, buffer);

  return filePath;
}

export function removeFile(filePath?: string | null) {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// Generate a random filename with an extension
function generateRandomFilename(extension: string) {
  return `${crypto.randomUUID()}.${extension}`;
}
