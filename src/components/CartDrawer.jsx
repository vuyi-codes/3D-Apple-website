// CartDrawer — slide-out panel driven by Zustand `cartOpen` / `cart`.
// Mounted once in App.jsx so it works from any route (navbar cart icon,
// Store "Add to Bag", Product Detail "Add to Cart").
// Checkout links to /checkout — mock form only, no payment API.
// Bag lines can also be saved or moved into a Favourites list.
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useMacbookStore from "../store";
import useFavouritesStore from "../store/favourites";

const CartDrawer = () => {
    const { cart, cartOpen, closeCart, removeFromCart, updateQty, clearCart } =
        useMacbookStore();
    const lists = useFavouritesStore((s) => s.lists);
    const addProductToList = useFavouritesStore((s) => s.addProductToList);
    const createList = useFavouritesStore((s) => s.createList);
    const showToast = useFavouritesStore((s) => s.showToast);
    const getDefaultListId = useFavouritesStore((s) => s.getDefaultListId);

    const [listMenuFor, setListMenuFor] = useState(null); // `${id}::${color}` | "all" | null
    const [creating, setCreating] = useState(false);
    const [newListName, setNewListName] = useState("");

    const subtotal = cart.reduce((sum, line) => sum + line.price * line.qty, 0);
    const itemCount = cart.reduce((sum, line) => sum + line.qty, 0);

    useEffect(() => {
        if (!cartOpen) {
            setListMenuFor(null);
            setCreating(false);
            setNewListName("");
        }
    }, [cartOpen]);

    useEffect(() => {
        if (!listMenuFor) return;
        const close = (e) => {
            if (
                !e.target.closest?.(".cart-list-menu") &&
                !e.target.closest?.(".cart-list-btn")
            ) {
                setListMenuFor(null);
                setCreating(false);
            }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, [listMenuFor]);

    const lineKey = (line) => `${line.id}::${line.color}`;

    const saveLineToList = (line, listId, { remove = false } = {}) => {
        addProductToList(listId, line.id);
        const listName = lists.find((l) => l.id === listId)?.name ?? "list";
        if (remove) {
            removeFromCart(line.id, line.color);
            showToast(`Moved to “${listName}”`);
        } else {
            showToast(`Saved to “${listName}”`);
        }
        setListMenuFor(null);
        setCreating(false);
    };

    const saveAllToList = (listId, { remove = false } = {}) => {
        const uniqueIds = [...new Set(cart.map((l) => l.id))];
        uniqueIds.forEach((id) => addProductToList(listId, id));
        const listName = lists.find((l) => l.id === listId)?.name ?? "list";
        if (remove) {
            clearCart();
            showToast(`Moved bag to “${listName}”`);
        } else {
            showToast(`Saved bag to “${listName}”`);
        }
        setListMenuFor(null);
        setCreating(false);
    };

    const onCreateFromMenu = (e, line, mode) => {
        e.preventDefault();
        const id = createList(newListName);
        if (!id) return;
        setNewListName("");
        if (line === "all") {
            saveAllToList(id, { remove: mode === "move" });
        } else {
            saveLineToList(line, id, { remove: mode === "move" });
        }
    };

    const renderListMenu = (target) => {
        const isAll = target === "all";
        const line = isAll ? null : cart.find((l) => lineKey(l) === target);
        if (!isAll && !line) return null;

        return (
            <div className="cart-list-menu" role="menu">
                <p className="cart-list-menu-label">Save to</p>
                {lists.map((list) => (
                    <button
                        key={`save-${list.id}`}
                        type="button"
                        role="menuitem"
                        onClick={() =>
                            isAll
                                ? saveAllToList(list.id)
                                : saveLineToList(line, list.id)
                        }
                    >
                        {list.name}
                    </button>
                ))}
                <p className="cart-list-menu-label">Move to</p>
                <p className="cart-list-menu-hint">Adds to the list and removes from bag</p>
                {lists.map((list) => (
                    <button
                        key={`move-${list.id}`}
                        type="button"
                        role="menuitem"
                        onClick={() =>
                            isAll
                                ? saveAllToList(list.id, { remove: true })
                                : saveLineToList(line, list.id, { remove: true })
                        }
                    >
                        {list.name}
                    </button>
                ))}
                {creating ? (
                    <form
                        className="cart-list-create"
                        onSubmit={(e) => onCreateFromMenu(e, isAll ? "all" : line, "save")}
                    >
                        <input
                            type="text"
                            value={newListName}
                            onChange={(e) => setNewListName(e.target.value)}
                            placeholder="New list name"
                            maxLength={40}
                            autoFocus
                            aria-label="New list name"
                        />
                        <button type="submit" className="btn-primary-pill cart-list-mini">
                            Create & save
                        </button>
                    </form>
                ) : (
                    <button
                        type="button"
                        className="cart-list-new"
                        onClick={() => setCreating(true)}
                    >
                        + New List
                    </button>
                )}
                {!isAll && (
                    <button
                        type="button"
                        className="cart-list-quick"
                        onClick={() =>
                            saveLineToList(line, getDefaultListId(), { remove: false })
                        }
                    >
                        Quick save to Favourites
                    </button>
                )}
            </div>
        );
    };

    return (
        <>
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
                                <li key={lineKey(line)} className="cart-line">
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

                                    <div className="cart-line-actions">
                                        <div className="cart-line-list-wrap">
                                            <button
                                                type="button"
                                                className="cart-list-btn"
                                                aria-expanded={listMenuFor === lineKey(line)}
                                                onClick={() =>
                                                    setListMenuFor((prev) =>
                                                        prev === lineKey(line)
                                                            ? null
                                                            : lineKey(line)
                                                    )
                                                }
                                            >
                                                Save to list
                                            </button>
                                            {listMenuFor === lineKey(line) &&
                                                renderListMenu(lineKey(line))}
                                        </div>
                                        <button
                                            type="button"
                                            className="cart-line-remove"
                                            onClick={() =>
                                                removeFromCart(line.id, line.color)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-footer">
                            <div className="cart-subtotal">
                                <span>Subtotal</span>
                                <span>${subtotal.toLocaleString()}</span>
                            </div>
                            <Link
                                to="/checkout"
                                className="btn-primary-pill cart-checkout"
                                onClick={closeCart}
                            >
                                Checkout
                            </Link>
                            <div className="cart-footer-secondary">
                                <div className="cart-line-list-wrap cart-footer-list-wrap">
                                    <button
                                        type="button"
                                        className="cart-list-btn cart-list-btn-block"
                                        aria-expanded={listMenuFor === "all"}
                                        onClick={() =>
                                            setListMenuFor((prev) =>
                                                prev === "all" ? null : "all"
                                            )
                                        }
                                    >
                                        Save bag to list
                                    </button>
                                    {listMenuFor === "all" && renderListMenu("all")}
                                </div>
                                <button
                                    type="button"
                                    className="cart-clear"
                                    onClick={clearCart}
                                >
                                    Clear bag
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </aside>
        </>
    );
};

export default CartDrawer;
