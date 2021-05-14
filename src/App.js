import NavBar from "./components/NavBar";
import CartContainer from "./components/CartContainer";

import { useGlobalContext } from "./utils/context";

import "./App.css";

function App() {
  const { loading } = useGlobalContext();

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main>
      <NavBar />
      <CartContainer />
    </main>
  );
}

export default App;
