// pages/terms.js
import PolicyLayout from '@/components/PolicyLayout';

export default function TermsOfService() {
  return (
    <PolicyLayout title="Terms of Service">
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">1. Introduction</h2>
        <p>
          Welcome to THC Vape Carts USA. By accessing our website and purchasing our products, 
          you agree to be bound by these Terms of Service. Please read them carefully before 
          making any purchases.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">2. Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, and images, 
          is the property of THC Vape Carts USA and protected by intellectual property laws.
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900">3. User Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You must be at least 21 years old to purchase our products</li>
          <li>Accurate information must be provided during checkout</li>
          <li>Compliance with all local laws regarding product purchase and use</li>
        </ul>
      </section>

      {/* Add more sections as needed */}
    </PolicyLayout>
  );
}