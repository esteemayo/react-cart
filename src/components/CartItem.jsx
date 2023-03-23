import { useGlobalContext } from 'context/cart/context';
import { ChevronDown, ChevronUp } from '../icons';

const CartItem = ({ id, img, title, price, amount }) => {
  const { handleRemove, toggleAmount } = useGlobalContext();

  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <button className='remove-btn' onClick={() => handleRemove(id)}>
          Remove
        </button>
      </div>
      <div>
        <button className='amount-btn' onClick={() => toggleAmount(id, 'inc')}>
          <ChevronUp />
        </button>
        <p className='amount'>{amount}</p>
        <button className='amount-btn' onClick={() => toggleAmount(id, 'dec')}>
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
