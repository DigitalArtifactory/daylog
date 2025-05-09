'use server';

import { getCurrentSession } from '@/app/login/lib/actions';
import { prisma } from '@/prisma/client';
import { User } from '@/prisma/generated/client';
import * as fs from 'fs';
import { SettingsFormState } from './definitions';

export async function getUsers(): Promise<User[] | null> {
  const users = await prisma.user.findMany();
  return users;
}

export async function setAdmin(
  userId: number,
  role: string
): Promise<User | null> {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { role: role },
  });
  return user;
}

export type SettingsType = {
  mfa: boolean;
  allowReg: boolean;
  allowUnsplash: boolean;
};

export async function getSettings() {
  if (fs.existsSync('./settings.json')) {
    const fileContent = fs.readFileSync('./settings.json', 'utf-8');
    const settings = JSON.parse(fileContent) as SettingsType;
    return settings;
  } else {
    return null;
  }
}

export async function saveSettings(
  state: SettingsFormState,
  formData: FormData
) {
  const mfa = formData.get('mfa') === 'active';
  const allowReg = formData.get('allowRegistration') === 'active';
  const allowUnsplash = formData.get('allowUnsplash') === 'active';

  if (!fs.existsSync('./settings.json')) {
    fs.writeFileSync('./settings.json', JSON.stringify({ mfa: mfa }), 'utf-8');
  }

  const fileContent = fs.readFileSync('./settings.json', 'utf-8');

  const settings = JSON.parse(fileContent) as SettingsType;

  settings.mfa = mfa;
  settings.allowReg = allowReg;
  settings.allowUnsplash = allowUnsplash;

  fs.writeFileSync('./settings.json', JSON.stringify(settings));

  return {
    success: true,
    data: settings,
    message: 'Settings saved correctly.',
  };
}

export async function deleteUser(userId: number) {
  const session = await getCurrentSession();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user && user.id !== session.user?.id) {
    await prisma.user.delete({ where: { id: user.id } });
  }
  return user;
}
