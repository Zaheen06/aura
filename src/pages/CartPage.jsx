// ─────────────────────────────────────────────
// CartPage — Content rendered inside the
// Cart SidePanel. Receives cart data via props.
//
// Props:
//   cart      — array of cart item objects
//   onRemove  — callback(index) to remove an item
// ─────────────────────────────────────────────

export default function CartPage({ cart = [], onRemove }) {
  const total = cart.reduce((sum, item) => sum + item.priceNum, 0);

  if (cart.length === 0) {
    return (
      <div className="empty-state">
        Your cart is empty.<br /><br />Discover your new obsession.
      </div>
    );
  }

  return (
    <>
      {/* Scrollable item list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {cart.map((item, i) => (
          <div className="cart-item" key={i}>
            <img src={item.image} alt={item.name} className="cart-item-img" />
            <div className="cart-item-info">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-price">
                {item.price}
                {item.selectedColorName && ` · ${item.selectedColorName}`}
              </div>
            </div>
            <button
              className="cart-item-remove"
              onClick={() => onRemove?.(i)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Total + checkout button stick to the bottom */}
      <div className="cart-total">
        <span>Total</span>
        <span>${total}</span>
      </div>
      <button className="btn-primary">Checkout Now</button>
    </>
  );
}
