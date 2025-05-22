import React, { useEffect, useState } from "react";
import Head from "next/head";
import { sanityClient } from "@/lib/sanity";
import ProductList from "../components/ProductList";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/router";

function Shop({ initialProducts }) {
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);
  const [error, setError] = useState(null);

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
          setError("Failed to load products. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [initialProducts]);

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md mx-auto">
          {error}
          <button
            onClick={() => router.reload()}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Head>
        <title>Shop Premium THC Vape Cartridges | THC Vape Carts USA</title>
        <meta 
          name="description" 
          content="Browse our premium selection of lab-tested THC vape cartridges. Choose from 25+ flavors, various strengths, and exclusive bundles. Fast, discreet shipping nationwide." 
        />
        <meta property="og:title" content="Premium THC Vape Cartridges Shop" />
        <meta property="og:description" content="Explore our curated collection of high-quality THC vape products" />
      </Head>

      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop Premium THC Cartridges</h1>
        <p className="text-lg text-gray-600">
          Lab-Tested • 25+ Flavors • Satisfaction Guaranteed
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
          <span className="ml-2 text-gray-600">Loading Products...</span>
        </div>
      ) : (
        
          <ProductList products={products} />
        
      )}
    </div>
  );
}

export async function getStaticProps() {
  try {
    const query = `*[_type == "product"] {
      _id,
      name,
      price,
      picture,
      description,
      "slug": slug.current  // Extracts the slug string
    }`;
    
    const products = await sanityClient.fetch(query);

    return {
      props: {
        initialProducts: products || [],
      },
      revalidate: 60,
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

export default Shop;