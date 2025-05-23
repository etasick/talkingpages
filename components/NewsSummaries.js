// components/NewsSummaries.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaHeadphonesAlt, FaExternalLinkAlt } from "react-icons/fa";

const newsSites = [
  {
    name: "Forbes",
    url: "https://www.forbes.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Forbes_logo.svg",
  },
  {
    name: "CNN",
    url: "https://edition.cnn.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/CNN.svg",
  },
  {
    name: "MSNBC",
    url: "https://www.msnbc.com",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/MSNBC_2021_%28stacked%29.svg",
  },
];

export default function NewsSummaries() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleListen = (url) => {
    setLoading(true);
    router.push(`/listen?url=${encodeURIComponent(url)}`);
  };

  return (
    <section className="bg-white py-10 px-4 rounded-xl shadow-lg mt-12 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Listen to News Summaries
      </h2>
      <p className="text-center text-gray-600 mb-10">
        Stay informed with quick summaries from top news sources.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {newsSites.map((site) => (
          <div
            key={site.name}
            className="border rounded-xl p-4 shadow hover:shadow-xl transition duration-300 text-center flex flex-col items-center"
          >
            <img src={site.logo} alt={site.name} className="h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">{site.name}</h3>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleListen(site.url)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                <FaHeadphonesAlt /> Listen
              </button>
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-500 hover:underline"
              >
                Visit <FaExternalLinkAlt />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
