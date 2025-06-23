import '../styles/globals.css';
import { HelmetProvider } from 'react-helmet-async';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './amplifyClient';

function MyApp({ Component, pageProps }) {
  return (
    <HelmetProvider>
      <div className="container mx-auto">
        <Header />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default MyApp;
