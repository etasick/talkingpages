"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { fetchAuthSession } from 'aws-amplify/auth';

export default function CloneVoice() {
  const [files, setFiles] = useState([null, null, null, null, null]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [progress, setProgress] = useState([0, 0, 0, 0, 0]);

  const handleFileChange = (e, index) => {
    const newFiles = [...files];
    newFiles[index] = e.target.files[0];
    setFiles(newFiles);
    
    const newProgress = [...progress];
    newProgress[index] = 0;
    setProgress(newProgress);
  };

  useEffect(() => {
    const getUserId = async () => {
      try {
        const session = await fetchAuthSession();
        const sub = session?.tokens?.accessToken?.payload?.sub;
        if (sub) setUserId(sub);
      } catch (err) {
        console.error("Error fetching user ID:", err);
      }
    };

    getUserId();
  }, []);

  const handleUpload = async () => {
    if (files.some((f) => !f)) {
      setMessage("Please upload all 5 voice samples.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      files.forEach((file, i) => {
        formData.append(`file${i + 1}`, file);
      });
      formData.append("userId", userId);

      const res = await fetch("https://clone-voice-worker.etasick.workers.dev", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Voice samples uploaded successfully! Your custom voice model will be ready soon.");
      } else {
        setMessage(`❌ Error: ${data.error || "Failed to upload voice samples"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Please try again later.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col items-center py-12 px-4">
      <Head>
        <title>Clone Your Voice | TalkingPages</title>
      </Head>

      <div className="max-w-3xl w-full">
        <div className="text-center mb-10">
          <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Clone Your Voice
          </h1>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            Upload 5 clear audio recordings (30 seconds each) to train your custom voice model. 
            Files should be in MP3 format with clear speech.
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800/30 p-5 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-lg text-purple-300 mb-3">Requirements</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>5 audio files (30 seconds each)</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>MP3 format</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Clear speech with minimal background noise</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/30 p-5 rounded-lg border border-gray-700">
              <h3 className="font-semibold text-lg text-blue-300 mb-3">Tips for Best Results</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Use a high-quality microphone</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Record in a quiet environment</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Speak naturally and consistently</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="p-5 bg-gray-800/30 rounded-xl border border-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium text-lg flex items-center">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                      {i + 1}
                    </span>
                    Voice Sample {i + 1}
                  </h3>
                  <span className="text-sm text-gray-400">MP3 format</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <label className="relative cursor-pointer bg-gray-900 px-4 py-2.5 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      {files[i] ? files[i].name : "Choose file..."}
                    </span>
                    <input 
                      type="file" 
                      accept="audio/mpeg" 
                      onChange={(e) => handleFileChange(e, i)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </label>
                  
                  {files[i] && (
                    <div className="flex items-center text-sm text-green-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Selected
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`px-8 py-3 rounded-xl font-medium ${
                uploading
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-opacity"
              }`}
            >
              {uploading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading Voice Samples...
                </span>
              ) : (
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                  Train My Voice Model
                </span>
              )}
            </button>
          </div>

          {message && (
            <div className={`mt-6 p-4 rounded-lg text-center ${
              message.startsWith('✅') 
                ? 'bg-green-900/30 border border-green-800 text-green-400' 
                : 'bg-red-900/30 border border-red-800 text-red-400'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}