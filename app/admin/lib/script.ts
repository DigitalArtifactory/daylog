'use server';

import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers(): Promise<User[] | null> {
  const users = await prisma.user.findMany();
  return users;
}

export async function setAdmin(userId: number, role: string): Promise<User | null> {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { role: role },
  });
  return user;
}
