import { loadSettings } from '../admin/lib/actions';
import { validateAdminUserNotExists } from './lib/actions';
import LoginForm from './partials/LoginForm';

export default async function Page() {
  await validateAdminUserNotExists();
  const settings = await loadSettings();
  const allowReg = settings?.allowReg ?? false;

  return <LoginForm allowReg={allowReg} />;
}
