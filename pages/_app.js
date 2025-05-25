import '../styles/globals.css'; // Import global styles
import { CartProvider, CartContext } from '../context/CartContext';
import { HelmetProvider } from 'react-helmet-async';
import Header from '../components/Header';
import Script from 'next/script';

import Footer from '../components/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <CartProvider>
      <HelmetProvider>
        <div className="container mx-auto">
          <Head>
        <link rel="icon" href="https://www.butterflyassets.online/talkingpages_logo.png" />
        
      </Head>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
          
        </div>
      </HelmetProvider>
    </CartProvider>
  );
}

export default MyApp;
