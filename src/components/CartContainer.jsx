import CartItem from './CartItem';
import { useGlobalContext } from 'context/cart/CartContext';

const CartContainer = () => {
  const { cart, total, openModal } = useGlobalContext();

  if (cart.length === 0) {
    return (
      <section className='cart'>
        <header>
          <h2>Your Bag</h2>
          <h4 className='empty-cart'>is current empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className='cart'>
      <header>
        <h2>Your bag</h2>
      </header>

      <div>
        {cart.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            Total <span>${total}</span>
          </h4>
        </div>
        <button className='btn clear-btn' onClick={() => openModal()}>
          Clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
