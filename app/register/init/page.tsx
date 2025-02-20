import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getUsersCount } from './lib/actions';
import InitRegisterForm from './partials/InitRegisterForm';

export default async function Page() {
  const usersCount = await getUsersCount();

  if (usersCount > 0) {
    revalidatePath('/login');
    return redirect('/login');
  }

  return <InitRegisterForm />;
}
