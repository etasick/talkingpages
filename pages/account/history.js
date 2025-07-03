"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from '@/components/Navbar';
import { fetchAuthSession } from "aws-amplify/auth";

export default function HistoryPage() {
  const [history, setHistory] = useState({ audioFiles: [], clonedVoices: [] });
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const session = await fetchAuthSession();
        const sub = session?.tokens?.accessToken?.payload?.sub;
        if (!sub) return;
        setUserId(sub);

        const res = await fetch("https://usage-history-worker.etasick.workers.dev/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: sub }),
        });

        const data = await res.json();
        if (data.audioFiles || data.clonedVoices) {
          setHistory(data);
        }
      } catch (err) {
        console.error("Failed to fetch usage history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-black text-gray-200">
      <Navbar />
      <Head>
        <title>Your Usage History | TalkingPages</title>
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-2">Usage History</h1>
          <p className="text-gray-400">Your text-to-speech and voice cloning activities</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p>Loading your history...</p>
          </div>
        ) : (
          <>
            {history.audioFiles.length === 0 && history.clonedVoices.length === 0 ? (
              <div className="bg-gray-900 rounded-xl p-8 text-center">
                <div className="mx-auto w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">No Activity Yet</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  You haven't generated any audio or cloned voices yet. Get started by creating your first audio file!
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {history.audioFiles.length > 0 && (
                  <section>
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-900/30 p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold">Text-to-Speech History</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {history.audioFiles.map((item) => (
                        <div
                          key={item.id}
                          className={`p-5 rounded-xl border ${
                            item.file_deleted === "YES" 
                              ? "bg-red-900/20 border-red-800" 
                              : "bg-gray-900 border-gray-800 hover:border-blue-500 transition-colors"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-medium truncate max-w-[200px]">
                                {item.file_key.split('/').pop()}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {new Date(item.created_at).toLocaleString()}
                              </p>
                            </div>
                            <span className="text-sm font-medium bg-gray-800 px-2 py-1 rounded">
                              {item.character_count} chars
                            </span>
                          </div>
                          
                          {item.file_deleted === "YES" ? (
                            <div className="flex items-center text-red-400 text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              Audio file not available
                            </div>
                          ) : (
                            <div className="flex items-center text-green-400 text-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Available for streaming and download for users with Premium plans
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {history.clonedVoices.length > 0 && (
                  <section>
                    <div className="flex items-center mb-6">
                      <div className="bg-purple-900/30 p-2 rounded-lg mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold">Voice Cloning History</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {history.clonedVoices.map((item) => (
                        <div
                          key={item.id}
                          className="p-5 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500 transition-colors"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-medium truncate max-w-[200px]">
                                {item.file_key.split('/').pop()}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {new Date(item.created_at).toLocaleString()}
                              </p>
                            </div>
                            <span className={`text-sm font-medium px-2 py-1 rounded ${
                              item.status === 'COMPLETED' 
                                ? 'bg-green-900/30 text-green-400' 
                                : item.status === 'FAILED'
                                  ? 'bg-red-900/30 text-red-400'
                                  : 'bg-yellow-900/30 text-yellow-400'
                            }`}>
                              {item.status}
                            </span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Voice cloning model
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}