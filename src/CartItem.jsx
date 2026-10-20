import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);

const calculateCartTotal = (items) =>
  items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = calculateCartTotal(items);

  const handleCheckout = () => {
    alert('Thank you for shopping with Paradise Nursery! Checkout Coming Soon.');
  };

  const handleQuantityChange = (item, change) => {
    const nextQuantity = item.quantity + change;

    if (nextQuantity < 1) {
      return;
    }

    dispatch(updateQuantity({ id: item.id, quantity: nextQuantity }));
  };

  return (
    <main className="cart-page">
      <h1>Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Discover beautiful plants for your home.</p>
          <button type="button" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src =
                      'https://placehold.co/160x160?text=Plant';
                  }}
                />

                <div className="cart-item-details">
                  <h2>{item.name}</h2>
                  <p>Unit price: {formatPrice(Number(item.price))}</p>
                  <p>
                    Quantity: {item.quantity}
                  </p>
                  <p>
                    Item total: {formatPrice(Number(item.price) * item.quantity)}
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
                      onClick={() => dispatch(removeItem(item.id))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <section className="cart-summary" aria-label="Cart summary">
            <h2>Total: {formatPrice(total)}</h2>
            <button type="button" onClick={handleCheckout}>
              Checkout
            </button>
            <button
              type="button"
              className="continue-button"
              onClick={onContinueShopping}
            >
              Continue Shopping
            </button>
          </section>
        </>
      )}
    </main>
  );
}

export default CartItem;
