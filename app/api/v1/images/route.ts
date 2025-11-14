import { getCurrentSession } from '@/app/login/lib/actions';
import { prisma } from '@/prisma/client';
import fs from 'fs';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { user } = await getCurrentSession(req);

  if (!user) {
    return Response.json({ error: 'Not allowed' }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const filePath = searchParams.get('filePath');

  if (!filePath) {
    return Response.json({ error: 'Invalid file path' }, { status: 400 });
  }

  // Validate if the image belongs to current user
  const userImages = await prisma.board.findFirst({
    where: {
      userId: user.id,
      OR: [{ imageUrl: filePath }, { notes: { some: { imageUrl: filePath } } }],
    },
  });

  const userPictures = await prisma.picture.findMany({
    where: {
      imageUrl: filePath,
      OR: [{ notes: { boards: { userId: user.id } } }],
    },
  });

  if (!userImages && !userPictures) {
    return Response.json({ error: 'Image not found' }, { status: 404 });
  }

  if (typeof filePath !== 'string') {
    return Response.json({ error: 'Invalid file path' }, { status: 400 });
  }

  // Read the image file as a buffer
  const imageBuffer = fs.readFileSync(filePath);
  const buffer = Buffer.from(imageBuffer);
  if (imageBuffer) {
    return new Response(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Length': imageBuffer.length.toString(),
      },
    });
  } else {
    return new Response('File not found or could not be converted', {
      status: 404,
    });
  }
}
