// pages/wholesale.js
import PolicyLayout from '@/components/PolicyLayout';

export default function WholesaleInquiries() {
  return (
    <PolicyLayout title="Wholesale Inquiries">
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Wholesale Program Benefits</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            <li className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Volume Discounts</h3>
              <p className="mt-2 text-gray-600">Save 15-40% on bulk orders over $2,500</p>
            </li>
            <li className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Dedicated Support</h3>
              <p className="mt-2 text-gray-600">Priority shipping and account management</p>
            </li>
            <li className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Custom Packaging</h3>
              <p className="mt-2 text-gray-600">Branded packaging options available</p>
            </li>
            <li className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900">Drop Shipping</h3>
              <p className="mt-2 text-gray-600">Direct-to-consumer shipping solutions</p>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-900">Application Process</h2>
          <ol className="list-decimal pl-6 space-y-4">
            <li className="pl-2">
              <h3 className="text-lg font-medium text-gray-900">Submit Application</h3>
              <p className="mt-2 text-gray-600">Complete our wholesale application form with business details</p>
            </li>
            <li className="pl-2">
              <h3 className="text-lg font-medium text-gray-900">Verification</h3>
              <p className="mt-2 text-gray-600">2-3 business days for license verification</p>
            </li>
            <li className="pl-2">
              <h3 className="text-lg font-medium text-gray-900">Account Setup</h3>
              <p className="mt-2 text-gray-600">Personalized portal access and pricing structure</p>
            </li>
          </ol>
          
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-medium text-blue-800">Required Documentation</h3>
            <ul className="mt-2 list-disc pl-6 space-y-2">
              <li className="text-blue-700">Valid business license</li>
              <li className="text-blue-700">Reseller certificate</li>
              <li className="text-blue-700">Government-issued ID</li>
            </ul>
          </div>
        </div>
      </section>
    </PolicyLayout>
  );
}