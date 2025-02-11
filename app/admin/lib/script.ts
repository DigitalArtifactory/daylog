'use server';

import { PrismaClient, User } from '@prisma/client';
import * as fs from 'fs';
import { SettingsFormState } from './definitions';

const prisma = new PrismaClient();

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
};

export async function loadSettings() {
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
  console.log(formData.get('mfa'));
  const mfa = formData.get('mfa') === 'active';
  console.log('mfa', mfa);

  if (!fs.existsSync('./settings.json')) {
    fs.writeFileSync('./settings.json', JSON.stringify({ mfa: mfa }), 'utf-8');
  }

  const fileContent = fs.readFileSync('./settings.json', 'utf-8');

  const settings = JSON.parse(fileContent) as SettingsType;

  settings.mfa = mfa;

  fs.writeFileSync('./settings.json', JSON.stringify(settings));

  return {
    success: true,
    data: settings,
    message: 'Settings saved correctly.',
  };
}
