import { getCurrentSession } from '@/app/login/lib/actions';
import { prisma } from '@/prisma/client';
import fs from 'fs';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { user } = await getCurrentSession();

  if (!user) {
    return Response.json({ error: 'Not allowed' });
  }

  const searchParams = req.nextUrl.searchParams;
  const filePath = searchParams.get('filePath');

  // Validate if the image belongs to current user
  const userImages = await prisma.board.findFirst({
    where: {
      userId: user.id,
      OR: [
        { imageUrl: filePath },
        { notes: { some: { imageUrl: filePath } } },
      ],
    },
  });

  if (!userImages) {
    return Response.json({ error: 'Image not found' });
  }

  if (typeof filePath !== 'string') {
    return Response.json({ error: 'Invalid file path' });
  }

  // Read the image file as a buffer
  const imageBuffer = fs.readFileSync(filePath);

  if (imageBuffer) {
    return new Response(imageBuffer, {
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
