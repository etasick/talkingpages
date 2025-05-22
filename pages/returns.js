// pages/returns.js
import PolicyLayout from '@/components/PolicyLayout';

export default function ReturnsPolicy() {
  return (
    <PolicyLayout title="Returns Policy">
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Return Eligibility</h2>
        <p>
          Unopened, unused products in original packaging may be returned within 
          14 days of delivery. Proof of purchase required.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Return Process</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>Contact our support team to initiate return</li>
          <li>Receive return authorization and shipping label</li>
          <li>Package items securely and ship within 3 business days</li>
        </ol>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Refunds</h2>
        <p>
          Approved refunds will be processed within 5 business days and issued 
          to the original payment method. Shipping costs are non-refundable.
        </p>
      </section>
    </PolicyLayout>
  );
}