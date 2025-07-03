import '../styles/globals.css';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../src/amplifyClient';

function MyApp({ Component, pageProps }) {
  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default MyApp;
