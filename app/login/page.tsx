import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUsersCount } from '../register/init/lib/actions';
import LoginForm from './partials/LoginForm';

export default async function Page() {
  const usersCount = await getUsersCount();

  if (usersCount === 0) {
    revalidatePath('/register/init');
    return redirect('/register/init');
  }

  return <LoginForm />;
}
