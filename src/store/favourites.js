// Favourites / Lists — persisted separately from the main MacBook store
// so cart/auth remain in-memory while lists survive refresh.
// Data shape is ID-only for a future backend swap without UI rewrites.
import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_LIST_ID = "favourites";

const makeDefaultList = () => ({
    id: DEFAULT_LIST_ID,
    name: "Favourites",
    isDefault: true,
    productIds: [],
});

const newListId = () =>
    typeof crypto !== "undefined" && crypto.randomUUID
        ? `list-${crypto.randomUUID()}`
        : `list-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const ensureDefault = (lists) => {
    if (!Array.isArray(lists) || lists.length === 0) return [makeDefaultList()];
    if (!lists.some((l) => l.isDefault)) {
        return [{ ...makeDefaultList(), productIds: [] }, ...lists];
    }
    return lists.map((l) => ({
        ...l,
        productIds: Array.isArray(l.productIds) ? l.productIds : [],
    }));
};

const moveItem = (arr, from, to) => {
    if (from === to || from < 0 || to < 0 || from >= arr.length || to >= arr.length) {
        return arr;
    }
    const next = [...arr];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    return next;
};

const useFavouritesStore = create(
    persist(
        (set, get) => ({
            lists: [makeDefaultList()],
            activeListId: DEFAULT_LIST_ID,
            toast: null,

            setActiveListId: (activeListId) => set({ activeListId }),

            showToast: (message) => {
                set({ toast: { id: Date.now(), message } });
            },
            clearToast: () => set({ toast: null }),

            getDefaultListId: () =>
                get().lists.find((l) => l.isDefault)?.id ?? DEFAULT_LIST_ID,

            isProductSaved: (productId) =>
                get().lists.some((l) => l.productIds.includes(productId)),

            getListsContaining: (productId) =>
                get().lists.filter((l) => l.productIds.includes(productId)),

            totalSavedCount: () => {
                const ids = new Set();
                get().lists.forEach((l) => l.productIds.forEach((id) => ids.add(id)));
                return ids.size;
            },

            createList: (name) => {
                const trimmed = name.trim();
                if (!trimmed) return null;
                const list = {
                    id: newListId(),
                    name: trimmed,
                    isDefault: false,
                    productIds: [],
                };
                set((state) => ({ lists: [...state.lists, list] }));
                get().showToast(`Created “${trimmed}”`);
                return list.id;
            },

            renameList: (listId, name) => {
                const trimmed = name.trim();
                if (!trimmed) return;
                set((state) => ({
                    lists: state.lists.map((l) =>
                        l.id === listId ? { ...l, name: trimmed } : l
                    ),
                }));
                get().showToast("List renamed");
            },

            deleteList: (listId) => {
                const list = get().lists.find((l) => l.id === listId);
                if (!list || list.isDefault) return;
                set((state) => {
                    const lists = state.lists.filter((l) => l.id !== listId);
                    const activeListId =
                        state.activeListId === listId
                            ? lists.find((l) => l.isDefault)?.id ?? lists[0]?.id
                            : state.activeListId;
                    return { lists, activeListId };
                });
                get().showToast(`Deleted “${list.name}”`);
            },

            reorderLists: (fromIndex, toIndex) => {
                set((state) => ({
                    lists: moveItem(state.lists, fromIndex, toIndex),
                }));
            },

            addProductToList: (listId, productId) => {
                set((state) => ({
                    lists: state.lists.map((l) => {
                        if (l.id !== listId || l.productIds.includes(productId)) return l;
                        return { ...l, productIds: [...l.productIds, productId] };
                    }),
                }));
            },

            removeProductFromList: (listId, productId) => {
                set((state) => ({
                    lists: state.lists.map((l) =>
                        l.id === listId
                            ? {
                                  ...l,
                                  productIds: l.productIds.filter((id) => id !== productId),
                              }
                            : l
                    ),
                }));
            },

            removeProductFromAll: (productId) => {
                set((state) => ({
                    lists: state.lists.map((l) => ({
                        ...l,
                        productIds: l.productIds.filter((id) => id !== productId),
                    })),
                }));
                get().showToast("Removed from Favourites");
            },

            toggleProductInList: (listId, productId) => {
                const list = get().lists.find((l) => l.id === listId);
                if (!list) return;
                if (list.productIds.includes(productId)) {
                    get().removeProductFromList(listId, productId);
                    get().showToast(`Removed from “${list.name}”`);
                } else {
                    get().addProductToList(listId, productId);
                    get().showToast(`Saved to “${list.name}”`);
                }
            },

            moveProduct: (productId, fromListId, toListId) => {
                if (fromListId === toListId) return;
                set((state) => ({
                    lists: state.lists.map((l) => {
                        if (l.id === fromListId) {
                            return {
                                ...l,
                                productIds: l.productIds.filter((id) => id !== productId),
                            };
                        }
                        if (l.id === toListId && !l.productIds.includes(productId)) {
                            return { ...l, productIds: [...l.productIds, productId] };
                        }
                        return l;
                    }),
                }));
                const toName = get().lists.find((l) => l.id === toListId)?.name;
                get().showToast(toName ? `Moved to “${toName}”` : "Moved");
            },

            copyProductToList: (productId, toListId) => {
                get().addProductToList(toListId, productId);
                const toName = get().lists.find((l) => l.id === toListId)?.name;
                get().showToast(toName ? `Added to “${toName}”` : "Added to list");
            },

            reorderProductsInList: (listId, fromIndex, toIndex) => {
                set((state) => ({
                    lists: state.lists.map((l) => {
                        if (l.id !== listId) return l;
                        return {
                            ...l,
                            productIds: moveItem(l.productIds, fromIndex, toIndex),
                        };
                    }),
                }));
            },
        }),
        {
            name: "apple-favourites-v1",
            partialize: (state) => ({
                lists: state.lists,
                activeListId: state.activeListId,
            }),
            onRehydrateStorage: () => (state) => {
                if (!state) return;
                state.lists = ensureDefault(state.lists);
                if (!state.lists.some((l) => l.id === state.activeListId)) {
                    state.activeListId =
                        state.lists.find((l) => l.isDefault)?.id ?? state.lists[0].id;
                }
            },
        }
    )
);

export default useFavouritesStore;
export { DEFAULT_LIST_ID };
