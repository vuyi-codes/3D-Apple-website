// Transient toast for favourites actions (add / move / rename / delete).
import { useEffect } from "react";
import useFavouritesStore from "../store/favourites";

const FavouritesToast = () => {
    const toast = useFavouritesStore((s) => s.toast);
    const clearToast = useFavouritesStore((s) => s.clearToast);

    useEffect(() => {
        if (!toast) return;
        const id = window.setTimeout(() => clearToast(), 2200);
        return () => window.clearTimeout(id);
    }, [toast, clearToast]);

    if (!toast) return null;

    return (
        <div className="fav-toast" role="status" aria-live="polite">
            {toast.message}
        </div>
    );
};

export default FavouritesToast;
