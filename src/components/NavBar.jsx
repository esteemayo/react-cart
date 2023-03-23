import { CartIcon } from '../icons';
import { useGlobalContext } from 'context/cart/CartContext';

const NavBar = () => {
  const { amount } = useGlobalContext();

  return (
    <nav>
      <div className='nav-center'>
        <h3>useReducer</h3>
        <div className='nav-container'>
          <CartIcon />
          <div className='amount-container'>
            <p className='total-amount'>{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
