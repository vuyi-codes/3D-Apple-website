// Each nav item has a label (display text) and a path (React Router route).
// All product-line landings are live; About lives in the footer.
const navLinks = [
    { label: "Store",   path: "/store" },
    { label: "Mac",     path: "/mac" },
    { label: "iPad",    path: "/ipad" },
    { label: "iPhone",  path: "/iphone" },
    { label: "Watch",   path: "/watch" },
    { label: "Vision",  path: "/vision" },
    { label: "AirPods", path: "/airpods" },
    { label: "Support", path: "/support" },
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
        image: "/laptops/macbook-air.png",
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
        image: "/laptops/macbook-pro-14.png",
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
        image: "/laptops/macbook-pro-16.png",
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
    {
        id: "mac-mini",
        slug: "mac-mini",
        name: "Mac mini",
        chip: "Apple M4 chip",
        highlight: "More muscle. Same mini.",
        description:
            "Desktop power in a tiny footprint — M4 performance for everyday work, creative apps, and more.",
        price: 599,
        monthly: 50,
        badge: null,
        image: "/laptops/mac-mini.png",
        // No 3D viewer — Learn more goes to Store
        colors: [
            { hex: "#e3d5c0", label: "Silver" },
        ],
        specs: [
            { label: "Chip", value: "Apple M4" },
            { label: "Memory", value: "16 GB unified memory" },
            { label: "Storage", value: "256 GB SSD" },
            { label: "Ports", value: "Thunderbolt 4, HDMI, USB-A, Ethernet" },
        ],
    },
    {
        id: "imac",
        slug: "imac",
        name: "iMac",
        chip: "Apple M4 chip",
        highlight: "Packed with more juice.",
        description:
            "All-in-one desktop with a vivid 24\" display, M4 performance, and colours that light up any desk.",
        price: 1299,
        monthly: 108,
        badge: null,
        image: "/laptops/desktop-mac.png",
        colors: [
            { hex: "#7d9bb8", label: "Blue" },
            { hex: "#e8a0b0", label: "Pink" },
            { hex: "#f5e6c8", label: "Yellow" },
            { hex: "#6e6e73", label: "Silver" },
        ],
        specs: [
            { label: "Chip", value: "Apple M4" },
            { label: "Display", value: "24\" 4.5K Retina" },
            { label: "Memory", value: "16 GB unified memory" },
            { label: "Storage", value: "256 GB SSD" },
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

// ─── iPhone Landing page data (no 3D — mock cards only) ─────────────────────
const iphoneLineup = [
    {
        id: "iphone-17-pro",
        slug: "iphone-17-pro",
        name: "iPhone 17 Pro",
        chip: "A19 Pro chip",
        highlight: "Pro beyond pro.",
        description:
            "The most advanced iPhone camera system yet, with Apple Intelligence and a design built for lasting power.",
        price: 1099,
        monthly: 45,
        badge: "New",
        image: "/laptops/iphone-17pro.png",
        colors: [
            { hex: "#c2bcb2", label: "Natural Titanium" },
            { hex: "#3c3c3d", label: "Black Titanium" },
            { hex: "#5e6670", label: "White Titanium" },
        ],
    },
    {
        id: "iphone-16-pro",
        slug: "iphone-16-pro",
        name: "iPhone 16 Pro",
        chip: "A18 Pro chip",
        highlight: "Titanium. So strong. So light. So Pro.",
        description:
            "A18 Pro, Camera Control, and a pro camera system for the next level of photography and film.",
        price: 999,
        monthly: 41,
        badge: "Most Popular",
        image: "/laptops/apple-iphone-16-pro.png",
        colors: [
            { hex: "#c2bcb2", label: "Natural Titanium" },
            { hex: "#3c3c3d", label: "Black Titanium" },
            { hex: "#f2e8da", label: "Desert Titanium" },
            { hex: "#5e6670", label: "White Titanium" },
        ],
    },
    {
        id: "iphone-16",
        slug: "iphone-16",
        name: "iPhone 16",
        chip: "A18 chip",
        highlight: "Hello, Apple Intelligence.",
        description:
            "A18 chip, a customisable Action button, and a 48MP Fusion camera — built for everyday brilliance.",
        price: 799,
        monthly: 33,
        badge: null,
        image: "/laptops/apple-iphone-16.png",
        colors: [
            { hex: "#a8b5c4", label: "Ultramarine" },
            { hex: "#e3c4c9", label: "Pink" },
            { hex: "#d4e0c8", label: "Teal" },
            { hex: "#f5f5f0", label: "White" },
            { hex: "#1c1c1e", label: "Black" },
        ],
    },
    {
        id: "iphone-16e",
        slug: "iphone-16e",
        name: "iPhone 16e",
        chip: "A18 chip",
        highlight: "Latest iPhone. Greatest price.",
        description:
            "A18 chip, Centre Stage front camera, and all-day battery in a design that keeps things simple.",
        price: 599,
        monthly: 24,
        badge: null,
        image: "/laptops/apple-iphone-16e.png",
        colors: [
            { hex: "#f5f5f0", label: "White" },
            { hex: "#1c1c1e", label: "Black" },
        ],
    },
];

const whyIphone = [
    {
        id: "wi1",
        icon: "/feature-icon1.svg",
        title: "Apple Intelligence",
        body: "Writing tools, Image Playground, and private on-device smarts — built into iOS.",
    },
    {
        id: "wi2",
        icon: "/feature-icon2.svg",
        title: "Camera Control",
        body: "A new way to capture photos and video with a light press, click, or swipe.",
    },
    {
        id: "wi3",
        icon: "/feature-icon3.svg",
        title: "All-day battery",
        body: "Power through the day and into the night — then charge with MagSafe or USB-C.",
    },
    {
        id: "wi4",
        icon: "/feature-icon4.svg",
        title: "Crash Detection",
        body: "If a severe car crash is detected, iPhone can call emergency services for you.",
    },
    {
        id: "wi5",
        icon: "/feature-icon5.svg",
        title: "Privacy",
        body: "Face ID, Lock Screen, and on-device processing keep what matters yours.",
    },
    {
        id: "wi6",
        icon: "/feature-icon1.svg",
        title: "iOS",
        body: "The world's most personal mobile OS — familiar, powerful, and free to update.",
    },
];

// ─── Watch / Vision / AirPods landings (mock cards, no 3D) ───────────────────
const watchLineup = [
    {
        id: "watch-ultra-2",
        slug: "watch-ultra-2",
        name: "Apple Watch Ultra 2",
        chip: "S9 SiP",
        highlight: "Next-level adventure.",
        description: "49mm titanium case, precision dual-frequency GPS, and the brightest Apple Watch display.",
        price: 799,
        monthly: 33,
        badge: null,
        image: "/laptops/apple-watch-ultra2.png",
        colors: [{ hex: "#c2bcb2", label: "Natural" }, { hex: "#1c1c1e", label: "Black" }],
    },
    {
        id: "watch-series-10",
        slug: "watch-series-10",
        name: "Apple Watch Series 10",
        chip: "S10 SiP",
        highlight: "Thinnest. Biggest display. Advanced health.",
        description: "Sleep apnea notifications, faster charging, and a wider angle OLED display.",
        price: 399,
        monthly: 16,
        badge: "Most Popular",
        image: "/laptops/apple-watch-series10.png",
        colors: [
            { hex: "#d4a574", label: "Rose Gold" },
            { hex: "#c0c0c0", label: "Silver" },
            { hex: "#4a4a4a", label: "Jet Black" },
        ],
    },
    {
        id: "watch-se",
        slug: "watch-se",
        name: "Apple Watch SE",
        chip: "S8 SiP",
        highlight: "A great deal. To have on hand.",
        description: "Crash Detection, heart rate notifications, and watchOS essentials — at a friendly price.",
        price: 249,
        monthly: 10,
        badge: null,
        image: "/laptops/apple-watch-SE.png",
        colors: [
            { hex: "#c0c0c0", label: "Silver" },
            { hex: "#2e2c2e", label: "Midnight" },
            { hex: "#e8d4c4", label: "Starlight" },
        ],
    },
];

const whyWatch = [
    { id: "ww1", icon: "/feature-icon1.svg", title: "Health", body: "Heart rate, ECG, Blood Oxygen, and sleep insights on your wrist." },
    { id: "ww2", icon: "/feature-icon2.svg", title: "Fitness", body: "Workout metrics for running, cycling, swimming, and more." },
    { id: "ww3", icon: "/feature-icon3.svg", title: "Safety", body: "Fall Detection, Crash Detection, and Emergency SOS." },
    { id: "ww4", icon: "/feature-icon4.svg", title: "Connectivity", body: "Calls, texts, and apps — with or without your iPhone nearby." },
    { id: "ww5", icon: "/feature-icon5.svg", title: "Carbon neutral", body: "Pairs with certain bands to achieve a carbon neutral Apple Watch." },
    { id: "ww6", icon: "/feature-icon1.svg", title: "watchOS", body: "Widgets, Smart Stack, and apps designed for a glance." },
];

const visionLineup = [
    {
        id: "vision-pro",
        slug: "vision-pro",
        name: "Apple Vision Pro",
        chip: "M2 + R1",
        highlight: "Welcome to spatial computing.",
        description: "Infinite canvas for apps, cinema-quality entertainment, and FaceTime that feels present.",
        price: 3499,
        monthly: 291,
        badge: null,
        image: "/laptops/apple-vision.png",
        colors: [{ hex: "#e8e8e8", label: "Silver" }],
    },
];

const whyVision = [
    { id: "wv1", icon: "/feature-icon1.svg", title: "Spatial apps", body: "Scale windows, place them anywhere, and work across multiple apps at once." },
    { id: "wv2", icon: "/feature-icon2.svg", title: "Immersive video", body: "3D movies and Environments that transform any room." },
    { id: "wv3", icon: "/feature-icon3.svg", title: "EyeSight", body: "Others can see your eyes — so you're never cut off from the people around you." },
    { id: "wv4", icon: "/feature-icon4.svg", title: "Input", body: "Eyes, hands, and voice — no controllers required." },
    { id: "wv5", icon: "/feature-icon5.svg", title: "Privacy", body: "Optic ID unlocks the device. Eye tracking data stays protected." },
    { id: "wv6", icon: "/feature-icon1.svg", title: "visionOS", body: "Familiar apps from iPhone and iPad, redesigned for space." },
];

const airpodsLineup = [
    {
        id: "airpods-pro-2",
        slug: "airpods-pro-2",
        name: "AirPods Pro 2",
        chip: "H2 chip",
        highlight: "Adaptive Audio. Now playing.",
        description: "Active Noise Cancellation, Transparency, and Personalized Spatial Audio with USB-C case.",
        price: 249,
        monthly: 10,
        badge: "Most Popular",
        image: "/laptops/airpods2.png",
        colors: [{ hex: "#f5f5f0", label: "White" }],
    },
    {
        id: "airpods-4",
        slug: "airpods-4",
        name: "AirPods 4",
        chip: "H2 chip",
        highlight: "Iconic. Now supersonic.",
        description: "Open-ear design with optional Active Noise Cancellation and improved fit.",
        price: 129,
        monthly: 5,
        badge: null,
        image: "/laptops/airpods4.png",
        colors: [{ hex: "#f5f5f0", label: "White" }],
    },
    {
        id: "airpods-max",
        slug: "airpods-max",
        name: "AirPods Max",
        chip: "H1 chip",
        highlight: "Sound. Beyond.",
        description: "Computational audio, Adaptive EQ, and a breathable knit mesh canopy.",
        price: 549,
        monthly: 22,
        badge: null,
        image: "/laptops/airpods-max.png",
        colors: [
            { hex: "#c4a882", label: "Orange" },
            { hex: "#5b7c8a", label: "Blue" },
            { hex: "#f5f5f0", label: "Silver" },
            { hex: "#2e2c2e", label: "Midnight" },
        ],
    },
];

const whyAirpods = [
    { id: "wa1", icon: "/feature-icon1.svg", title: "H2 chip", body: "Smarter noise control, richer audio, and seamless device switching." },
    { id: "wa2", icon: "/feature-icon2.svg", title: "Spatial Audio", body: "Theatre-like sound that tracks your head movement." },
    { id: "wa3", icon: "/feature-icon3.svg", title: "Hearing features", body: "Hearing Test and Hearing Aid features on supported AirPods Pro 2." },
    { id: "wa4", icon: "/feature-icon4.svg", title: "Magical pairing", body: "One tap setup with every Apple device signed into your Apple ID." },
    { id: "wa5", icon: "/feature-icon5.svg", title: "Battery", body: "Hours of listening with a case that tops you up on the go." },
    { id: "wa6", icon: "/feature-icon1.svg", title: "Find My", body: "Locate misplaced buds with Precision Finding on supported models." },
];

// ─── iPad Landing page data ─────────────────────────────────────────────────
const ipadLineup = [
    {
        id: "ipad-pro",
        slug: "ipad-pro",
        name: "iPad Pro",
        chip: "M4 chip",
        highlight: "Thinspired.",
        description: "Ultra-thin design, stunning Ultra Retina XDR, and M4 performance for pro creative work.",
        price: 999,
        monthly: 83,
        badge: "Most Popular",
        image: "/laptops/ipad-pro.png",
        colors: [
            { hex: "#2e2c2e", label: "Space Black" },
            { hex: "#e3d5c0", label: "Silver" },
        ],
    },
    {
        id: "ipad-air",
        slug: "ipad-air",
        name: "iPad Air",
        chip: "M2 chip",
        highlight: "Fresh air.",
        description: "Serious performance in a thin, light design — perfect for everyday and creative projects.",
        price: 599,
        monthly: 50,
        badge: null,
        image: "/laptops/ipad-air.png",
        colors: [
            { hex: "#7d9bb8", label: "Blue" },
            { hex: "#c4a882", label: "Starlight" },
            { hex: "#e8a0b0", label: "Purple" },
            { hex: "#2e2c2e", label: "Space Gray" },
        ],
    },
    {
        id: "ipad-a16",
        slug: "ipad-a16",
        name: "iPad",
        chip: "A16 chip",
        highlight: "Colourfully capable.",
        description: "The all-screen design, A16 power, and all-day battery — iPad essentials at a great price.",
        price: 349,
        monthly: 29,
        badge: null,
        image: "/laptops/ipad-a16.png",
        colors: [
            { hex: "#7d9bb8", label: "Blue" },
            { hex: "#e8a0b0", label: "Pink" },
            { hex: "#f5e6c8", label: "Yellow" },
            { hex: "#e3d5c0", label: "Silver" },
        ],
    },
];

const whyIpad = [
    { id: "wp1", icon: "/feature-icon1.svg", title: "Apple Intelligence", body: "Writing tools and Image Playground — privately on device." },
    { id: "wp2", icon: "/feature-icon2.svg", title: "Apple Pencil", body: "Pixel-perfect drawing, note-taking, and mark-up." },
    { id: "wp3", icon: "/feature-icon3.svg", title: "Liquid Retina", body: "Vivid colour and responsive touch across every iPad." },
    { id: "wp4", icon: "/feature-icon4.svg", title: "Multitasking", body: "Stage Manager and Split View keep apps side by side." },
    { id: "wp5", icon: "/feature-icon5.svg", title: "All-day battery", body: "Power through class, commute, and creative sessions." },
    { id: "wp6", icon: "/feature-icon1.svg", title: "iPadOS", body: "Designed for touch, Pencil, and keyboard — together." },
];

// Store catalog — lineup products + accessories. `category` drives filter chips.
const storeAccessories = [
    {
        id: "magic-keyboard",
        slug: "magic-keyboard",
        name: "Magic Keyboard",
        category: "Accessories",
        price: 149,
        description: "A wireless keyboard with a numeric keypad and Touch ID.",
        highlight: "Typing and Touch ID, wireless.",
        image: "/laptops/magic-keyboard.png",
        colors: [{ hex: "#e3d5c0", label: "Silver" }, { hex: "#2e2c2e", label: "Black" }],
        specs: [
            { label: "Connectivity", value: "Bluetooth / USB-C" },
            { label: "Power", value: "Rechargeable lithium-ion" },
            { label: "Features", value: "Touch ID, numeric keypad, scissor mechanism" },
            { label: "Compatibility", value: "Mac with Apple silicon or T2 Security Chip" },
        ],
    },
    {
        id: "magic-mouse",
        slug: "magic-mouse",
        name: "Magic Mouse",
        category: "Accessories",
        price: 99,
        description: "Multi-Touch surface. Pairs instantly with your Mac.",
        highlight: "Multi-Touch. Multi-purpose.",
        image: "/laptops/magic-mouse.png",
        colors: [{ hex: "#e3d5c0", label: "Silver" }, { hex: "#2e2c2e", label: "Black" }],
        specs: [
            { label: "Connectivity", value: "Bluetooth / Lightning or USB-C (model dependent)" },
            { label: "Power", value: "Rechargeable lithium-ion" },
            { label: "Features", value: "Multi-Touch surface, seamless scrolling" },
            { label: "Compatibility", value: "Mac computers" },
        ],
    },
    {
        id: "airtag",
        slug: "airtag",
        name: "AirTag",
        category: "Accessories",
        price: 29,
        description: "Clip it on. Find your things with Precision Finding and the Find My network.",
        highlight: "Keep track of what matters.",
        image: "/laptops/airtag.png",
        colors: [{ hex: "#f5f5f0", label: "White" }],
        specs: [
            { label: "Battery", value: "User-replaceable CR2032" },
            { label: "Network", value: "Find My" },
            { label: "Features", value: "Precision Finding, Lost Mode" },
            { label: "Water resistance", value: "IP67" },
        ],
    },
    {
        id: "apple-tv",
        slug: "apple-tv",
        name: "Apple TV 4K",
        category: "Accessories",
        price: 129,
        description: "4K HDR, Dolby Atmos, and Apple Intelligence features on the biggest screen in your home.",
        highlight: "The best way to watch.",
        image: "/laptops/apple-tv.png",
        colors: [{ hex: "#1c1c1e", label: "Black" }],
        specs: [
            { label: "Chip", value: "A15 Bionic" },
            { label: "Video", value: "4K HDR, Dolby Vision" },
            { label: "Audio", value: "Dolby Atmos" },
            { label: "Storage", value: "64 GB / 128 GB" },
        ],
    },
];

const storeCategories = ["All", "Mac", "iPad", "iPhone", "Watch", "Vision", "AirPods", "Accessories"];

// About page — static brand copy. No CMS / no API.
const aboutValues = [
    {
        id: "av1",
        title: "Privacy",
        body: "Your data belongs to you. Apple Intelligence runs on device whenever it can, so what you create stays yours.",
    },
    {
        id: "av2",
        title: "Accessibility",
        body: "Technology should work for everyone. VoiceOver, Magnifier, and AssistiveTouch are designed in — not bolted on.",
    },
    {
        id: "av3",
        title: "Environment",
        body: "Carbon neutral Apple Watch. Recycled aluminium, cobalt, and rare earths. A 2030 goal to be carbon neutral across every product.",
    },
    {
        id: "av4",
        title: "Design",
        body: "Hardware, software, and services conceived together. If it isn't essential, it doesn't ship.",
    },
];

const aboutTimeline = [
    { year: "1976", title: "Founded", body: "Steve Jobs, Steve Wozniak, and Ronald Wayne start Apple in a garage in Los Altos." },
    { year: "1984", title: "Macintosh", body: "The Mac introduces a graphical interface and a mouse to the personal computer." },
    { year: "2007", title: "iPhone", body: "A phone, an iPod, and an internet communicator — in one device that redefined mobile." },
    { year: "2020", title: "Apple silicon", body: "M1 begins the transition from Intel. Performance per watt becomes the new benchmark." },
    { year: "2024", title: "Apple Intelligence", body: "On-device AI that writes, summarises, and creates — privately, on your Mac." },
];

// Support page — mock topics + FAQ. Search filters this list in the browser only.
const supportTopics = [
    { id: "st1", title: "Mac", body: "Setup, macOS, storage, and Apple silicon.", href: "/mac" },
    { id: "st2", title: "Billing", body: "Orders, bag, and mock checkout questions.", href: "/store" },
    { id: "st3", title: "Compare", body: "Pick the right MacBook for your work.", href: "/compare" },
    { id: "st4", title: "Account", body: "Apple ID, iCloud, and sign-in (coming with backend).", href: "/about" },
];

const supportFaqs = [
    {
        id: "faq1",
        topic: "Mac",
        question: "How do I choose between MacBook Air and MacBook Pro?",
        answer: "Air is the everyday laptop — thin, quiet, and all-day battery. Pro adds an XDR display, more ports, and M4 Pro / Max for video, 3D, and compiles. Use Compare to scan specs side by side.",
    },
    {
        id: "faq2",
        topic: "Mac",
        question: "Can I change the colour of the 3D model?",
        answer: "Yes. On a product page, tap a colour swatch. The viewer uses the same Zustand colour state as the homepage MacBook.",
    },
    {
        id: "faq3",
        topic: "Billing",
        question: "Is checkout real?",
        answer: "Not yet. The bag is in-memory only — refresh clears it. Checkout is disabled until the backend ships.",
    },
    {
        id: "faq4",
        topic: "Billing",
        question: "Why did my bag empty after I refreshed?",
        answer: "Cart state lives in Zustand with no persist middleware. That is intentional for this frontend-only phase.",
    },
    {
        id: "faq5",
        topic: "Account",
        question: "Can I create an Apple ID here?",
        answer: "No. There is no auth or API on this site yet. Account flows will land with the backend.",
    },
    {
        id: "faq6",
        topic: "Mac",
        question: "The 3D model or video is missing. Is that a bug?",
        answer: "The app expects files under /public (models, videos, fonts). If those assets are not in the repo, the viewer and hero video will fail to load.",
    },
];

// ─────────────────────────────────────────────────────────────────────────────

// Footer site links — only real routes (no dead "#" legal stubs).
// Privacy / Terms can return when we add dedicated legal pages.
const footerLinks = [
    { label: "About",   link: "/about" },
    { label: "Support", link: "/support" },
    { label: "Store",   link: "/store" },
    { label: "Mac",     link: "/mac" },
    { label: "iPad",    link: "/ipad" },
    { label: "Compare", link: "/compare" },
];

// Flat index for the navbar search overlay — built from existing mock data
// plus a few page shortcuts. Filtered in the browser only.
const buildSearchIndex = () => {
    const pages = [
        { id: "page-home", type: "Page", title: "Home", blurb: "MacBook Pro showcase", href: "/" },
        { id: "page-mac", type: "Page", title: "Mac", blurb: "Mac lineup and Why Mac", href: "/mac" },
        { id: "page-ipad", type: "Page", title: "iPad", blurb: "iPad lineup", href: "/ipad" },
        { id: "page-iphone", type: "Page", title: "iPhone", blurb: "iPhone lineup and features", href: "/iphone" },
        { id: "page-watch", type: "Page", title: "Watch", blurb: "Apple Watch lineup", href: "/watch" },
        { id: "page-vision", type: "Page", title: "Vision", blurb: "Apple Vision Pro", href: "/vision" },
        { id: "page-airpods", type: "Page", title: "AirPods", blurb: "AirPods lineup", href: "/airpods" },
        { id: "page-compare", type: "Page", title: "Compare Macs", blurb: "Side-by-side specs", href: "/compare" },
        { id: "page-store", type: "Page", title: "Store", blurb: "Shop Mac and accessories", href: "/store" },
        { id: "page-about", type: "Page", title: "About", blurb: "Values and timeline", href: "/about" },
        { id: "page-support", type: "Page", title: "Support", blurb: "Help and FAQs", href: "/support" },
        { id: "page-signin", type: "Page", title: "Sign In", blurb: "Apple Account sign-in", href: "/signin" },
    ];

    const macs = macLineup.map((m) => ({
        id: `mac-${m.id}`,
        type: "Mac",
        title: m.name,
        blurb: m.highlight,
        href: m.storeScale != null ? `/mac/${m.slug}` : `/store/${m.slug}`,
    }));

    const ipads = ipadLineup.map((p) => ({
        id: `ipad-${p.id}`,
        type: "iPad",
        title: p.name,
        blurb: p.highlight,
        href: "/ipad",
    }));

    const iphones = iphoneLineup.map((p) => ({
        id: `iphone-${p.id}`,
        type: "iPhone",
        title: p.name,
        blurb: p.highlight,
        href: "/iphone",
    }));

    const watches = watchLineup.map((p) => ({
        id: `watch-${p.id}`,
        type: "Watch",
        title: p.name,
        blurb: p.highlight,
        href: "/store",
    }));

    const vision = visionLineup.map((p) => ({
        id: `vision-${p.id}`,
        type: "Vision",
        title: p.name,
        blurb: p.highlight,
        href: "/store",
    }));

    const airpods = airpodsLineup.map((p) => ({
        id: `airpods-${p.id}`,
        type: "AirPods",
        title: p.name,
        blurb: p.highlight,
        href: "/store",
    }));

    const accessories = storeAccessories.map((a) => ({
        id: `acc-${a.id}`,
        type: "Accessory",
        title: a.name,
        blurb: a.description,
        href: `/store/${a.slug}`,
    }));

    const faqs = supportFaqs.map((f) => ({
        id: `faq-${f.id}`,
        type: "FAQ",
        title: f.question,
        blurb: f.answer,
        href: "/support",
    }));

    return [...pages, ...macs, ...ipads, ...iphones, ...watches, ...vision, ...airpods, ...accessories, ...faqs];
};

const searchIndex = buildSearchIndex();

// Desktop mega-menu content for primary nav items (Support has no mega menu).
// Explore = large primary links; more = smaller secondary column (Apple-style).
const navMegaMenus = {
    Store: {
        exploreTitle: "Shop",
        explore: [
            { label: "Shop the Latest", href: "/store" },
            { label: "Mac", href: "/mac" },
            { label: "iPad", href: "/ipad" },
            { label: "iPhone", href: "/iphone" },
            { label: "Apple Watch", href: "/watch" },
            { label: "Accessories", href: "/store" },
        ],
        moreTitle: "Quick Links",
        more: [
            { label: "Order Status", href: "/support" },
            { label: "Shopping Help", href: "/support" },
        ],
    },
    Mac: {
        exploreTitle: "Explore Mac",
        explore: [
            { label: "Explore All Mac", href: "/mac" },
            ...macLineup.map((m) => ({
                label: m.name,
                href: m.storeScale != null ? `/mac/${m.slug}` : `/store/${m.slug}`,
            })),
        ],
        moreTitle: "More from Mac",
        more: [
            { label: "Compare Mac", href: "/compare" },
            { label: "Mac Support", href: "/support" },
        ],
    },
    iPad: {
        exploreTitle: "Explore iPad",
        explore: [
            { label: "Explore All iPad", href: "/ipad" },
            ...ipadLineup.map((m) => ({ label: m.name, href: "/ipad" })),
        ],
        moreTitle: "More from iPad",
        more: [
            { label: "iPad Support", href: "/support" },
            { label: "Shop iPad", href: "/store" },
        ],
    },
    iPhone: {
        exploreTitle: "Explore iPhone",
        explore: [
            { label: "Explore All iPhone", href: "/iphone" },
            ...iphoneLineup.map((m) => ({ label: m.name, href: "/iphone" })),
        ],
        moreTitle: "More from iPhone",
        more: [
            { label: "iPhone Support", href: "/support" },
            { label: "Shop iPhone", href: "/store" },
        ],
    },
    Watch: {
        exploreTitle: "Explore Watch",
        explore: [
            { label: "Explore All Apple Watch", href: "/watch" },
            ...watchLineup.map((m) => ({ label: m.name, href: "/watch" })),
        ],
        moreTitle: "More from Watch",
        more: [
            { label: "watchOS", href: "/watch" },
            { label: "Apple Watch Support", href: "/support" },
        ],
    },
    Vision: {
        exploreTitle: "Explore Vision",
        explore: [
            { label: "Explore Vision Pro", href: "/vision" },
            ...visionLineup.map((m) => ({ label: m.name, href: "/vision" })),
        ],
        moreTitle: "More from Vision",
        more: [
            { label: "Vision Support", href: "/support" },
            { label: "Shop Vision Pro", href: "/store" },
        ],
    },
    AirPods: {
        exploreTitle: "Explore AirPods",
        explore: [
            { label: "Explore All AirPods", href: "/airpods" },
            ...airpodsLineup.map((m) => ({ label: m.name, href: "/airpods" })),
        ],
        moreTitle: "More from AirPods",
        more: [
            { label: "AirPods Support", href: "/support" },
            { label: "Shop AirPods", href: "/store" },
        ],
    },
};

// ─────────────────────────────────────────────────────────────────────────────

export {
    aboutTimeline,
    aboutValues,
    airpodsLineup,
    features,
    featureSequence,
    footerLinks,
    ipadLineup,
    iphoneLineup,
    macLineup,
    navLinks,
    navMegaMenus,
    noChangeParts,
    performanceImages,
    performanceImgPositions,
    searchIndex,
    storeAccessories,
    storeCategories,
    supportFaqs,
    supportTopics,
    visionLineup,
    watchLineup,
    whyAirpods,
    whyIpad,
    whyIphone,
    whyMac,
    whyVision,
    whyWatch,
};
