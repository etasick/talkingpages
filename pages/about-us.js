"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <main className="flex-grow px-6 py-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">About TalkingPages</h1>
        <p className="mb-6 text-lg">
          <strong>TalkingPages</strong> is an AI-powered tool that transforms any webpage into a high-quality
          <strong> MP3 audio file</strong>. Whether you're commuting, multitasking, or just prefer listening over reading,
          TalkingPages lets you <strong>listen to the web</strong> on your own terms.
        </p>

        <p className="mb-6 text-lg">
          Simply paste a link, and TalkingPages will generate an engaging <strong>spoken summary</strong> or
          full audio narration of the content. You can <strong>stream it online</strong> or <strong>download</strong> it
          for offline listening—perfect for staying informed on the go.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Use TalkingPages?</h2>
        <ul className="list-disc list-inside text-lg mb-6">
          <li>🎧 <strong>Convenient</strong>: Turn articles into audio with a single click.</li>
          <li>🧠 <strong>Efficient</strong>: Get quick summaries before diving deep into a webpage.</li>
          <li>💾 <strong>Downloadable</strong>: Save audio files and listen anytime, anywhere.</li>
          <li>👐 <strong>Accessible</strong>: Ideal for users with visual fatigue or on-the-go lifestyles.</li>
        </ul>

        <p className="mb-6 text-lg">
          TalkingPages is more than just text-to-speech—it's a smarter way to experience online content. We're constantly
          evolving, with future plans to support full-page voiceovers, interactive audio, and even animated summaries.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Join the Movement</h2>
        <p className="text-lg">
          We’re passionate about making the internet more human and more accessible. If you're excited by what we're building,
          we'd love to hear from you.
          <br />
          <a href="mailto:your-email@example.com" className="text-blue-600 hover:underline">
            Contact us
          </a>{" "}
          to share feedback, ideas, or partnership opportunities.
        </p>
      </main>
    </div>
  );
}
