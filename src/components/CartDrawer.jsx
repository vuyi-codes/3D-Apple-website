// CartDrawer — slide-out panel driven by Zustand `cartOpen` / `cart`.
// Mounted once in App.jsx so it works from any route (navbar cart icon,
// Store "Add to Bag", Product Detail "Add to Cart").
// Frontend-only: Checkout is a disabled mock button, no payment / API.
import useMacbookStore from "../store";

const CartDrawer = () => {
    const { cart, cartOpen, closeCart, removeFromCart, updateQty, clearCart } =
        useMacbookStore();

    const subtotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0);
    const itemCount = cart.reduce((sum, line) => sum + line.qty, 0);

    return (
        <>
            {/* Dimmed backdrop — click to close */}
            <div
                className={`cart-backdrop ${cartOpen ? "cart-backdrop-open" : ""}`}
                onClick={closeCart}
                aria-hidden={!cartOpen}
            />

            <aside
                id="cart-drawer"
                className={cartOpen ? "cart-drawer-open" : ""}
                aria-hidden={!cartOpen}
                aria-label="Shopping bag"
            >
                <div className="cart-drawer-head">
                    <h2>Bag {itemCount > 0 && <span>({itemCount})</span>}</h2>
                    <button type="button" onClick={closeCart} aria-label="Close bag">
                        ✕
                    </button>
                </div>

                {cart.length === 0 ? (
                    <p className="cart-empty">Your bag is empty.</p>
                ) : (
                    <>
                        <ul className="cart-lines">
                            {cart.map((line) => (
                                <li key={`${line.id}-${line.color}`} className="cart-line">
                                    <div className="cart-line-info">
                                        <p className="cart-line-name">{line.name}</p>
                                        <p className="cart-line-meta">
                                            {line.color}
                                            {" · "}
                                            ${line.price.toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="cart-line-qty">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateQty(line.id, line.color, line.qty - 1)
                                            }
                                            aria-label="Decrease quantity"
                                        >
                                            −
                                        </button>
                                        <span>{line.qty}</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateQty(line.id, line.color, line.qty + 1)
                                            }
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        className="cart-line-remove"
                                        onClick={() => removeFromCart(line.id, line.color)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-footer">
                            <div className="cart-subtotal">
                                <span>Subtotal</span>
                                <span>${subtotal.toLocaleString()}</span>
                            </div>
                            {/* Mock checkout — no backend. Disabled on purpose. */}
                            <button type="button" className="btn-primary-pill cart-checkout" disabled>
                                Checkout (coming soon)
                            </button>
                            <button type="button" className="cart-clear" onClick={clearCart}>
                                Clear bag
                            </button>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
};

export default CartDrawer;
