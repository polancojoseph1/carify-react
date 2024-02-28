const getAllProducts = async (api=null) => {
  try {
    if (!api) return null
    const { data } = await api.get('/product');
    // creates a new array of arrays which has three
    // products per array
    const productsArray = [];
    for (let i = 0; i < data.length; i += 3) {
      productsArray.push(data.slice(i, i + 3));
    }
    return productsArray
  } catch (error) {
    console.error('Error fetching all products:', error);
  }
};

const getProductById = async (productId, api=null) => {
  try {
    if (!api) return null
    const { data } = await api.get(`/product/${productId}`);
    const [product] = data
    return product
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

const createGuest = async (auth=null) => {
  try {
    if (!auth) return null
    const { data } = await auth.post('/guest');
    const { user } = data
    const userId = user.id
    return userId
  } catch (error) {
    console.error('Error creating guest:', error);
  }
};

const getUserIdByStorage = () => {
  return localStorage.getItem('userId');
}

const setUserIdByStorage = (userId) => {
  localStorage.setItem('userId', userId)
}

const getCartByUserId = async (userId, api=null) => {
  try {
    if (!api) return null
    const { data } = await api.get(`/cart/${userId}`);
    const [cart] = data
    return cart
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
}

const createCart = async (userId, status, paymentAccountId, api=null) => {
  try {
    if (!api) return null
    const { data } = await api.post(`/cart/${userId}`, {
      "status": status,
      "paymentAccountId": paymentAccountId // allow null
    });
    const [cart] = data
    return cart
  } catch (error) {
    console.error('Error creating cart:', error);
  }
}

const getCartProductsByCartId = async (cartId, api=null) => {
  try {
    if (!api) return null
    const { data } = await api.get(`/cart-product/${cartId}`);
    return data
  } catch (error) {
    console.error('Error fetching cart products:', error);
  }
}

const getCartProductByCartIdAndProductId = async (cartId, productId, api = null) => {
  try {
    if (!api) return null;
    const { data } = await api.get(`/cart-product/${cartId}/${productId}`);
    return data
  } catch (error) {
    console.error('Error fetching cart product', error)
  }
}

const createCartProduct = async (cartId, productId, quantity, totalPrice, api=null) => {
  try {
    if (!api) return null
    await api.post(`/cart-product/`, {
      cartId,
      productId,
      quantity,
      totalPrice
    });
  } catch (error) {
    console.error('Error creating cart product:', error);
  }
}

const updateCartProductAdd = async (cartId, productId, addedQuantity, addedPrice, api=null) => {
  try {
    if (!api) return null
    const cartProduct = await api.put(`/cart-product/add`, {
      cartId,
      productId,
      addedQuantity,
      addedPrice
    });
    return cartProduct
  } catch (error) {
    console.error('Error updating cart product:', error);
  }
}

const updateCartProductChange = async (id, changedQuantity, changedPrice, api=null) => {
  try {
    if (!api) return null
    const cartProduct = await api.put(`/cart-product/change/${id}`, {
      changedQuantity,
      changedPrice
    });
    return cartProduct
  } catch (error) {
    console.error('Error updating cart product:', error);
  }
}

const deleteCartProduct = async (cartId, productId, api=null) => {
  try {
    if (!api) return null
    const cartProduct = await api.delete(`/cart-product/${cartId}/${productId}`);
    return cartProduct
  } catch (error) {
    console.error('Error deleting cart product:', error);
  }
}

export {
  getAllProducts,
  getProductById,
  createGuest,
  getUserIdByStorage,
  setUserIdByStorage,
  getCartByUserId,
  createCart,
  createCartProduct,
  getCartProductsByCartId,
  getCartProductByCartIdAndProductId,
  updateCartProductAdd,
  updateCartProductChange,
  deleteCartProduct
}