import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import ProductList from "../components/ProductList";
import CategoryList from "../components/CategoryList";
import Image from "next/image";
import { ChevronRightIcon, TagIcon, GiftIcon, ShoppingCartIcon, UsersIcon } from "@heroicons/react/24/outline";
import { sanityClient } from "@/lib/sanity"; // Import Sanity client
import HeroSlider from "@/components/HeroSlider";
import AboutSection from "@/components/AboutSection";

const Homepage = ({ initialProducts }) => {
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const router = useRouter();
  const heroImage = "https://www.butterflyassets.online/THCVapeCartsimages/THC_vape_carts_slider2.webp";

  useEffect(() => {
    if (!initialProducts || initialProducts.length === 0) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const query = `*[_type == "product"] {
            _id,
            name,
            price,
            picture,
            description,
            "slug": slug.current  // Extracts the slug string
          }`;
          const fetchedProducts = await sanityClient.fetch(query);
          setProducts(fetchedProducts);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [initialProducts]);

  return (
    <div className="homepage">
      <Head>
        <meta charSet="utf-8" />
          <title>THC Vape Carts USA | Premium 510 Cartridges & Bulk Wholesale</title>
          <meta name="description" content="America's Largest Online THC Marketplace: 25+ Lab-Tested Flavors, Wholesale Distribution, Daily Deals & Secure Nationwide Shipping. Shop Now or Apply for Bulk Pricing." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="google-site-verification" content="M5_Be77XRV7wLIYPz7TojK2sQfLiCPaN45H1bBaghTE" />
        <link rel="icon" href="https://www.butterflyassets.online/THCVapeCartsimages/THCVapecartusa.png" />
      </Head>

      {/* Hero Section */}
      <HeroSlider/>
      <div className="bg-emerald-800 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
          <div className="flex items-center space-x-2">
            <GiftIcon className="w-6 h-6 text-white" />
            <span className="text-black text-lg font-medium">New Customer Offer: Use Code WELCOME20 for 20% Off First Order!</span>
          </div>
          <button 
            onClick={() => router.push('/shop')}
            className="bg-white text-emerald-800 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Category List */}
      <CategoryList />
<section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <UsersIcon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Wholesale Program</h3>
            <p className="text-gray-600">Volume discounts up to 40% for retailers & distributors</p>
            <button 
              onClick={() => router.push('/shop')}
              className="mt-4 text-emerald-600 font-semibold hover:underline"
            >
              Learn More →
            </button>
          </div>
          
          <div className="text-center p-6">
            <ShoppingCartIcon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Daily Deals</h3>
            <p className="text-gray-600">Flash sales & rotating promotions</p>
            <div className="mt-4">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">Today: Buy 2 Get 1 Free</span>
            </div>
          </div>

          <div className="text-center p-6">
            <TagIcon className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Loyalty Rewards</h3>
            <p className="text-gray-600">Earn points with every purchase</p>
            <button 
              onClick={() => router.push('/rewards')}
              className="mt-4 text-emerald-600 font-semibold hover:underline"
            >
              Join Program →
            </button>
          </div>
        </div>
      </section>
      {/* Product List */}
      {loading ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      ) : (
        <ProductList products={products} />
      )}
      <AboutSection/>
    </div>
  );
};

export async function getStaticProps() {
  try {
    const query = `*[_type == "product"] {
      _id,
      name,
      price,
      picture,
      description,
      "slug": slug.current  // Extracts slug field properly
    }`;
    const products = await sanityClient.fetch(query);

    return {
      props: {
        initialProducts: products || [],
      },
      revalidate: 60, // Re-generate the page every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching products from Sanity:", error);
    return {
      props: {
        initialProducts: [],
      },
      revalidate: 60,
    };
  }
}

export default Homepage;
