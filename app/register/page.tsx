import { validateAdminUserNotExists } from '../login/lib/actions';
import { validateAllowRegistration } from './lib/actions';
import RegisterForm from './partials/RegisterForm';

export default async function Page() {
  await validateAdminUserNotExists();
  await validateAllowRegistration();

  return <RegisterForm />;
}
