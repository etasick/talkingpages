// pages/support.js
import PolicyLayout from '@/components/PolicyLayout';

export default function SupportCenter() {
  return (
    <PolicyLayout title="Support Center">
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Contact Options</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Live Chat</h3>
              <p className="mt-2 text-gray-600">
                Available Mon-Fri 9AM-5PM PST
                <br />
                <button className="mt-2 text-blue-600 hover:text-blue-800 font-medium">
                  Start Chat
                </button>
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Email Support</h3>
              <p className="mt-2 text-gray-600">
                Typical response time: 24 hours
                <br />
                <a href="mailto:support@thcvapecartsusa.com" className="text-blue-600 hover:text-blue-800 font-medium">
                  support@thcvapecartsusa.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Common Solutions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Tracking Information Not Updating?</h3>
              <p className="mt-2 text-gray-600">
                Carrier tracking systems may take 24-48 hours to update. If your package doesn't show movement after 72 hours, contact us with your order number.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Damaged Product?</h3>
              <p className="mt-2 text-gray-600">
                Please send photos of damaged items and packaging to our support email within 48 hours of delivery for immediate assistance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PolicyLayout>
  );
}