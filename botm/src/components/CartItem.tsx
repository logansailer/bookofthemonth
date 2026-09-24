interface CartItemProps {
  item: {
    id: number;
    title: string;
    author: string;
    image: string;
    price: number;
    quantity: number;
  };
  onRemove?: (productId: number) => void;
  onUpdateQuantity?: (productId: number, quantity: number) => void;
  showQuantityControls?: boolean;
}

const APIURL = "http://localhost:3000";

const CartItem = ({
  item,
  onRemove,
  onUpdateQuantity,
  showQuantityControls = true,
}: CartItemProps) => {
  return (
    <div className="p-3 gap-4 mt-6 grid grid-cols-2 md:grid-cols-[auto_1fr_auto_auto]">
      <div className="flex justify-center items-center gap-2">
        <img
          className="w-28 object-cover"
          src={`${APIURL}${item.image}`}
          alt={item.title}
        />
      </div>

      <div className="flex flex-col justify-center">
        <h2>{item.title}</h2>
        <p className="text-gray-500">{item.author}</p>
      </div>

      <div className="flex items-center gap-2 whitespace-nowrap">
        <p className="text-sm">Quantity</p>

        {showQuantityControls ? (
          <div className="flex items-center gap-2 text-sm font-semibold">
            <button
              onClick={() => onUpdateQuantity?.(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="border h-5 text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white disabled:opacity-40"
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
              className="border h-5 text-lg flex items-center justify-center px-2 hover:bg-gray-700 hover:text-white"
            >
              +
            </button>
          </div>
        ) : (
          <span className="font-semibold">{item.quantity}</span>
        )}
      </div>

      <div className="flex items-center whitespace-nowrap">
        <p className="font-semibold">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        
        {onRemove && (
          <button
            onClick={() => onRemove(item.id)}
            className="text-gray-600 hover:text-red-500 ml-5 cursor-pointer"
            aria-label={`Remove ${item.title}`}
          >
            <span className="text-xl font-bold">&#10005;</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
