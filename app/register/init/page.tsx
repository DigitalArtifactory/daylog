import { validateAdminUserExists } from './lib/actions';
import InitRegisterForm from './partials/InitRegisterForm';

export default async function Page() {
  await validateAdminUserExists();

  return <InitRegisterForm />;
}
