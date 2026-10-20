import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

const PLACEHOLDER_IMAGE =
  'https://placehold.co/160x160/eaf2e5/315c35?text=Plant';

const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items ?? []);

  const calculateTotalCost = (item) =>
    (Number(item.price) || 0) * (Number(item.quantity) || 0);

  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateTotalCost(item), 0);

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: (Number(item.quantity) || 0) + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    const newQuantity = (Number(item.quantity) || 0) - 1;

    if (newQuantity <= 0) {
      dispatch(removeItem(item.id));
      return;
    }

    dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  const handleCheckoutShopping = () => {
    window.alert('Coming Soon');
  };

  const handleContinueShopping = () => {
    if (typeof onContinueShopping === 'function') {
      onContinueShopping();
    }
  };

  return (
    <main className="cart-page">
      <h1>Your Shopping Cart</h1>

      <section className="cart-summary" aria-label="Cart summary">
        <h2 className="cart-total-amount" aria-live="polite">
          Total Cart Amount: {formatPrice(calculateTotalAmount())}
        </h2>
      </section>

      {cart.length === 0 ? (
        <div className="empty-cart" role="status">
          <h2>Your cart is empty</h2>
          <p>Discover beautiful plants for your home.</p>
        </div>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img
                className="cart-item-image"
                src={item.image || PLACEHOLDER_IMAGE}
                alt={item.name || 'Plant'}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = PLACEHOLDER_IMAGE;
                }}
              />

              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-cost">
                  Unit Price: {formatPrice(item.price)}
                </p>

                <div
                  className="quantity-controls"
                  aria-label={`Quantity controls for ${item.name}`}
                >
                  <button
                    type="button"
                    className="cart-item-button"
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => handleDecrement(item)}
                  >
                    −
                  </button>

                  <span
                    className="cart-item-quantity"
                    aria-live="polite"
                    aria-label={`Quantity: ${item.quantity}`}
                  >
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    className="cart-item-button"
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>

                <p className="cart-item-total">
                  Subtotal: {formatPrice(calculateTotalCost(item))}
                </p>

                <button
                  type="button"
                  className="delete-button cart-item-delete"
                  aria-label={`Remove ${item.name} from cart`}
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <section className="cart-summary" aria-label="Shopping actions">
        <button
          type="button"
          className="get-started-button1"
          onClick={handleCheckoutShopping}
          disabled={cart.length === 0}
        >
          Checkout
        </button>

        <button
          type="button"
          className="continue-button get-started-button1"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </section>
    </main>
  );
}

export default CartItem;
