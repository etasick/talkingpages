"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";
import { fetchUserProfile } from "@/lib/fetchUser";
import Navbar from "@/components/Navbar";

export default function CloudStoragePage() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [audioFiles, setAudioFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetching, setFetching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const currentUser = await getCurrentUser();
        const session = await fetchAuthSession();
        const attributes = session.tokens.idToken.payload;
        setUser(currentUser);
        if (attributes.sub) {
          const profile = await fetchUserProfile(attributes.sub);
          setUserData(profile);
        }
      } catch (err) {
        setUser(null);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const fetchAudioFiles = async () => {
    if (!userData || !["PREMIUM", "ENTERPRISE"].includes(userData.usagePlan)) return;
    try {
      setFetching(true);
      const response = await fetch("https://cloud-storage-worker.etasick.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_WORKER_API_KEY,
        },
        body: JSON.stringify({ userId: userData.id }),
      });
      const result = await response.json();
      setAudioFiles(result.audioFiles || []);
    } catch (err) {
      console.error("Failed to fetch audio files", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (userData?.id) fetchAudioFiles();
  }, [userData]);

  const handleSelectFile = (fileKey) => {
    setSelectedFiles((prev) =>
      prev.includes(fileKey) ? prev.filter((f) => f !== fileKey) : [...prev, fileKey]
    );
  };

  const handleDeleteFiles = async () => {
    if (confirmText !== "DELETE") {
      alert("❌ You must type DELETE to confirm.");
      return;
    }
    try {
      const response = await fetch("https://delete-audio-worker.etasick.workers.dev/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_WORKER_API_KEY,
        },
        body: JSON.stringify({ userId: userData.id, files: selectedFiles }),
      });
      const result = await response.json();
      if (result.success) {
        alert("✅ Files deleted successfully.");
        setConfirmText("");
        setSelectedFiles([]);
        fetchAudioFiles();
      } else {
        alert("❌ Failed to delete files.");
      }
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-200">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-black text-gray-200">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-3">Authentication Required</h1>
            <p className="text-gray-400 mb-6">
              Sign in to access your cloud storage. Create a FREE account and get 5000 credits to start using our text-to-speech tool.
            </p>
            <button
              onClick={() => router.push('/signin')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </main>
      </div>
    );
  }

  if (!["PREMIUM", "ENTERPRISE"].includes(userData.usagePlan)) {
    return (
      <div className="min-h-screen bg-black text-gray-200">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 rounded-xl p-8 border border-purple-700">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-purple-500/20 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Cloud Storage Access</h1>
            </div>
            
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <h2 className="text-xl font-semibold text-center mb-4">Premium Feature</h2>
              <p className="text-center text-gray-300 mb-6">
                Cloud storage for your audio files is available only for <span className="font-bold text-yellow-300">PREMIUM</span> and <span className="font-bold text-yellow-300">ENTERPRISE</span> plans.
              </p>
              
              <div className="flex justify-center">
                <a
                  href="/account/billing"
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Upgrade Your Plan
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Cloud Audio Storage</h1>
          <p className="text-gray-400 mt-1">Your premium audio files stored securely</p>
        </div>

        {fetching ? (
          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p>Loading your audio files...</p>
          </div>
        ) : audioFiles.length === 0 ? (
          <div className="bg-gray-900 rounded-xl p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium mb-2">No Audio Files Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              You haven't stored any audio files in the cloud yet. Start creating premium audio to see them appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {audioFiles.map((file) => (
                <div 
                  key={file.id} 
                  className={`p-5 rounded-xl border ${
                    selectedFiles.includes(file.file_key) 
                      ? "border-blue-500 bg-blue-900/10" 
                      : "border-gray-800 bg-gray-900 hover:border-gray-600 transition-colors"
                  }`}
                >
                  <div className="flex items-start mb-4">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.file_key)}
                      onChange={() => handleSelectFile(file.file_key)}
                      className="mt-1.5 h-5 w-5 rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-600"
                    />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium truncate max-w-[200px]">
                          {file.file_key.split('/').pop()}
                        </h3>
                        <span className="text-xs text-gray-400">
                          {new Date(file.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      
                      <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-4">
                        <audio 
                          controls 
                          className="w-full sm:w-64"
                          src={`https://www.butterflyassets.online/${file.file_key}`} 
                        />
                        <a
                          href={`https://www.butterflyassets.online/${file.file_key}`}
                          download
                          className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-6 p-6 rounded-xl bg-red-900/20 border border-red-800">
                <div className="flex items-start mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-red-300 mb-2">Permanent Deletion</h3>
                    <p className="text-red-200 mb-4">
                      This action cannot be undone. Type <strong className="text-white">DELETE</strong> to confirm deletion of {selectedFiles.length} file(s).
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder="Type DELETE to confirm"
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-red-500"
                  />
                  <button
                    onClick={handleDeleteFiles}
                    className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
                    disabled={confirmText !== "DELETE"}
                  >
                    Delete Selected
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}