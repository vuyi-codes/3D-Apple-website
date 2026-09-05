// FavouriteButton — heart toggle + list picker popover.
// Saves product IDs into persisted lists (see store/favourites.js).
import { useEffect, useId, useRef, useState } from "react";
import useFavouritesStore from "../store/favourites";

const FavouriteButton = ({ productId, className = "", size = "md" }) => {
    const lists = useFavouritesStore((s) => s.lists);
    const isSaved = useFavouritesStore((s) =>
        s.lists.some((l) => l.productIds.includes(productId))
    );
    const toggleProductInList = useFavouritesStore((s) => s.toggleProductInList);
    const createList = useFavouritesStore((s) => s.createList);
    const getDefaultListId = useFavouritesStore((s) => s.getDefaultListId);

    const [open, setOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [newName, setNewName] = useState("");
    const wrapRef = useRef(null);
    const inputRef = useRef(null);
    const panelId = useId();

    useEffect(() => {
        if (!open) return;
        const onPointer = (e) => {
            if (!wrapRef.current?.contains(e.target)) setOpen(false);
        };
        const onKey = (e) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onPointer);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onPointer);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    useEffect(() => {
        if (creating) inputRef.current?.focus();
    }, [creating]);

    const onHeartClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isSaved && lists.length === 1) {
            toggleProductInList(getDefaultListId(), productId);
            setOpen(true);
            return;
        }
        setOpen((v) => !v);
    };

    const onCreate = (e) => {
        e.preventDefault();
        const id = createList(newName);
        if (id) {
            toggleProductInList(id, productId);
            setNewName("");
            setCreating(false);
        }
    };

    return (
        <div
            ref={wrapRef}
            className={`fav-btn-wrap ${className}`}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                type="button"
                className={`fav-heart-btn fav-heart-${size} ${isSaved ? "fav-heart-on" : ""} ${open ? "fav-heart-open" : ""}`}
                aria-label={isSaved ? "Manage saved lists" : "Save to a list"}
                aria-expanded={open}
                aria-controls={open ? panelId : undefined}
                onClick={onHeartClick}
            >
                <img
                    src={isSaved ? "/heart-filled.svg" : "/heart.svg"}
                    alt=""
                    aria-hidden="true"
                />
            </button>

            {open && (
                <div
                    id={panelId}
                    className="fav-picker"
                    role="dialog"
                    aria-label="Save to list"
                >
                    <p className="fav-picker-title">Save to</p>
                    <ul className="fav-picker-lists">
                        {lists.map((list) => {
                            const checked = list.productIds.includes(productId);
                            return (
                                <li key={list.id}>
                                    <label className="fav-picker-row">
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={() =>
                                                toggleProductInList(list.id, productId)
                                            }
                                        />
                                        <span className="fav-picker-name">{list.name}</span>
                                        <span className="fav-picker-count">
                                            {list.productIds.length}
                                        </span>
                                    </label>
                                </li>
                            );
                        })}
                    </ul>

                    {creating ? (
                        <form className="fav-picker-create" onSubmit={onCreate}>
                            <input
                                ref={inputRef}
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="List name"
                                maxLength={40}
                                aria-label="New list name"
                            />
                            <button type="submit" className="btn-primary-pill fav-picker-mini">
                                Add
                            </button>
                            <button
                                type="button"
                                className="fav-picker-cancel"
                                onClick={() => {
                                    setCreating(false);
                                    setNewName("");
                                }}
                            >
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <button
                            type="button"
                            className="fav-picker-new"
                            onClick={() => setCreating(true)}
                        >
                            + New List
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default FavouriteButton;
