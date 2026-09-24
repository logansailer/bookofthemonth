export const getCart = async () => {
  const response = await fetch("/api/cart");

  if (!response.ok) {
    throw new Error("Unable to load cart.");
  }

  return response.json();
};
