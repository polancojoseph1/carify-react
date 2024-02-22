import './styles/ProductCard.css'
import AddToCart from './AddToCart';

function ProductCard(props) {
  const { product, cart, setCart } = props;
  const {
    brand,
    category,
    price,
    imageurl,
    totalrating
  } = product;
  return (
    <div className="ProductCard">
      <div className='details'>
        <div className='image-section'>
          <img src={imageurl} className="image" />
        </div>
        <div className='info'>
          <div className='brand'>Brand: { brand }</div>
          <div className='category'>Category: { category }</div>
          <div className='price'>Price: { price }</div>
          <div className='totalrating'>Rating: {totalrating}</div>
          <div className='add-to-cart'>
            <AddToCart
              product={product}
              cart={cart}
              setCart={setCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
