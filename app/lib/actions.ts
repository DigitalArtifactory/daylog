'use server';

import { redirect } from 'next/navigation';
import { deleteSessionTokenCookie } from '../login/lib/cookies';

export default async function signout() {
  await deleteSessionTokenCookie();
  redirect('/login');
}
