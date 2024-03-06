const getAllProducts = async (api = null) => {
  try {
    if (!api) return null;
    const { data } = await api.get('/product');
    // creates a new array of arrays which has three
    // products per array, padded with null if necessary
    const productsArray = [];
    for (let i = 0; i < data.length; i += 3) {
      const slicedArray = data.slice(i, i + 3);
      // Pad the sliced array with null values if it has less than 3 items
      const paddedArray = slicedArray.concat(Array.from({ length: 3 - slicedArray.length }, () => null));
      productsArray.push(paddedArray);
    }
    return productsArray;
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

const login = async (email, password, auth=null) => {
  try {
    if (!auth) return null
    const { data } = await auth.post('/login', {
      email,
      password
    });
    const { user } = data
    return user
  } catch (error) {
    console.error('Error creating guest:', error);
  }
};

const signup = async (name, email, password, auth=null) => {
  try {
    if (!auth) return null
    const { data } = await auth.post('/signup', {
      name,
      email,
      password
    });
    const { user } = data
    return user
  } catch (error) {
    console.error('Error creating guest:', error);
  }
};

const logout = async (auth=null) => {
  try {
    if (!auth) return null
    await auth.post('/logout');
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

const removeUserIdFromStorage = () => {
  localStorage.removeItem('userId')
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

const updateCart = async (id, status, paymentAccountId, api=null) => {
  try {
    if (!api) return null
    const { data } = await api.put(`/cart/${id}`, {
      "status": status,
      "paymentAccountId": paymentAccountId // allow null
    });
    const {cart} = data
    return cart
  } catch (error) {
    console.error('Error updating cart:', error);
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

const getUserById = async (id, api=null) => {
  try {
    if (!api) return null
    const { data } = await api.get(`/user/${id}`);
    const [ user ] = data
    return user
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}

const editUser = async (id, name, email, api=null) => {
  try {
    if (!api) return null
    const { data } = await api.get(`/user/${id}`, {
      name,
      email
    });
    const [user] = data
    return user
  } catch (error) {
    console.error('Error editing user:', error);
  }
}

export {
  getAllProducts,
  getProductById,
  createGuest,
  login,
  signup,
  logout,
  getUserIdByStorage,
  setUserIdByStorage,
  removeUserIdFromStorage,
  getCartByUserId,
  createCart,
  updateCart,
  createCartProduct,
  getCartProductsByCartId,
  getCartProductByCartIdAndProductId,
  updateCartProductAdd,
  updateCartProductChange,
  deleteCartProduct,
  getUserById,
  editUser
}