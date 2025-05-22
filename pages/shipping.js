// pages/shipping.js
import PolicyLayout from '@/components/PolicyLayout';

export default function ShippingPolicy() {
  return (
    <PolicyLayout title="Shipping Policy">
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Shipping Destinations</h2>
        <p>
          We currently ship to all 50 U.S. states. Orders are processed within 1-2 business days 
          and typically arrive within 3-5 business days via USPS Priority Mail.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">Order Tracking</h2>
        <p>
          All orders include tracking information sent via email once shipped. 
          Please allow 24 hours for tracking numbers to become active.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">International Shipping</h2>
        <p>
          We currently do not offer international shipping. All orders must be shipped 
          to valid U.S. addresses.
        </p>
      </section>
    </PolicyLayout>
  );
}