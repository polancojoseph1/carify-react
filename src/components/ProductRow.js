import {Link} from 'react-router-dom';
import './styles/ProductRow.css'
import ProductCard from './ProductCard';

function ProductRow(props) {
  const { threeProducts, cart, setCart } = props
  return (
    <div className="ProductRow">
      <div className='three-products'>
        {threeProducts.map(product => (
          <Link to={`/product/${product.id}`} className="react-link">
              <div className='product-card'>
              <ProductCard
                product={product}
                cart={cart}
                setCart={setCart}
              />
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductRow;
