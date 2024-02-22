const getAllProducts = async (api, setProducts) => {
  try {
    const { data } = await api.get('/product');
    // creates a new array of arrays which has three
    // products per array
    const productsArray = [];
    for (let i = 0; i < data.length; i += 3) {
      productsArray.push(data.slice(i, i + 3));
    }
    setProducts(productsArray);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const getProductById = async (productId, setProduct, api) => {
  try {
    const { data } = await api.get(`/product/${productId}`);
    const [product] = data
    setProduct(product)
    return product
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

const createGuest = async (auth, setUserId) => {
  try {
    const { data } = await auth.post('/guest');
    const { user } = data
    const userId = user.id
    setUserId(userId)
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

const getUserIdByStorage = () => {
  return localStorage.getItem('userId');
}

const setUserIdByStorage = (userId) => {
  localStorage.setItem('userId', userId)
}

const getCartByUserId = async (userId, setCart, api) => {
  try {
    const { data } = await api.get(`/cart/${userId}`);
    const [ cart ] = data
    setCart(cart);
  } catch (error) {
    console.error('Error fetching product:', error);
  }
}

const createCart = async (userId, setCart, status, paymentAccountId, api) => {
  try {
    const { data } = await api.post(`/cart/${userId}`, {
      "status": status,
      "paymentAccountId": paymentAccountId // allow null
    });
    const [ cart ] = data
    setCart(cart);
  } catch (error) {
    console.error('Error fetching product:', error);
  }
}

const createCartProduct = async (cartId, productId, quantity, totalPrice, api) => {
  try {
    const { data } = await api.post(`/cart-product/`, {
      cartId,
      productId,
      quantity,
      totalPrice
    });
  } catch (error) {
    console.error('Error fetching product:', error);
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
  createCartProduct
}