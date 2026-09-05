// Resolve products by stable id from the shared constants catalog.
// Favourites store product IDs only — UI looks up live product data here.
import {
    airpodsLineup,
    ipadLineup,
    iphoneLineup,
    macLineup,
    storeAccessories,
    visionLineup,
    watchLineup,
} from "../constants";

const ALL_PRODUCTS = [
    ...macLineup,
    ...ipadLineup,
    ...iphoneLineup,
    ...watchLineup,
    ...visionLineup,
    ...airpodsLineup,
    ...storeAccessories,
];

const byId = new Map(ALL_PRODUCTS.map((p) => [p.id, p]));

export const getProductById = (id) => byId.get(id) ?? null;

/** Detail / shop href matching Store + search index conventions. */
export const getProductHref = (product) => {
    if (!product) return "/store";
    if (product.storeScale != null) return `/mac/${product.slug}`;
    if (storeAccessories.some((a) => a.id === product.id)) {
        return `/store/${product.slug}`;
    }
    if (macLineup.some((m) => m.id === product.id && m.storeScale == null)) {
        return `/store/${product.slug}`;
    }
    if (ipadLineup.some((m) => m.id === product.id)) return "/ipad";
    if (iphoneLineup.some((m) => m.id === product.id)) return "/iphone";
    if (watchLineup.some((m) => m.id === product.id)) return "/watch";
    if (visionLineup.some((m) => m.id === product.id)) return "/vision";
    if (airpodsLineup.some((m) => m.id === product.id)) return "/airpods";
    return product.slug ? `/store/${product.slug}` : "/store";
};

export const getProductCategory = (product) => {
    if (!product) return "";
    if (product.category) return product.category;
    if (macLineup.some((m) => m.id === product.id)) return "Mac";
    if (ipadLineup.some((m) => m.id === product.id)) return "iPad";
    if (iphoneLineup.some((m) => m.id === product.id)) return "iPhone";
    if (watchLineup.some((m) => m.id === product.id)) return "Watch";
    if (visionLineup.some((m) => m.id === product.id)) return "Vision";
    if (airpodsLineup.some((m) => m.id === product.id)) return "AirPods";
    return "Accessories";
};

/** Cart line shape used by addToCart / addManyToCart. */
export const toCartLine = (product) => {
    if (!product) return null;
    return {
        id: product.id,
        name: product.name,
        price: product.price,
        color: product.colors?.[0]?.label ?? "Default",
    };
};
