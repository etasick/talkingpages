'use client';

import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Helmet } from "react-helmet-async";

function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const handleQuantityChange = (productId, variation, amount) => {
    const cartItem = cart.find(
      (item) =>
        item.product._id === productId &&
        item.selectedVariation?._id === variation?._id
    );
    if (cartItem && cartItem.quantity + amount > 0) {
      updateQuantity(productId, variation, amount);
    }
  };

  const totalAmount = cart.reduce(
    (total, item) =>
      total + ((item.selectedVariation?.price ?? item.product?.price ?? 0) * item.quantity),
    0
  );

  const proceedToCheckout = () => {
    if (cart.length === 0) return;
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>Cart Page</title>
        <meta name="description" content="Cart Page" />
      </Helmet>
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-slate-500">Your cart is empty</p>
      ) : (
        <div className="grid gap-4">
          {cart.map((item) => (
            <div
              key={`${item.product._id}-${item.selectedVariation?.size || "simple"}`}
              className="flex items-center justify-between bg-white shadow-md rounded-lg p-4"
            >
              <div className="flex items-center">
                <Image
                  src={item.product.picture || "/default-image.jpg"}
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className="object-cover rounded-lg"
                />
                <div className="ml-4">
                  <h3 className="font-bold text-lg">{item.product.name}</h3>
                  {item.selectedVariation && (
                    <p className="text-slate-500">Size: {item.selectedVariation.size}</p>
                  )}
                  <p className="text-slate-600">
                    Price: ${(
                      item.selectedVariation?.price ??
                      item.product?.price ??
                      0
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300"
                  onClick={() => handleQuantityChange(item.product._id, item.selectedVariation, -1)}
                >
                  -
                </button>
                <p className="mx-3">{item.quantity}</p>
                <button
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300"
                  onClick={() => handleQuantityChange(item.product._id, item.selectedVariation, 1)}
                >
                  +
                </button>
              </div>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => removeFromCart(item.product._id, item.selectedVariation)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {cart.length > 0 && (
        <div className="mt-6">
          <p className="text-xl font-bold">Total Amount: ${totalAmount.toFixed(2)}</p>
          <button
            onClick={proceedToCheckout}
            className={`mt-4 px-6 py-3 text-white font-semibold rounded-lg ${
              cart.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={cart.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
