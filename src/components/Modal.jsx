import { useGlobalContext } from 'context/cart/CartContext';

const Modal = () => {
  const { closeModal, handleClearCart } = useGlobalContext();

  return (
    <aside className='modal-container'>
      <div className='modal'>
        <h4>remove all items from your shopping cart?</h4>
        <div className='btn-container'>
          <button
            type='button'
            className='btn confirm-btn'
            onClick={() => {
              handleClearCart();
              closeModal();
            }}
          >
            confirm
          </button>
          <button
            type='button'
            className='btn clear-btn'
            onClick={() => closeModal()}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
