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
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
          <Script
            id="zoho-salesiq"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                var $zoho=$zoho||{};$zoho.salesiq=$zoho.salesiq||{
                  widgetcode:"siq3adb6252a1dd217807cb7b1c9b27174aece2bddd1d28fdfa35dfcda26da26a5c",
                  values:{},
                  ready:function(){}
                };
                var d=document;
                s=d.createElement("script");
                s.type="text/javascript";
                s.id="zsiqscript";
                s.defer=true;
                s.src="https://salesiq.zoho.com/widget";
                t=d.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(s,t);
              `
            }}
          />
        </div>
      </HelmetProvider>
    </CartProvider>
  );
}

export default MyApp;
