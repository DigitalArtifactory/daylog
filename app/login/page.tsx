import { validateAdminUserNotExists } from './lib/actions';
import LoginForm from './partials/LoginForm';

export default async function Page() {
  await validateAdminUserNotExists();

  return <LoginForm />;
}
