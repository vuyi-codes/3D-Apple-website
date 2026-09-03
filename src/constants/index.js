// Each nav item has a label (display text) and a path (React Router route).
// Items without a dedicated page yet use "#" as a placeholder — they'll be
// wired to real routes in later steps.
const navLinks = [
    { label: "Store",   path: "/store" },
    { label: "Mac",     path: "/mac" },
    { label: "iPhone",  path: "#" },
    { label: "Watch",   path: "#" },
    { label: "Vision",  path: "#" },
    { label: "AirPods", path: "#" },
];

const noChangeParts = [
    "Object_84",
    "Object_37",
    "Object_34",
    "Object_12",
    "Object_80",
    "Object_35",
    "Object_36",
    "Object_13",
    "Object_125",
    "Object_76",
    "Object_33",
    "Object_42",
    "Object_58",
    "Object_52",
    "Object_21",
    "Object_10",
];

const performanceImages = [
    { id: "p1", src: "/performance1.png" },
    { id: "p2", src: "/performance2.png" },
    { id: "p3", src: "/performance3.png" },
    { id: "p4", src: "/performance4.png" },
    { id: "p5", src: "/performance5.jpg" },
    { id: "p6", src: "/performance6.png" },
    { id: "p7", src: "/performance7.png" },
];

const performanceImgPositions = [
    {
        id: "p1",
        left: 5,
        bottom: 65,
    },
    {
        id: "p2",
        right: 10,
        bottom: 60,
    },
    {
        id: "p3",
        right: -5,
        bottom: 45,
    },
    {
        id: "p4",
        right: -10,
        bottom: 0,
    },
    {
        id: "p5",
        left: 20,
        bottom: 50,
    },
    {
        id: "p6",
        left: 2,
        bottom: 30,
    },
    {
        id: "p7",
        left: -5,
        bottom: 0,
    },
];

const features = [
    {
        id: 1,
        icon: "/feature-icon1.svg",
        highlight: "Email AI.",
        text: "Summarize and draft replies to emails instantly, so you stay on top of your inbox.",
        styles: "left-5 md:left-20 top-[20%] opacity-0 translate-y-5",
    },
    {
        id: 2,
        icon: "/feature-icon2.svg",
        highlight: "Image AI.",
        text: "Generate or edit images with ease. Just type what you imagine, and let AI bring it to life.",
        styles: "right-5 md:right-20 top-[30%] opacity-0 translate-y-5",
    },
    {
        id: 3,
        icon: "/feature-icon3.svg",
        highlight: "Summarize AI.",
        text: "Turn long articles, reports, or notes into clear, bite-sized summaries in seconds.",
        styles: "left-5 md:left-20 top-[50%] opacity-0 translate-y-5",
    },
    {
        id: 4,
        icon: "/feature-icon4.svg",
        highlight: "AirDrop.",
        text: "Wirelessly share photos, large files, and more between your iPhone, your Mac, & other devices.",
        styles: "right-5 md:right-20 top-[70%] opacity-0 translate-y-5",
    },
    {
        id: 5,
        icon: "/feature-icon5.svg",
        highlight: "Writing Tool.",
        text: "Write smarter and faster, whether it’s blogs, essays, or captions, AI helps polish your words.",
        styles: "left-5 md:left-20 top-[90%] opacity-0 translate-y-5",
    },
];

const featureSequence = [
    { videoPath: "/videos/feature-1.mp4", boxClass: ".box1", delay: 1 },
    { videoPath: "/videos/feature-2.mp4", boxClass: ".box2", delay: 0 },
    { videoPath: "/videos/feature-3.mp4", boxClass: ".box3", delay: 0 },
    { videoPath: "/videos/feature-4.mp4", boxClass: ".box4", delay: 0 },
    { videoPath: "/videos/feature-5.mp4", boxClass: ".box5", delay: 0 },
];

// ─── Mac Landing page data ────────────────────────────────────────────────────

// Three Mac models shown in the lineup grid and Product Detail page.
// `slug`       — matches the :model URL param (/mac/:model)
// `storeScale` — which Zustand scale value selects this model's 3D model
//                (0.06 = 14", 0.08 = 16"; Air uses the 14" model as stand-in)
// `colorMap`   — maps display hex (used by the UI swatch) to the nearest
//                Zustand `color` value accepted by the 3D model material.
//                Only the two existing store colors (#adb5bd, #2e2c2e) are
//                supported by the 3D models today; extra swatches map to the
//                closest match so the 3D model still responds correctly.
const macLineup = [
    {
        id: "macbook-air-13",
        slug: "macbook-air-13",
        name: "MacBook Air 13\"",
        chip: "Apple M3 chip",
        highlight: "Strikingly thin. Incredibly capable.",
        description:
            "With up to 18 hours of battery life and the power of M3, MacBook Air is the world's best consumer laptop.",
        price: 1099,
        monthly: 92,
        badge: null,
        storeScale: 0.06, // renders the 14" model as a stand-in
        // colorMap: { swatchHex: zustandColorValue }
        colorMap: {
            "#f5e6c8": "#adb5bd",
            "#c1b8a5": "#adb5bd",
            "#a8c4b8": "#adb5bd",
            "#6e6e73": "#2e2c2e",
        },
        colors: [
            { hex: "#f5e6c8", label: "Starlight" },
            { hex: "#c1b8a5", label: "Sand" },
            { hex: "#a8c4b8", label: "Sky Blue" },
            { hex: "#6e6e73", label: "Midnight" },
        ],
        specs: [
            { label: "Chip",        value: "Apple M3" },
            { label: "CPU",         value: "8-core CPU" },
            { label: "GPU",         value: "10-core GPU" },
            { label: "Memory",      value: "8 GB unified memory" },
            { label: "Storage",     value: "256 GB SSD" },
            { label: "Display",     value: "13.6\" Liquid Retina, 2560×1664" },
            { label: "Battery",     value: "Up to 18 hours" },
            { label: "Weight",      value: "2.7 lbs (1.24 kg)" },
            { label: "Ports",       value: "2× USB-C / Thunderbolt 3, MagSafe 3, 3.5 mm" },
        ],
    },
    {
        id: "macbook-pro-14",
        slug: "macbook-pro-14",
        name: "MacBook Pro 14\"",
        chip: "Apple M4 Pro chip",
        highlight: "Supercharged for pros.",
        description:
            "The M4 Pro chip, a stunning Liquid Retina XDR display, and up to 24 hours of battery life make this the ultimate pro laptop.",
        price: 1999,
        monthly: 167,
        badge: "Most Popular",
        storeScale: 0.06,
        colorMap: {
            "#2e2c2e": "#2e2c2e",
            "#e3d5c0": "#adb5bd",
        },
        colors: [
            { hex: "#2e2c2e", label: "Space Black" },
            { hex: "#e3d5c0", label: "Silver" },
        ],
        specs: [
            { label: "Chip",        value: "Apple M4 Pro" },
            { label: "CPU",         value: "12-core CPU" },
            { label: "GPU",         value: "20-core GPU" },
            { label: "Memory",      value: "24 GB unified memory" },
            { label: "Storage",     value: "512 GB SSD" },
            { label: "Display",     value: "14.2\" Liquid Retina XDR, 3024×1964" },
            { label: "Battery",     value: "Up to 24 hours" },
            { label: "Weight",      value: "3.5 lbs (1.60 kg)" },
            { label: "Ports",       value: "3× Thunderbolt 5, HDMI, SD card, MagSafe 3" },
        ],
    },
    {
        id: "macbook-pro-16",
        slug: "macbook-pro-16",
        name: "MacBook Pro 16\"",
        chip: "Apple M4 Max chip",
        highlight: "The most powerful Mac laptop ever.",
        description:
            "M4 Max with up to 128 GB of unified memory, a gorgeous 16\" XDR display, and pro connectivity for the most demanding workflows.",
        price: 2499,
        monthly: 208,
        badge: null,
        storeScale: 0.08,
        colorMap: {
            "#2e2c2e": "#2e2c2e",
            "#e3d5c0": "#adb5bd",
        },
        colors: [
            { hex: "#2e2c2e", label: "Space Black" },
            { hex: "#e3d5c0", label: "Silver" },
        ],
        specs: [
            { label: "Chip",        value: "Apple M4 Max" },
            { label: "CPU",         value: "16-core CPU" },
            { label: "GPU",         value: "40-core GPU" },
            { label: "Memory",      value: "48 GB unified memory" },
            { label: "Storage",     value: "1 TB SSD" },
            { label: "Display",     value: "16.2\" Liquid Retina XDR, 3456×2234" },
            { label: "Battery",     value: "Up to 22 hours" },
            { label: "Weight",      value: "4.7 lbs (2.14 kg)" },
            { label: "Ports",       value: "3× Thunderbolt 5, HDMI, SD card, MagSafe 3" },
        ],
    },
];

// "Why Mac" reasons block — rendered in the scroll-reveal section.
const whyMac = [
    {
        id: "wm1",
        icon: "/feature-icon1.svg",
        title: "Apple Intelligence",
        body: "Built-in AI that writes, summarises, and creates — privately and securely on device.",
    },
    {
        id: "wm2",
        icon: "/feature-icon2.svg",
        title: "All-day Battery",
        body: "Up to 22 hours on a single charge. Work a full day and still have power to spare.",
    },
    {
        id: "wm3",
        icon: "/feature-icon3.svg",
        title: "Liquid Retina XDR",
        body: "1,000 nits sustained brightness, 1,600 nits peak. Every pixel precisely calibrated.",
    },
    {
        id: "wm4",
        icon: "/feature-icon4.svg",
        title: "Continuity",
        body: "iPhone, iPad, and Mac work together seamlessly — AirDrop, Handoff, and Universal Clipboard.",
    },
    {
        id: "wm5",
        icon: "/feature-icon5.svg",
        title: "macOS Sequoia",
        body: "The world's most advanced desktop operating system, updated every year — free.",
    },
    {
        id: "wm6",
        icon: "/feature-icon1.svg",
        title: "ProRes & Final Cut",
        body: "Hardware-accelerated ProRes video engine. Edit multiple 4K streams without breaking a sweat.",
    },
];

// ─────────────────────────────────────────────────────────────────────────────

const footerLinks = [
    { label: "Privacy Policy", link: "#" },
    { label: "Terms of Use", link: "#" },
    { label: "Sales Policy", link: "#" },
    { label: "Legal", link: "#" },
    { label: "Site Map", link: "#" },
];

export {
    features,
    featureSequence,
    footerLinks,
    macLineup,
    navLinks,
    noChangeParts,
    performanceImages,
    performanceImgPositions,
    whyMac,
};
