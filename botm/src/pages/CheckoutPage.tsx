import { useEffect, useState } from "react";
import { getCart } from "../api/cart";

import CartItem from "../components/CartItem";

interface CartItem {
  id: number;
  title: string;
  author: string;
  image: string;
  price: number;
  quantity: number;
}

interface OrderConfirmation {
  orderId: string;
  shipDate: string;
}

const user = {
  name: "Logan Sailer",
  addressPrimary: "34 West 27th Street",
  addressSecondary: "Floor 10",
  addressCity: "New York",
  addressState: "NY",
  addressZip: "10001",
  addressCountry: "USA",
};

const Checkout = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<OrderConfirmation | null>(
    null,
  );

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart();
        setCartItems(data.cart);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Unable to load your order.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handlePlaceOrder = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart: cartItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to place order.");
      }

      setConfirmation({
        orderId: data.orderId,
        shipDate: data.shipDate,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to place order.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl py-20">
        <p>Loading your order...</p>
      </div>
    );
  }

  if (confirmation) {
    return (
      <div className="mx-auto min-h-[calc(100vh-263px)] max-w-3xl py-15 text-center">
        <h1 className="font-titleFont text-4xl">Order Confirmed!</h1>

        <p className="mt-6 text-lg">Thank you for your order.</p>

        <div className="mt-8 bg-[#fafafa] p-8">
          <p>
            Order ID:{" "}
            <span className="font-semibold">{confirmation.orderId}</span>
          </p>

          <p className="mt-4">
            Ship Date:{" "}
            <span className="font-semibold">{confirmation.shipDate}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl py-10 px-6">
      <h1 className="font-titleFont text-3xl">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
        {/* Order Items*/}
        <div>
          <h2 className="text-2xl font-medium">Your Order</h2>

          <div className="mt-6">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                showQuantityControls={false}
              />
            ))}
          </div>
        </div>

        {/* Checkout summary */}
        <div className="bg-[#fafafa] p-6 h-fit">
          <h2 className="text-2xl font-medium">Order Summary</h2>

          <div className="border-b pb-6 mt-6">
            <h3 className="font-semibold">Delivering to {user.name}</h3>

            <p className="mt-3 text-gray-600">
              {user.addressPrimary} {user.addressSecondary},
              <br />
              {user.addressCity}, {user.addressState},
              <br />
              {user.addressZip}, {user.addressCountry}
            </p>
          </div>

          <div className="flex justify-between text-xl font-semibold mt-6">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {error && (
            <div className="mt-6 bg-red-50 border border-red-300 text-red-700 p-4">
              {error}
            </div>
          )}

          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting || cartItems.length === 0}
            className="bg-black text-white w-full py-3 mt-6 hover:bg-[#2269a7] disabled:opacity-50"
          >
            {isSubmitting ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
