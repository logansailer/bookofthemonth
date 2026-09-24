import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
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

const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([]); //Tradeoff: stored locally in React instead of global state like Redux. It saves a lot of time in a small proof on concept like this, but a real application like this would need a shared state.
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

  // tradeoff: should be done on backend for safety, but this si fine for the sake of a demo
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // tradeoff: only done in frontend state for the sake of showing its possible, but ass no update is sent to the API, the changes do not persist into the checkout. Didn't want to have to reset the data in the server every time just to show this off.
  const handleRemove = (productId: number) => {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  };

  // tradeoff: only done in frontend state for the sake of showing its possible, but ass no update is sent to the API, the changes do not persist into the checkout. Didn't want to have to reset the data in the server every time just to show this off.
  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;

    setCartItems((items) =>
      items.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  if (isLoading) {
    return <p className="p-10">Loading cart...</p>;
  }

  if (error) {
    return <p className="p-10 text-red-600">{error}</p>;
  }

  return (
    <div className="mx-auto max-w-7xl min-h-[calc(100vh-263px)] py-15 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Cart items */}
        <div className="w-full pr-10">
          <h2 className="font-titleFont text-3xl">Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <p className="mt-8 text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="mt-6">
              {cartItems.map((item) => (
                // tradeoff: passing cart state back and forth between cart and cartitems could be simplified with global state, but for the purpose of this demo it keeps cartitem clean and reusable
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  onUpdateQuantity={handleUpdateQuantity}
                />
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="bg-[#fafafa] py-6 px-4 h-fit">
          <div className="border-b border-b-gray-400 pb-6">
            <h2 className="text-2xl font-medium font-titleFont">Cart Total</h2>

            <p className="flex justify-between mt-6">
              Subtotal:
              <span className="font-bold">${total.toFixed(2)}</span>
            </p>

            <p className="flex justify-between mt-4">
              Shipping:
              <span>Free</span>
            </p>
          </div>

          <p className="font-semibold text-xl flex justify-between mt-6">
            Total
            <span>${total.toFixed(2)}</span>
          </p>

          <button
            onClick={() => navigate("/checkout")}
            disabled={cartItems.length === 0}
            className="bg-black text-white w-full py-3 mt-6 hover:bg-[#2269a7] disabled:opacity-50"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
