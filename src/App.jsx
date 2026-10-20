
import { useState } from 'react';
import './App.css';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';

function App() {
  const [started, setStarted] = useState(false);

  if (started) {
    return (
      <div>
        <ProductList />
      </div>
    );
  }

  return (
    <div className="app">
      <main className="landing-page">
        <div className="landing-content">
          <h1>Paradise Nursery</h1>
          <h2>Bring Nature Home</h2>
          <p>
            Discover beautiful houseplants to brighten your home,
            refresh your space, and bring you closer to nature.
          </p>

          <button onClick={() => setStarted(true)}>
            Get Started
          </button>

          <AboutUs />
        </div>
      </main>
    </div>
  );
}

export default App;
