// Favourites — full-page lists manager (/favourites).
// Lists + product memberships persist via useFavouritesStore (localStorage).
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import FavouriteButton from "../components/FavouriteButton";
import useMacbookStore from "../store";
import useFavouritesStore from "../store/favourites";
import {
    getProductById,
    getProductCategory,
    getProductHref,
    toCartLine,
} from "../utils/catalog";

const Favourites = () => {
    const addToCart = useMacbookStore((s) => s.addToCart);
    const addManyToCart = useMacbookStore((s) => s.addManyToCart);
    const lists = useFavouritesStore((s) => s.lists);
    const activeListId = useFavouritesStore((s) => s.activeListId);
    const setActiveListId = useFavouritesStore((s) => s.setActiveListId);
    const createList = useFavouritesStore((s) => s.createList);
    const renameList = useFavouritesStore((s) => s.renameList);
    const deleteList = useFavouritesStore((s) => s.deleteList);
    const reorderLists = useFavouritesStore((s) => s.reorderLists);
    const removeProductFromList = useFavouritesStore((s) => s.removeProductFromList);
    const moveProduct = useFavouritesStore((s) => s.moveProduct);
    const copyProductToList = useFavouritesStore((s) => s.copyProductToList);
    const reorderProductsInList = useFavouritesStore((s) => s.reorderProductsInList);
    const showToast = useFavouritesStore((s) => s.showToast);

    const activeList = lists.find((l) => l.id === activeListId) ?? lists[0];

    const [creating, setCreating] = useState(false);
    const [newListName, setNewListName] = useState("");
    const [renamingId, setRenamingId] = useState(null);
    const [renameValue, setRenameValue] = useState("");
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [moveMenuFor, setMoveMenuFor] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [viewMode, setViewMode] = useState("list"); // "list" | "grid"

    const [dragListIndex, setDragListIndex] = useState(null);
    const [dragProductIndex, setDragProductIndex] = useState(null);

    const products = useMemo(() => {
        if (!activeList) return [];
        return activeList.productIds
            .map((id) => {
                const product = getProductById(id);
                if (!product) return null;
                return {
                    id,
                    product,
                    href: getProductHref(product),
                    category: getProductCategory(product),
                };
            })
            .filter(Boolean);
    }, [activeList]);

    const categories = useMemo(() => {
        const set = new Set(products.map((p) => p.category).filter(Boolean));
        return ["All", ...Array.from(set).sort()];
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (categoryFilter === "All") return products;
        return products.filter((p) => p.category === categoryFilter);
    }, [products, categoryFilter]);

    useEffect(() => {
        if (!activeList && lists[0]) setActiveListId(lists[0].id);
    }, [activeList, lists, setActiveListId]);

    useEffect(() => {
        setCategoryFilter("All");
    }, [activeListId]);

    useEffect(() => {
        if (categoryFilter !== "All" && !categories.includes(categoryFilter)) {
            setCategoryFilter("All");
        }
    }, [categories, categoryFilter]);

    useEffect(() => {
        if (!moveMenuFor) return;
        const close = (e) => {
            if (!e.target.closest?.(".fav-move-menu") && !e.target.closest?.(".fav-item-move")) {
                setMoveMenuFor(null);
            }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, [moveMenuFor]);

    const onCreateList = (e) => {
        e.preventDefault();
        const id = createList(newListName);
        if (id) {
            setNewListName("");
            setCreating(false);
            setActiveListId(id);
        }
    };

    const startRename = (list) => {
        setRenamingId(list.id);
        setRenameValue(list.name);
    };

    const commitRename = (e) => {
        e?.preventDefault();
        if (renamingId) {
            renameList(renamingId, renameValue);
            setRenamingId(null);
        }
    };

    const confirmDelete = () => {
        if (deleteTarget) {
            deleteList(deleteTarget.id);
            setDeleteTarget(null);
        }
    };

    const addProductToBag = (product) => {
        const line = toCartLine(product);
        if (!line) return;
        addToCart(line);
        showToast(`Added ${product.name} to bag`);
    };

    const addListToBag = () => {
        const source =
            categoryFilter === "All" ? products : filteredProducts;
        const lines = source.map((p) => toCartLine(p.product)).filter(Boolean);
        if (!lines.length) return;
        addManyToCart(lines);
        showToast(
            categoryFilter === "All"
                ? `Added ${lines.length} items to bag`
                : `Added ${lines.length} ${categoryFilter} items to bag`
        );
    };

    const renderMoveMenu = (id) =>
        moveMenuFor === id && (
            <div className="fav-move-menu" role="menu">
                <p className="fav-move-label">Move to</p>
                {lists
                    .filter((l) => l.id !== activeList?.id)
                    .map((l) => (
                        <button
                            key={l.id}
                            type="button"
                            role="menuitem"
                            onClick={() => {
                                moveProduct(id, activeList.id, l.id);
                                setMoveMenuFor(null);
                            }}
                        >
                            {l.name}
                        </button>
                    ))}
                {lists.filter((l) => l.id !== activeList?.id).length === 0 && (
                    <p className="fav-move-empty">Create another list to move items.</p>
                )}
                <p className="fav-move-label">Also add to</p>
                {lists
                    .filter(
                        (l) => l.id !== activeList?.id && !l.productIds.includes(id)
                    )
                    .map((l) => (
                        <button
                            key={`copy-${l.id}`}
                            type="button"
                            role="menuitem"
                            onClick={() => {
                                copyProductToList(id, l.id);
                                setMoveMenuFor(null);
                            }}
                        >
                            {l.name}
                        </button>
                    ))}
            </div>
        );

    return (
        <>
            <main id="fav-page">
                <div className="fav-layout">
                    {/* ── Lists sidebar ── */}
                    <aside className="fav-sidebar" aria-label="Your lists">
                        <div className="fav-sidebar-head">
                            <h2>Lists</h2>
                            <button
                                type="button"
                                className="fav-sidebar-add"
                                onClick={() => setCreating(true)}
                                aria-label="Create a new list"
                            >
                                +
                            </button>
                        </div>

                        {creating && (
                            <form className="fav-create-form" onSubmit={onCreateList}>
                                <input
                                    type="text"
                                    value={newListName}
                                    onChange={(e) => setNewListName(e.target.value)}
                                    placeholder="List name"
                                    maxLength={40}
                                    autoFocus
                                    aria-label="New list name"
                                />
                                <div className="fav-create-actions">
                                    <button type="submit" className="btn-primary-pill">
                                        Create
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-ghost-pill"
                                        onClick={() => {
                                            setCreating(false);
                                            setNewListName("");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}

                        <ul className="fav-list-nav">
                            {lists.map((list, index) => (
                                <li
                                    key={list.id}
                                    className={`fav-list-nav-item ${
                                        list.id === activeList?.id ? "fav-list-nav-on" : ""
                                    }`}
                                    draggable
                                    onDragStart={() => setDragListIndex(index)}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => {
                                        if (dragListIndex != null) {
                                            reorderLists(dragListIndex, index);
                                            setDragListIndex(null);
                                        }
                                    }}
                                    onDragEnd={() => setDragListIndex(null)}
                                >
                                    {renamingId === list.id ? (
                                        <form
                                            className="fav-rename-form"
                                            onSubmit={commitRename}
                                        >
                                            <input
                                                value={renameValue}
                                                onChange={(e) => setRenameValue(e.target.value)}
                                                maxLength={40}
                                                autoFocus
                                                aria-label="Rename list"
                                                onBlur={commitRename}
                                            />
                                        </form>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                className="fav-list-nav-btn"
                                                onClick={() => setActiveListId(list.id)}
                                            >
                                                <span className="fav-list-nav-name">
                                                    {list.name}
                                                </span>
                                                <span className="fav-list-nav-count">
                                                    {list.productIds.length}
                                                </span>
                                            </button>
                                            <div className="fav-list-nav-tools">
                                                <button
                                                    type="button"
                                                    className="fav-tool"
                                                    onClick={() => startRename(list)}
                                                    aria-label={`Rename ${list.name}`}
                                                >
                                                    Rename
                                                </button>
                                                {!list.isDefault && (
                                                    <button
                                                        type="button"
                                                        className="fav-tool fav-tool-danger"
                                                        onClick={() => setDeleteTarget(list)}
                                                        aria-label={`Delete ${list.name}`}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                            <span
                                                className="fav-drag-hint"
                                                aria-hidden="true"
                                                title="Drag to reorder"
                                            >
                                                ⋮⋮
                                            </span>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* ── Active list products ── */}
                    <section className="fav-main" aria-label={activeList?.name ?? "List"}>
                        <div className="fav-main-head">
                            <div>
                                <h1 className="fav-page-title">
                                    {activeList?.name ?? "Favourites"}
                                </h1>
                                <p className="fav-main-meta">
                                    {filteredProducts.length}
                                    {categoryFilter !== "All" ? ` of ${products.length}` : ""}{" "}
                                    {filteredProducts.length === 1 ? "item" : "items"}
                                </p>
                            </div>
                            <div className="fav-main-head-actions">
                                {products.length > 0 && (
                                    <button
                                        type="button"
                                        className="btn-primary-pill"
                                        onClick={addListToBag}
                                    >
                                        {categoryFilter === "All"
                                            ? "Add list to Bag"
                                            : `Add ${categoryFilter} to Bag`}
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="btn-ghost-pill lg:hidden"
                                    onClick={() => setCreating(true)}
                                >
                                    New List
                                </button>
                                <Link to="/store" className="btn-ghost-pill">
                                    Continue shopping
                                </Link>
                            </div>
                        </div>

                        {creating && (
                            <form
                                className="fav-create-form lg:hidden mb-6"
                                onSubmit={onCreateList}
                            >
                                <input
                                    type="text"
                                    value={newListName}
                                    onChange={(e) => setNewListName(e.target.value)}
                                    placeholder="List name"
                                    maxLength={40}
                                    autoFocus
                                    aria-label="New list name"
                                />
                                <div className="fav-create-actions">
                                    <button type="submit" className="btn-primary-pill">
                                        Create
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-ghost-pill"
                                        onClick={() => {
                                            setCreating(false);
                                            setNewListName("");
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}

                        <label className="fav-mobile-select">
                            <span className="sr-only">Choose a list</span>
                            <select
                                value={activeList?.id ?? ""}
                                onChange={(e) => setActiveListId(e.target.value)}
                            >
                                {lists.map((l) => (
                                    <option key={l.id} value={l.id}>
                                        {l.name} ({l.productIds.length})
                                    </option>
                                ))}
                            </select>
                        </label>

                        {activeList && (
                            <div className="fav-mobile-tools lg:hidden">
                                {renamingId === activeList.id ? (
                                    <form
                                        className="fav-rename-form"
                                        onSubmit={commitRename}
                                    >
                                        <input
                                            value={renameValue}
                                            onChange={(e) => setRenameValue(e.target.value)}
                                            maxLength={40}
                                            autoFocus
                                            aria-label="Rename list"
                                            onBlur={commitRename}
                                        />
                                    </form>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            className="fav-tool"
                                            onClick={() => startRename(activeList)}
                                        >
                                            Rename
                                        </button>
                                        {!activeList.isDefault && (
                                            <button
                                                type="button"
                                                className="fav-tool fav-tool-danger"
                                                onClick={() => setDeleteTarget(activeList)}
                                            >
                                                Delete list
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        {products.length > 0 && (
                            <div className="fav-toolbar">
                                <div
                                    className="fav-filters"
                                    role="group"
                                    aria-label="Filter by category"
                                >
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            className={`fav-filter-btn ${
                                                categoryFilter === cat ? "fav-filter-on" : ""
                                            }`}
                                            onClick={() => setCategoryFilter(cat)}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                <div
                                    className="fav-view-toggle"
                                    role="group"
                                    aria-label="Layout"
                                >
                                    <button
                                        type="button"
                                        className={`fav-view-btn ${
                                            viewMode === "list" ? "fav-view-on" : ""
                                        }`}
                                        aria-pressed={viewMode === "list"}
                                        aria-label="List view"
                                        onClick={() => setViewMode("list")}
                                    >
                                        <span className="fav-view-icon fav-view-list" aria-hidden="true">
                                            <span />
                                            <span />
                                            <span />
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className={`fav-view-btn ${
                                            viewMode === "grid" ? "fav-view-on" : ""
                                        }`}
                                        aria-pressed={viewMode === "grid"}
                                        aria-label="Grid view"
                                        onClick={() => setViewMode("grid")}
                                    >
                                        <span className="fav-view-icon fav-view-grid" aria-hidden="true">
                                            <span />
                                            <span />
                                            <span />
                                            <span />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {products.length === 0 ? (
                            <div className="fav-empty">
                                <img src="/heart.svg" alt="" aria-hidden="true" />
                                <h3>No items yet</h3>
                                <p>
                                    Tap the heart on any product to save it to{" "}
                                    {activeList?.name ?? "this list"}.
                                </p>
                                <Link to="/store" className="btn-primary-pill">
                                    Browse Store
                                </Link>
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="fav-empty fav-empty-filter">
                                <h3>No matches</h3>
                                <p>Nothing in this list matches “{categoryFilter}”.</p>
                                <button
                                    type="button"
                                    className="btn-primary-pill"
                                    onClick={() => setCategoryFilter("All")}
                                >
                                    Show all
                                </button>
                            </div>
                        ) : (
                            <ul
                                className={
                                    viewMode === "grid" ? "fav-items fav-items-grid" : "fav-items"
                                }
                            >
                                {filteredProducts.map(({ id, product, href, category }) => {
                                    const listIndex = activeList.productIds.indexOf(id);
                                    return (
                                        <li
                                            key={id}
                                            className={`fav-item ${
                                                viewMode === "grid" ? "fav-item-grid" : ""
                                            }`}
                                            draggable={
                                                viewMode === "list" && categoryFilter === "All"
                                            }
                                            onDragStart={() => setDragProductIndex(listIndex)}
                                            onDragOver={(e) => {
                                                if (viewMode === "list" && categoryFilter === "All") {
                                                    e.preventDefault();
                                                }
                                            }}
                                            onDrop={() => {
                                                if (
                                                    viewMode === "list" &&
                                                    categoryFilter === "All" &&
                                                    dragProductIndex != null &&
                                                    activeList
                                                ) {
                                                    reorderProductsInList(
                                                        activeList.id,
                                                        dragProductIndex,
                                                        listIndex
                                                    );
                                                    setDragProductIndex(null);
                                                }
                                            }}
                                            onDragEnd={() => setDragProductIndex(null)}
                                        >
                                            {viewMode === "list" && categoryFilter === "All" && (
                                                <span
                                                    className="fav-item-handle"
                                                    aria-hidden="true"
                                                >
                                                    ⋮⋮
                                                </span>
                                            )}

                                            <Link to={href} className="fav-item-media">
                                                {product.image ? (
                                                    <img src={product.image} alt="" />
                                                ) : (
                                                    <div className="fav-item-placeholder" />
                                                )}
                                            </Link>

                                            <div className="fav-item-body">
                                                <p className="fav-item-cat">{category}</p>
                                                <Link to={href} className="fav-item-name">
                                                    {product.name}
                                                </Link>
                                                <p className="fav-item-price">
                                                    From ${product.price.toLocaleString()}
                                                </p>
                                                <div className="fav-item-actions">
                                                    <button
                                                        type="button"
                                                        className="btn-primary-pill"
                                                        onClick={() =>
                                                            addProductToBag(product)
                                                        }
                                                    >
                                                        Add to Bag
                                                    </button>
                                                    <Link
                                                        to={href}
                                                        className="btn-ghost-pill"
                                                    >
                                                        View
                                                    </Link>
                                                    <div className="fav-item-move-wrap">
                                                        <button
                                                            type="button"
                                                            className="btn-ghost-pill fav-item-move"
                                                            onClick={() =>
                                                                setMoveMenuFor(
                                                                    moveMenuFor === id
                                                                        ? null
                                                                        : id
                                                                )
                                                            }
                                                            aria-expanded={moveMenuFor === id}
                                                        >
                                                            Move
                                                        </button>
                                                        {renderMoveMenu(id)}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="fav-item-remove"
                                                        onClick={() => {
                                                            removeProductFromList(
                                                                activeList.id,
                                                                id
                                                            );
                                                            showToast(
                                                                `Removed from “${activeList.name}”`
                                                            );
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>

                                            <FavouriteButton
                                                productId={id}
                                                className="fav-item-heart"
                                                size="sm"
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </section>
                </div>
            </main>

            {deleteTarget && (
                <div className="fav-confirm-layer" role="presentation">
                    <div
                        className="fav-confirm-backdrop"
                        onClick={() => setDeleteTarget(null)}
                        aria-hidden="true"
                    />
                    <div
                        className="fav-confirm"
                        role="alertdialog"
                        aria-labelledby="fav-confirm-title"
                        aria-describedby="fav-confirm-desc"
                    >
                        <h3 id="fav-confirm-title">Delete “{deleteTarget.name}”?</h3>
                        <p id="fav-confirm-desc">
                            This removes the list. Products stay in any other lists they belong
                            to.
                        </p>
                        <div className="fav-confirm-actions">
                            <button
                                type="button"
                                className="btn-primary-pill"
                                onClick={confirmDelete}
                            >
                                Delete list
                            </button>
                            <button
                                type="button"
                                className="btn-ghost-pill"
                                onClick={() => setDeleteTarget(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default Favourites;
