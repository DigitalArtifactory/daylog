export default function Page() {
  return (
    <div className="container container-narrow my-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-center my-4">
            User Registration Terms and Conditions
          </h2>
          <h2 className="h2">Introduction</h2>
          <p>
            By registering for an account on our platform, you agree to comply
            with these terms and conditions. Please read them carefully before
            proceeding with your registration.
          </p>

          <h2 className="h2">Your Account</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account credentials. You agree to notify us immediately of any
            unauthorized use of your account.
          </p>

          <h2 className="h2">Acceptable Use</h2>
          <p>
            You agree to use our platform for lawful purposes only. Prohibited
            activities include, but are not limited to:
          </p>
          <ul>
            <li>Engaging in any form of fraud or malicious activity.</li>
            <li>Violating any local, state, or international laws.</li>
            <li>Uploading harmful or illegal content.</li>
          </ul>

          <h2 className="h2">License and Intellectual Property</h2>
          <p>
            This platform is licensed under the{' '}
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.en.html"
              target="_blank"
            >
              GNU Affero General Public License v3 (AGPL-3.0)
            </a>
            . You may use, modify, and share the platform in compliance with the
            terms of this license.
          </p>

          <h2 className="h2">Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, we are not liable for any
            damages resulting from your use of this platform. This includes, but
            is not limited to, data loss, service interruptions, or unauthorized
            access to your account.
          </p>

          <h2 className="h2">Termination</h2>
          <p>
            We reserve the right to terminate your account at our sole
            discretion if you violate these terms and conditions.
          </p>

          <h2 className="h2">Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Any changes will be
            communicated to you and will take effect immediately upon posting.
          </p>

          <h2 className="h2">Contact</h2>
          <p className="mb-4">
            If you have any questions about these terms and conditions, please
            contact us at{' '}
            <a href="mailto:support@example.com">support@example.com</a>.
          </p>
        </div>
        <div className="card-footer text-center">
          <p className="mb-0">
            Licensed under the{' '}
            <a
              href="https://www.gnu.org/licenses/agpl-3.0.en.html"
              target="_blank"
            >
              GNU Affero General Public License v3 (AGPL-3.0)
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
