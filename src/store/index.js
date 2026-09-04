import { create } from 'zustand';

// Single flat store — same pattern as the original MacBook viewer state.
// Overlay flags (cart / search / auth) live here so Navbar + App-level
// components share one source of truth. Opening one closes the others.
const useMacbookStore = create((set) => ({
    color: '#2e2c2e',
    setColor: (color) => set({ color }),

    scale: 0.08,
    setScale: (scale) => set({ scale }),

    texture: '/videos/feature-1.mp4',
    setTexture: (texture) => set({ texture }),

    // ── Cart (frontend-only, in-memory — no persistence / no checkout API) ──
    cart: [],
    cartOpen: false,

    openCart: () => set({ cartOpen: true, searchOpen: false, authOpen: false }),
    closeCart: () => set({ cartOpen: false }),
    toggleCart: () => set((state) => ({
        cartOpen: !state.cartOpen,
        searchOpen: state.cartOpen ? state.searchOpen : false,
        authOpen: state.cartOpen ? state.authOpen : false,
    })),

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
                authOpen: false,
            };
        }

        return {
            cart: [...state.cart, { ...item, qty: 1 }],
            cartOpen: true,
            searchOpen: false,
            authOpen: false,
        };
    }),

    removeFromCart: (id, color) => set((state) => ({
        cart: state.cart.filter((line) => !(line.id === id && line.color === color)),
    })),

    updateQty: (id, color, qty) => set((state) => ({
        cart: qty < 1
            ? state.cart.filter((line) => !(line.id === id && line.color === color))
            : state.cart.map((line) =>
                line.id === id && line.color === color ? { ...line, qty } : line
            ),
    })),

    clearCart: () => set({ cart: [] }),

    lastOrder: null,
    setLastOrder: (lastOrder) => set({ lastOrder }),

    // ── Site search overlay ──
    searchOpen: false,
    openSearch: () => set({ searchOpen: true, cartOpen: false, authOpen: false }),
    closeSearch: () => set({ searchOpen: false }),
    toggleSearch: () => set((state) => ({
        searchOpen: !state.searchOpen,
        cartOpen: state.searchOpen ? state.cartOpen : false,
        authOpen: state.searchOpen ? state.authOpen : false,
    })),

    // ── Auth modal (Sign In / Forgot / Create — mock only, no API) ──
    // authView: 'signin' | 'signin-success' | 'forgot' | 'forgot-sent' | 'create' | 'create-success'
    authOpen: false,
    authView: 'signin',
    openAuth: (view = 'signin') => set({
        authOpen: true,
        authView: view,
        cartOpen: false,
        searchOpen: false,
    }),
    closeAuth: () => set({ authOpen: false }),
    setAuthView: (authView) => set({ authView }),

    reset: () => set({ color: '#2e2c2e', scale: 0.08, texture: '/videos/feature-1.mp4' }),
}))

export default useMacbookStore;
