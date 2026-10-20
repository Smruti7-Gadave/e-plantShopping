import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

// Keep all cart calculations in one place so the displayed values stay consistent.
const calculateCartTotal = (items) =>
  items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [checkoutMessage, setCheckoutMessage] = useState('');
  const total = calculateCartTotal(items);

  const handleCheckout = () => {
    setCheckoutMessage(
      'Checkout Coming Soon! Thank you for shopping with Paradise Nursery.'
    );
  };

  const handleQuantityChange = (item, change) => {
    const nextQuantity = Number(item.quantity) + change;

    // Quantity must stay at one or more; use Delete to remove an item.
    if (nextQuantity < 1) return;

    dispatch(updateQuantity({ id: item.id, quantity: nextQuantity }));
    setCheckoutMessage('');
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
    setCheckoutMessage('');
  };

  return (
    <main className="cart-page">
      <h1>Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Discover beautiful plants for your home.</p>
        </div>
      ) : (
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src =
                    'https://placehold.co/160x160/eaf2e5/315c35?text=Plant';
                }}
              />

              <div className="cart-item-details">
                <h2>{item.name}</h2>
                <p>Unit price: {formatPrice(Number(item.price))}</p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Item total: {formatPrice(Number(item.price) * Number(item.quantity))}
                </p>

                <div className="quantity-controls">
                  <button
                    type="button"
                    aria-label={`Decrease ${item.name} quantity`}
                    disabled={item.quantity <= 1}
                    onClick={() => handleQuantityChange(item, -1)}
                  >
                    −
                  </button>

                  <span aria-live="polite">{item.quantity}</span>

                  <button
                    type="button"
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => handleQuantityChange(item, 1)}
                  >
                    +
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <section className="cart-summary" aria-label="Cart summary">
        <h2>Total Amount: {formatPrice(total)}</h2>
        <button
          type="button"
          onClick={handleCheckout}
          disabled={items.length === 0}
        >
          Checkout
        </button>
        <button
          type="button"
          className="continue-button"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </button>
        {checkoutMessage && (
          <p className="checkout-message" role="status">
            {checkoutMessage}
          </p>
        )}
      </section>
    </main>
  );
}

export default CartItem;
