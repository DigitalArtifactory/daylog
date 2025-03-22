import Image from 'next/image';
import { getUserMFA } from '../../lib/actions';
import OTPLoginForm from './partials/OTPLoginForm';

export default async function OTPLogin({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  // Get the profile of the user
  const userId = parseInt((await params).userId);
  const mfa = await getUserMFA(userId);

  return (
    <div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a href="." className="navbar-brand navbar-brand-autodark">
            <Image
              src="/daylog.svg"
              width="220"
              height="64"
              alt={'daylog'}
              className="navbar-brand-image"
            />
          </a>
        </div>
        {mfa ? (
          <OTPLoginForm userId={userId} />
        ) : (
          <div className="text-center">Not allowed.</div>
        )}
      </div>
    </div>
  );
}
