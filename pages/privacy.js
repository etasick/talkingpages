// pages/privacy.js
import PolicyLayout from '@/components/PolicyLayout';

export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="Privacy Policy">
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Data Collection</h2>
        <p>
          We collect information necessary to process your orders, including:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Contact information (name, email, shipping address)</li>
          <li>Payment details processed through secure third-party providers</li>
          <li>Order history and preferences</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Data Protection</h2>
        <p>
          We implement SSL encryption, regular security audits, and restrict access 
          to sensitive data. Payment information is never stored on our servers.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">User Rights</h2>
        <p>
          You have the right to request access to, correction of, or deletion of 
          your personal data. Contact our privacy officer at privacy@thcvapecartsusa.com.
        </p>
      </section>
    </PolicyLayout>
  );
}