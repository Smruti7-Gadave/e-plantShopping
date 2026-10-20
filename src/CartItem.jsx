
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

const PLACEHOLDER_IMAGE =
  'https://placehold.co/160x160/eaf2e5/315c35?text=Plant';

// Format prices consistently in Indian Rupees.
const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  // Read the current cart directly from Redux.
  const cart = useSelector((state) => state.cart.items);

  // Calculate the total price for one plant at its current quantity.
  const calculateTotalCost = (item) =>
    (Number(item.price) || 0) * (Number(item.quantity) || 0);

  // Calculate the combined cost of every item in the cart.
  const calculateTotalAmount = () =>
    cart.reduce((total, item) => total + calculateTotalCost(item), 0);

  // Increase the quantity of a plant by one.
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: Number(item.quantity) + 1,
      })
    );
  };

  // Decrease the quantity, removing the plant if it reaches zero.
  const handleDecrement = (item) => {
    const newQuantity = Number(item.quantity) - 1;

    if (newQuantity <= 0) {
      dispatch(removeItem(item.id));
    } else {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: newQuantity,
        })
      );
    }
  };

  // Remove a particular plant from the cart.
  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  // Checkout is not implemented yet.
  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  // Return to the product listing through the parent component.
  const handleContinueShopping = () => {
    if (typeof onContinueShopping === 'function') {
      onContinueShopping();
    }
  };

  return (
    <main className="cart-page">
      <h1>Your Shopping Cart</h1>

      <section className="cart-summary" aria-label="Cart summary">
        <h2 className="cart-total-amount">
          Total Cart Amount: {formatPrice(calculateTotalAmount())}
        </h2>
      </section>

      {cart.length === 0 ? (
        <div className="empty-cart">
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
                alt={item.name}
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

                <div className="quantity-controls">
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
                  Total: {formatPrice(calculateTotalCost(item))}
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
