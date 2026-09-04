import { create } from 'zustand';

// Single flat store — same pattern as the original MacBook viewer state.
// Cart fields live here (not a second store) so every page shares one hook.
const useMacbookStore = create((set) => ({
    color: '#2e2c2e',
    setColor: (color) => set({ color }),

    scale: 0.08,
    setScale: (scale) => set({ scale }),

    texture: '/videos/feature-1.mp4',
    setTexture: (texture) => set({ texture }),

    // ── Cart (frontend-only, in-memory — no persistence / no checkout API) ──
    cart: [],          // [{ id, name, price, color, qty }]
    cartOpen: false,   // whether the slide-out drawer is visible

    openCart: () => set({ cartOpen: true, searchOpen: false }),
    closeCart: () => set({ cartOpen: false }),
    toggleCart: () => set((state) => ({
        cartOpen: !state.cartOpen,
        searchOpen: state.cartOpen ? state.searchOpen : false,
    })),

    // Adds a line or increments qty when the same product + color already exists
    addToCart: (item) => set((state) => {
        const existing = state.cart.find(
            (line) => line.id === item.id && line.color === item.color
        );

        if (existing) {
            return {
                cart: state.cart.map((line) =>
                    line.id === item.id && line.color === item.color
                        ? { ...line, qty: line.qty + 1 }
                        : line
                ),
                cartOpen: true,
                searchOpen: false,
            };
        }

        return {
            cart: [...state.cart, { ...item, qty: 1 }],
            cartOpen: true,
            searchOpen: false,
        };
    }),

    removeFromCart: (id, color) => set((state) => ({
        cart: state.cart.filter((line) => !(line.id === id && line.color === color)),
    })),

    // qty of 0 removes the line
    updateQty: (id, color, qty) => set((state) => ({
        cart: qty < 1
            ? state.cart.filter((line) => !(line.id === id && line.color === color))
            : state.cart.map((line) =>
                line.id === id && line.color === color ? { ...line, qty } : line
            ),
    })),

    clearCart: () => set({ cart: [] }),

    // Last mock order after "Place Order" — frontend confirmation only
    lastOrder: null, // { id, items, total, email, placedAt }
    setLastOrder: (lastOrder) => set({ lastOrder }),

    // ── Site search overlay (client-side filter only — no API) ──
    searchOpen: false,
    openSearch: () => set({ searchOpen: true, cartOpen: false }),
    closeSearch: () => set({ searchOpen: false }),
    toggleSearch: () => set((state) => ({
        searchOpen: !state.searchOpen,
        // Opening search closes the bag so both overlays don't fight
        cartOpen: state.searchOpen ? state.cartOpen : false,
    })),

    reset: () => set({ color: '#2e2c2e', scale: 0.08, texture: '/videos/feature-1.mp4' }),
}))

export default useMacbookStore;