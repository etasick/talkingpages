"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
        <Head>
        <meta charSet="utf-8" />
        <title>About us| TalkingPages</title>
        <meta
          name="description"
          content="TalkingPages enables you to listen to the audio recording of any webpage by simply entering the address."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://www.butterflyassets.online/talkingpages_logo.png" />

      </Head>
      
      <main className="flex-grow px-6 py-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About Us</h1>
        <p className="mb-6 text-lg">
          At <strong>TalkingPages</strong>, our mission is to <strong>bring web pages to life</strong>. We believe the
          internet shouldn’t be static—it should speak, interact, and respond. That’s why we’re building a platform
          where <strong>webpages can explain themselves</strong> through engaging <strong>audio</strong> and future
          <strong>animations</strong>.
        </p>

        <p className="mb-6 text-lg">
          We’re starting simple: by letting you <strong>listen to the full content</strong> or a
          <strong> summarized version</strong> of any webpage. Whether you're multitasking, relaxing, or just curious,
          you can press play and let the web speak to you—literally.
        </p>

        <ul className="list-disc list-inside mb-6 text-lg">
          <li>You're working on something else, but still want to catch up on an article? Hit "Listen." </li>
          <li>A friend sends you a link—get a quick voice summary before deciding if it’s worth diving into.</li>
          <li>You’re visually tired or on the move? TalkingPages gives you <strong>hands-free access</strong> to content.</li>
        </ul>

        <p className="mb-6 text-lg">
          And this is just the beginning. We're working on even more features that make the web feel more
          <strong> alive, interactive, and fun</strong>. From animated page explanations to voice-guided browsing—we're
          dreaming big and building fast.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Use TalkingPages?</h2>
        <ul className="list-disc list-inside text-lg mb-6">
          <li>✅ <strong>Simple</strong>: Just paste a link and listen.</li>
          <li>🎧 <strong>Multitask-Friendly</strong>: Stay informed while working on other tasks.</li>
          <li>🗣️ <strong>Summarized Insights</strong>: Know what a page is about before visiting it.</li>
          <li>😄 <strong>Fun & Engaging</strong>: It's the web, but with a voice.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Join Us</h2>
        <p className="text-lg">
          If our mission excites you, let’s build together! We’re open to collaborators, feedback, and partnerships.
          <br />
          <a href="mailto:your-email@example.com" className="text-blue-600 hover:underline">
            Contact us
          </a>{" "}
          and let’s make the web more human.
        </p>
      </main>
    </div>
  );
}
