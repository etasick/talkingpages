'use client';
import { useEffect, useState } from 'react';
import { Hub } from 'aws-amplify/utils';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();

    const unsubscribe = Hub.listen('auth', () => {
      checkUser();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="w-full bg-black border-b border-gray-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-8 h-8 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            TalkingPages
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {user ? (
            <>
              <a href="/account" className="text-gray-300 hover:text-white transition-colors">
                Account
              </a>
              <a href="/account/history" className="text-gray-300 hover:text-white transition-colors">
                History
              </a>
              <a href="/account/cloudstorage" className="text-gray-300 hover:text-white transition-colors">
                Cloud Storage
              </a>
              <button
                onClick={handleSignOut}
                className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-1.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <a href="/signin" className="text-gray-300 hover:text-white transition-colors">
                Sign In
              </a>
              <a href="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Sign Up
              </a>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-400 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 py-3 space-y-3">
            {user ? (
              <>
                <a 
                  href="/account" 
                  className="block py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Account
                </a>
                <a 
                  href="/account/history" 
                  className="block py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  History
                </a>
                <a 
                  href="/account/cloudstorage" 
                  className="block py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cloud Storage
                </a>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a 
                  href="/signin" 
                  className="block py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </a>
                <a 
                  href="/signup" 
                  className="block py-2 text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}