// pages/faq.js
import PolicyLayout from '@/components/PolicyLayout';

export default function FAQPage() {
  return (
    <PolicyLayout title="Frequently Asked Questions">
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Ordering & Payments</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">What payment methods do you accept?</h3>
              <p className="mt-2 text-gray-600">
                We accept all major credit cards (Visa, Mastercard, American Express) and cryptocurrency payments through secure payment gateways.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">How long does payment processing take?</h3>
              <p className="mt-2 text-gray-600">
                Credit card payments are processed immediately. Cryptocurrency payments typically confirm within 15 minutes depending on network congestion.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Product Information</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Are your products lab-tested?</h3>
              <p className="mt-2 text-gray-600">
                Yes, all products undergo third-party laboratory testing for potency and purity. Certificates of Analysis (COAs) are available upon request.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">How should I store my products?</h3>
              <p className="mt-2 text-gray-600">
                Store in a cool, dry place away from direct sunlight. Optimal storage temperature is between 60-70°F (15-21°C).
              </p>
            </div>
          </div>
        </div>
      </section>
    </PolicyLayout>
  );
}