"use client";


export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Head>
        <meta charSet="utf-8" />
        <title>Terms| TalkingPages</title>
        <link rel="icon" href="https://www.butterflyassets.online/talkingpages_logo.png" />

      </Head>
      <main className="flex-grow px-6 py-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>

        <p className="mb-4 text-lg">
          Welcome to <strong>TalkingPages</strong>. By using our website and services, you agree to comply with and be
          bound by the following terms and conditions. Please review them carefully.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Use of Service</h2>
        <p className="mb-4 text-lg">
          TalkingPages is intended for personal, non-commercial use. You agree not to misuse our services, scrape content
          unlawfully, or use it in any way that could harm the site or its users.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Intellectual Property</h2>
        <p className="mb-4 text-lg">
          All trademarks, logos, and content on TalkingPages belong to their respective owners. We do not claim ownership
          over the content of webpages processed through our tool.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Content Disclaimer</h2>
        <p className="mb-4 text-lg">
          TalkingPages uses automated systems to extract and read webpage content. We do not guarantee 100% accuracy or
          completeness of the audio or summaries provided.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Changes to Terms</h2>
        <p className="mb-4 text-lg">
          We may update these terms occasionally. Continued use of the service means you accept any modifications.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Contact</h2>
        <p className="mb-4 text-lg">
          If you have any questions or concerns about these terms, please contact us at:
          <br />
          <a href="mailto:info@talkingpages.io" className="text-blue-600 hover:underline">
            info@talkingpages.io
          </a>
        </p>
      </main>
    </div>
  );
}
