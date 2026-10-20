
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';
import './ProductList.css';

const categories = [
  {
    name: 'Air Purifying Plants',
    plants: [
      {
        id: 1,
        name: 'Snake Plant',
        price: 299,
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 2,
        name: 'Peace Lily',
        price: 349,
        image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 3,
        name: 'Spider Plant',
        price: 249,
        image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 4,
        name: 'Areca Palm',
        price: 399,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 5,
        name: 'Rubber Plant',
        price: 449,
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 6,
        name: 'Boston Fern',
        price: 279,
        image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=500&q=80',
      },
    ],
  },
  {
    name: 'Low Maintenance Plants',
    plants: [
      {
        id: 7,
        name: 'Jade Plant',
        price: 199,
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 8,
        name: 'ZZ Plant',
        price: 399,
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 9,
        name: 'Aloe Vera',
        price: 179,
        image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 10,
        name: 'Pothos',
        price: 229,
        image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 11,
        name: 'Lucky Bamboo',
        price: 259,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 12,
        name: 'Cactus',
        price: 149,
        image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=500&q=80',
      },
    ],
  },
  {
    name: 'Decorative Plants',
    plants: [
      {
        id: 13,
        name: 'Monstera',
        price: 499,
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 14,
        name: 'Calathea',
        price: 379,
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 15,
        name: 'Philodendron',
        price: 329,
        image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 16,
        name: 'Anthurium',
        price: 429,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 17,
        name: 'Chinese Evergreen',
        price: 359,
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=500&q=80',
      },
      {
        id: 18,
        name: 'Bird of Paradise',
        price: 599,
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=500&q=80',
      },
    ],
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const addedIds = items.map((item) => item.id);

  return (
    <div className="shop">
      <nav className="navbar">
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            window.location.reload();
          }}
        >
          Paradise Nursery
        </a>

        <div className="nav-links">
          <button
            onClick={() => window.location.reload()}
          >
            Home
          </button>

          <button
            onClick={() => setShowCart(false)}
          >
            Plants
          </button>

          <button
            onClick={() => setShowCart(true)}
          >
            🛒 Cart ({cartCount})
          </button>
        </div>
      </nav>

      {showCart ? (
        <CartItem
          onContinueShopping={() => setShowCart(false)}
        />
      ) : (
        <main className="products">
          <h1>Our Houseplants</h1>

          <p className="shop-intro">
            Find the perfect green companion for your home.
          </p>

          {categories.map((category) => (
            <section
              className="category"
              key={category.name}
            >
              <h2>{category.name}</h2>

              <div className="product-grid">
                {category.plants.map((plant) => {
                  const isAdded = addedIds.includes(plant.id);

                  return (
                    <article
                      className="product-card"
                      key={plant.id}
                    >
                      <img
                        src={plant.image}
                        alt={plant.name}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src =
                            'https://placehold.co/500x350/eaf2e5/315c35?text=Houseplant';
                        }}
                      />

                      <h3>{plant.name}</h3>

                      <p className="price">
                        ₹{plant.price}
                      </p>

                      <button
                        disabled={isAdded}
                        onClick={() => dispatch(addItem(plant))}
                      >
                        {isAdded ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}

export default ProductList;
