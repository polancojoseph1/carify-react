import './styles/CartIcon.css'
import cartLogo from '../icon/cart.png'

function CartIcon() {
  return (
    <div className="CartIcon">
      <div className='quantity'>
        10
      </div>
      <img src={cartLogo}
        alt='Cart Logo'
        className='logo'
      />
    </div>
  );
}

export default CartIcon;