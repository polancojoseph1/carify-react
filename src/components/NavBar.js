import './styles/NavBar.css'
import CartIcon from './CartIcon'

function NavBar() {
  return (
    <div className="NavBar">
      <div className='items'>
        <div className='cart-icon'>
          <CartIcon/>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
