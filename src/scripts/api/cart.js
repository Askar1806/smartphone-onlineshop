export const addProductToCart = async (product) => {
  const response = await fetch("http://localhost:3000/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();

  return data;
};

export const getCartProducts = async () => {
  const response = await fetch("http://localhost:3000/cart");
  const data = await response.json();

  return data;
};

export const deleteProductFromCart = async (id) => {
  const response = await fetch(`http://localhost:3000/cart/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();

  return data;
};
