import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

function CheckoutPageSuccess() {
  const router = useRouter();
  const { order_id } = router.query;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!order_id) return;

    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `https://supplement-app-d151447d38d4.herokuapp.com/api/orders/${order_id}`
        );
        if (response.ok) {
          const data = await response.json();
          setOrderDetails(data);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrderDetails();
  }, [order_id]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading order details...</p>;
  }

  if (!orderDetails) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-red-500">Failed to load order details</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-blue-500 text-white px-6 py-3 rounded shadow-md hover:bg-blue-600 transition"
        >
          Return Home
        </button>
      </div>
    );
  }

  const { buyer = {}, items = [], totalAmount, couponCode, shippingMethod = {}, paymentMethod = {} } = orderDetails;

  return (
    <div className="checkout-page-success container mx-auto p-6">
      <Head>
        <title>Order Confirmation - {orderDetails._id}</title>
        <meta 
          name="description" 
          content={`Order confirmation for purchase ${orderDetails._id}`} 
        />
        <meta property="og:title" content={`Order #${orderDetails._id} Confirmation`} />
        <meta property="og:description" content="Thank you for your purchase!" />
      </Head>

      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Order Confirmation
      </h2>
      
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Order Summary</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              Order ID: <span className="font-medium">{orderDetails._id}</span>
            </p>
            <p className="text-gray-600">
              Status: <span className="font-medium capitalize">{orderDetails.status}</span>
            </p>
            <p className="text-gray-600">
              Total: <span className="font-medium">${totalAmount.toFixed(2)}</span>
            </p>
            {couponCode && (
              <p className="text-gray-600">
                Coupon: <span className="font-medium">{couponCode}</span>
              </p>
            )}
          </div>

          <h4 className="text-md font-semibold mt-4 text-gray-700">Purchased Items:</h4>
          <ul className="list-disc pl-5 mt-2">
            {items.map((item, index) => (
              <li key={index} className="text-gray-600">
                {item.name} (Qty: {item.quantity}) - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        {/* Buyer Information */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Customer Details</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              Name: <span className="font-medium">{buyer.firstName || "N/A"}</span>
            </p>
            <p className="text-gray-600">
              Email: <span className="font-medium">{buyer.email || "N/A"}</span>
            </p>
            <p className="text-gray-600">
              Phone: <span className="font-medium">{buyer.phone || "N/A"}</span>
            </p>
            <p className="text-gray-600">
              Address: <span className="font-medium">{buyer.streetAddress || "N/A"}</span>
            </p>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Payment Information</h3>
          <div className="flex items-start gap-4">
            {paymentMethod.picture && (
              <div className="relative w-16 h-16">
                <Image
                  src={paymentMethod.picture}
                  alt={paymentMethod.name}
                  fill
                  className="rounded-md object-contain"
                />
              </div>
            )}
            <div className="space-y-2">
              <p className="text-gray-600">
                Method: <span className="font-medium">{paymentMethod.name || "N/A"}</span>
              </p>
              <p className="text-gray-600">
                Description: <span className="font-medium">{paymentMethod.description || "N/A"}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Shipping Details</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              Method: <span className="font-medium">{shippingMethod.name || "N/A"}</span>
            </p>
            <p className="text-gray-600">
              Cost: <span className="font-medium">${shippingMethod.cost?.toFixed(2) || "0.00"}</span>
            </p>
            <p className="text-gray-600">
              Estimated Delivery:{" "}
              <span className="font-medium">
                {shippingMethod.estimatedDeliveryTime || "3-5 business days"}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default CheckoutPageSuccess;