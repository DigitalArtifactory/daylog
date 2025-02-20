import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUsersCount } from './init/lib/actions';
import RegisterForm from './partials/RegisterForm';

export default async function Page() {
  const usersCount = await getUsersCount();

  if (usersCount === 0) {
    revalidatePath('/register/init');
    return redirect('/register/init');
  }

  return <RegisterForm />;
}
