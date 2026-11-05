/**
 * JhoomRahi — Mock Datasets & Content Constants
 * Phase 1 Foundation
 * 
 * Provides authentic Indian student & young professional mock data
 * across the Stay, Travel, and Discover verticals.
 */

/* === 1. TOP 10 INDIAN CITIES (STUDENT & TECH HUBS) === */
const CITIES = [
  "Bengaluru",
  "New Delhi",
  "Pune",
  "Mumbai",
  "Hyderabad",
  "Jaipur",
  "Kota",
  "Dehradun",
  "Chennai",
  "Kolkata"
];

/* === 2. TYPEWRITER ROTATING HERO STATEMENTS === */
const TYPEWRITER_LINES = [
  "Single room chahiye with zero brokerage & 24h geyser? Mil jayega.",
  "Spiti weekend road trip ke liye travel buddy chahiye? Yahan milenge.",
  "Midnight chai, butter maggi, ya best budget thali spots near you.",
  "Naye shehar mein apna circle dhundo — verified roommates & flatmates."
];

/* === 3. KEY METRICS & COUNTERS === */
const STATS = [
  {
    target: 15400,
    prefix: "",
    suffix: "+",
    label: "Verified PGs & Flats",
    subtext: "100% physically visited or student-reviewed"
  },
  {
    target: 48,
    prefix: "",
    suffix: "k+",
    label: "Active Community Members",
    subtext: "Students & young professionals across India"
  },
  {
    target: 1250,
    prefix: "",
    suffix: "+",
    label: "Trips Completed Together",
    subtext: "From weekend treks to Spiti expeditions"
  },
  {
    target: 98,
    prefix: "",
    suffix: "%",
    label: "Trust & Safety Score",
    subtext: "Zero spam policy with community ratings"
  }
];

/* === 4. AUTHENTIC TESTIMONIALS (STUDENTS + PROFESSIONALS) === */
const TESTIMONIALS = [
  {
    quote: "Koramangala shift hone ke 3 din me flatmate mil gaya. No brokerage drama, directly connected with another dev who loves chai at 2 AM.",
    name: "Rohan Deshmukh",
    role: "SDE-1, Swiggy",
    city: "Bengaluru",
    avatar: "https://picsum.photos/seed/rohan_dev/200/200"
  },
  {
    quote: "College hostel se nikal kar pehli baar flat lene ka darr tha. Verified filter helped me find a calm 2BHK near North Campus with 24/7 water and zero hassle.",
    name: "Ananya Iyer",
    role: "B.A. Economics, Delhi University",
    city: "New Delhi",
    avatar: "https://picsum.photos/seed/ananya_du/200/200"
  },
  {
    quote: "Spiti winter drive ke liye dost ready nahi the. JhoomRahi ke travel vertical se do sensible co-travelers mile, split budget on point, and made lifelong friends.",
    name: "Kabir Malhotra",
    role: "Product Designer, Zomato",
    city: "Gurugram",
    avatar: "https://picsum.photos/seed/kabir_des/200/200"
  },
  {
    quote: "Mess ke khane se tang aa chuke the. Discover section showed hidden late-night paratha joints and student tiffin services around campus that aren't on normal maps.",
    name: "Tanvi Sharma",
    role: "B.Tech, MNIT Jaipur",
    city: "Jaipur",
    avatar: "https://picsum.photos/seed/tanvi_eng/200/200"
  }
];

/* === 5. FEATURED PG & FLAT LISTINGS === */
const FEATURED_PGS = [
  {
    id: "pg-blr-01",
    title: "Greenwood Co-Living Single Suite",
    area: "HSR Layout, Sector 2",
    city: "Bengaluru",
    rent: "₹14,500/mo",
    deposit: "1 Month",
    verified: true,
    match: 96,
    rating: 4.8,
    amenities: ["Geyser 24h", "RO Water", "300Mbps Wi-Fi", "Daily Cleaning"],
    note: "Zero brokerage · Last updated 2 days ago",
    img: "https://picsum.photos/seed/hsr_room_stay/800/600"
  },
  {
    id: "pg-del-02",
    title: "North Campus Student Residency",
    area: "Vijay Nagar, Near Metro Gate 2",
    city: "New Delhi",
    rent: "₹10,500/mo",
    deposit: "1 Month",
    verified: true,
    match: 92,
    rating: 4.7,
    amenities: ["Attached Washroom", "Power Backup", "Cycle Parking", "Study Desk"],
    note: "Walking distance from Metro · Verified host",
    img: "https://picsum.photos/seed/delhi_du_flat/800/600"
  },
  {
    id: "pg-pune-03",
    title: "Viman Nagar Studio Flatshare",
    area: "Viman Nagar, Lane 4",
    city: "Pune",
    rent: "₹12,000/mo",
    deposit: "2 Months",
    verified: true,
    match: 94,
    rating: 4.9,
    amenities: ["Modular Kitchen", "Washing Machine", "Balcony", "No Restriction"],
    note: "Working professional flatmate preferred",
    img: "https://picsum.photos/seed/pune_flat_stay/800/600"
  }
];

/* === 6. UPCOMING TRAVEL SQUADS === */
const UPCOMING_TRIPS = [
  {
    id: "trip-spiti-01",
    dest: "Spiti Valley Winter Roadtrip",
    from: "Delhi",
    to: "Kaza & Tabo",
    dates: "Nov 14 - Nov 20",
    daysLeft: "4 days left",
    going: 4,
    maxSlots: 6,
    budget: "₹14,000 / person",
    host: "Arjun Mehta (Traveler & Photographer)",
    hostRole: "Freelance Architect",
    tags: ["SUV Roadtrip", "Stargazing", "Homestays"],
    img: "https://picsum.photos/seed/spiti_snow_mountains/800/600"
  },
  {
    id: "trip-gokarna-02",
    dest: "Gokarna Beach & Cliff Hike",
    from: "Bengaluru",
    to: "Kudle & Paradise Beach",
    dates: "Dec 05 - Dec 08",
    daysLeft: "3 weeks left",
    going: 5,
    maxSlots: 8,
    budget: "₹5,500 / person",
    host: "Pooja V. (Backpacker)",
    hostRole: "Frontend Dev, Razorpay",
    tags: ["Weekend Getaway", "Cliff Sunset", "Cafe Hopping"],
    img: "https://picsum.photos/seed/gokarna_beach_hike/800/600"
  },
  {
    id: "trip-rishikesh-03",
    dest: "Rishikesh Rafting & Campfire",
    from: "Dehradun / Delhi",
    to: "Shivpuri & Beatles Ashram",
    dates: "Dec 12 - Dec 14",
    daysLeft: "4 weeks left",
    going: 6,
    maxSlots: 10,
    budget: "₹4,200 / person",
    host: "Vikram Negi",
    hostRole: "B.Tech Final Year, IIT Roorkee",
    tags: ["Grade 4 Rafting", "Bonfire Jam", "River Camp"],
    img: "https://picsum.photos/seed/rishikesh_river_rafting/800/600"
  }
];

/* === 7. TRENDING CITY DISCOVERIES === */
const TRENDING_PLACES = [
  {
    id: "disc-01",
    name: "Midnight Bun Maska & Irani Chai",
    category: "Late Night Eatery",
    city: "Pune",
    area: "Camp, M.G. Road",
    ratingPct: 98,
    priceRange: "₹50 - ₹120",
    highlight: "Open till 3:30 AM · Famous butter toast & elaichi chai",
    badge: "Student Legend",
    img: "https://picsum.photos/seed/irani_chai_bun/800/600"
  },
  {
    id: "disc-02",
    name: "The Reading Room & Pour-Over Hub",
    category: "Work & Study Cafe",
    city: "Bengaluru",
    area: "Indiranagar, 12th Main",
    ratingPct: 95,
    priceRange: "₹180 - ₹350",
    highlight: "High-speed optical fiber · Silent reading zone · Specialty roasts",
    badge: "Co-Work Spot",
    img: "https://picsum.photos/seed/specialty_coffee_blr/800/600"
  },
  {
    id: "disc-03",
    name: "Panditji Unlimited Desi Thali",
    category: "Budget Student Mess",
    city: "Jaipur",
    area: "Near Gopalpura Bypass",
    ratingPct: 96,
    priceRange: "₹90 unlimited",
    highlight: "Ghee rotis, dal tadka, paneer & chhaas refill · Always fresh",
    badge: "Pocket Savior",
    img: "https://picsum.photos/seed/rajasthani_desi_thali/800/600"
  }
];
