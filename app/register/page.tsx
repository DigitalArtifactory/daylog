import { redirect } from 'next/navigation';
import { getUsersCount } from './init/lib/actions';
import RegisterForm from './partials/RegisterForm';

export default async function Page() {
  const usersCount = await getUsersCount();

  if (usersCount === 0) {
    return redirect('/register/init');
  }

  return <RegisterForm />;
}
