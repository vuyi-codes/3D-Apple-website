// Checkout — /checkout
//
// Frontend-only shell: shipping + payment fields are collected in local state
// and never sent to a server. Submitting builds a mock order id, stores it in
// Zustand (`lastOrder`), clears the bag, and shows a confirmation screen.
// Empty bag (with no lastOrder) redirects to /store.
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useMacbookStore from "../store";
import Footer from "../components/Footer";

const emptyForm = {
    fullName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
};

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, clearCart, closeCart, lastOrder, setLastOrder } = useMacbookStore();
    const [form, setForm] = useState(emptyForm);

    const subtotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0);

    // Close the bag when entering checkout; bounce empty carts with no prior mock order
    useEffect(() => {
        closeCart();
        if (cart.length === 0 && !lastOrder) {
            navigate("/store", { replace: true });
        }
    }, [cart.length, closeCart, lastOrder, navigate]);

    useGSAP(() => {
        gsap.fromTo(
            ".chk-animate",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out" }
        );
    }, [lastOrder]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // Mock order — no network call, no payment processor
        const order = {
            id: `APL-${Date.now().toString().slice(-8)}`,
            items: cart.map((line) => ({ ...line })),
            total: subtotal,
            email: form.email,
            placedAt: new Date().toLocaleString(),
        };
        setLastOrder(order);
        clearCart();
    };

    // Confirmation view after mock place-order (bag is empty, lastOrder is set)
    if (lastOrder && cart.length === 0) {
        return (
            <>
                <main id="checkout-page">
                    <section id="chk-confirm" className="chk-animate">
                        <p className="chk-eyebrow">Order placed (mock)</p>
                        <h1>Thank you.</h1>
                        <p className="chk-confirm-sub">
                            This is a frontend-only confirmation — nothing was charged
                            and no email was sent.
                        </p>
                        <div className="chk-order-box">
                            <p>
                                <span>Order ID</span> {lastOrder.id}
                            </p>
                            <p>
                                <span>Email</span> {lastOrder.email || "—"}
                            </p>
                            <p>
                                <span>Total</span> ${lastOrder.total.toLocaleString()}
                            </p>
                            <p>
                                <span>Placed</span> {lastOrder.placedAt}
                            </p>
                        </div>
                        <ul className="chk-confirm-items">
                            {lastOrder.items.map((line) => (
                                <li key={`${line.id}-${line.color}`}>
                                    {line.name} · {line.color} × {line.qty}
                                </li>
                            ))}
                        </ul>
                        <div className="chk-confirm-actions">
                            <Link
                                to="/"
                                className="btn-primary-pill"
                                onClick={() => setLastOrder(null)}
                            >
                                Back Home
                            </Link>
                            <Link
                                to="/store"
                                className="btn-ghost-pill"
                                onClick={() => setLastOrder(null)}
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

    if (cart.length === 0) return null;

    return (
        <>
            <main id="checkout-page">
                <header id="chk-hero" className="chk-animate">
                    <p className="chk-eyebrow">Checkout</p>
                    <h1>Review and place your order.</h1>
                    <p className="chk-hero-note">
                        Demo checkout only — fields stay in the browser. No payment API.
                    </p>
                </header>

                <div id="chk-layout">
                    <form id="chk-form" className="chk-animate" onSubmit={onSubmit}>
                        <h2>Shipping</h2>
                        <label>
                            Full name
                            <input
                                name="fullName"
                                required
                                value={form.fullName}
                                onChange={onChange}
                                autoComplete="name"
                            />
                        </label>
                        <label>
                            Email
                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={onChange}
                                autoComplete="email"
                            />
                        </label>
                        <label>
                            Address
                            <input
                                name="address"
                                required
                                value={form.address}
                                onChange={onChange}
                                autoComplete="street-address"
                            />
                        </label>
                        <div className="chk-row">
                            <label>
                                City
                                <input
                                    name="city"
                                    required
                                    value={form.city}
                                    onChange={onChange}
                                    autoComplete="address-level2"
                                />
                            </label>
                            <label>
                                ZIP
                                <input
                                    name="zip"
                                    required
                                    value={form.zip}
                                    onChange={onChange}
                                    autoComplete="postal-code"
                                />
                            </label>
                        </div>

                        <h2>Payment (mock)</h2>
                        <label>
                            Card number
                            <input
                                name="cardNumber"
                                required
                                placeholder="4242 4242 4242 4242"
                                value={form.cardNumber}
                                onChange={onChange}
                                autoComplete="cc-number"
                            />
                        </label>
                        <div className="chk-row">
                            <label>
                                Expiry
                                <input
                                    name="expiry"
                                    required
                                    placeholder="MM/YY"
                                    value={form.expiry}
                                    onChange={onChange}
                                    autoComplete="cc-exp"
                                />
                            </label>
                            <label>
                                CVC
                                <input
                                    name="cvc"
                                    required
                                    placeholder="123"
                                    value={form.cvc}
                                    onChange={onChange}
                                    autoComplete="cc-csc"
                                />
                            </label>
                        </div>

                        <button type="submit" className="btn-primary-pill chk-submit">
                            Place Order
                        </button>
                    </form>

                    <aside id="chk-summary" className="chk-animate">
                        <h2>Bag</h2>
                        <ul>
                            {cart.map((line) => (
                                <li key={`${line.id}-${line.color}`}>
                                    <div>
                                        <p className="chk-sum-name">{line.name}</p>
                                        <p className="chk-sum-meta">
                                            {line.color} × {line.qty}
                                        </p>
                                    </div>
                                    <p>${(line.price * line.qty).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="chk-sum-total">
                            <span>Subtotal</span>
                            <span>${subtotal.toLocaleString()}</span>
                        </div>
                        <Link to="/store" className="btn-ghost-pill">
                            ← Edit bag in Store
                        </Link>
                    </aside>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Checkout;
