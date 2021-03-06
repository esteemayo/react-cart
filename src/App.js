import Modal from 'components/Modal';
import NavBar from 'components/NavBar';
import CartContainer from 'components/CartContainer';

import { useGlobalContext } from 'utils/context';

import './App.css';

function App() {
  const { loading, isOpen } = useGlobalContext();

  if (loading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <NavBar />
      <CartContainer />
    </main>
  );
}

export default App;
