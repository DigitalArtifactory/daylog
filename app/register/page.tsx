import { validateAdminUserNotExists } from '../login/lib/actions';
import RegisterForm from './partials/RegisterForm';

export default async function Page() {
  await validateAdminUserNotExists();

  return <RegisterForm />;
}
