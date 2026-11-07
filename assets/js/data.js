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


/* === 8. EXPANDED PG & FLAT LISTINGS (PHASE 2 - STAY VERTICAL) === */
const PGS = [
  {
    id: "pg-blr-hsr-01",
    title: "Zolo Stays — Greenfield Luxury Co-Living",
    tagline: "Walking distance to 27th Main cafes & tech parks",
    type: "PG / Co-Living",
    roomType: "Single & Twin Sharing",
    gender: "unisex",
    city: "Bengaluru",
    area: "HSR Layout, Sector 2",
    fullAddress: "Plot 42, 14th Main, Sector 2, HSR Layout, Bengaluru, Karnataka 560102",
    rent: 14500,
    displayRent: "₹14,500/mo",
    deposit: 14500,
    displayDeposit: "1 Month (₹14,500)",
    rentBreakdown: {
      baseRent: 13000,
      maintenance: 1500,
      electricity: "As per sub-meter (₹9/unit)",
      securityDeposit: 14500,
      brokerage: 0
    },
    verified: true,
    rating: 4.8,
    reviewsCount: 42,
    matchScore: 96,
    amenities: [
      "High-Speed Wi-Fi (300 Mbps)",
      "24/7 Geyser & Hot Water",
      "Daily Room Cleaning",
      "3-Time Homestyle Food (Veg & Non-Veg)",
      "100% Power Backup",
      "Biometric Access & CCTV",
      "Automatic Washing Machines",
      "Rooftop Turf & Chill Zone"
    ],
    rules: {
      curfew: "No curfew (Biometric punch 24/7)",
      visitors: "Allowed in common lounge till 10 PM",
      foodPolicy: "Separate veg cooking counter available",
      smoking: "Permitted on open terrace only",
      pets: "Not permitted"
    },
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80"
    ],
    coordinates: { lat: 12.9116, lng: 77.6389 },
    host: {
      name: "Ramesh Reddy",
      role: "Verified Property Partner",
      phone: "+91 98765 43210",
      responseRate: "Within 10 mins",
      badge: "Superhost"
    },
    metroDistance: "800m from Silk Board / HSR Metro",
    description: "Designed specifically for devs, founders, and students who want peaceful sleep and fast internet. Zero broker charges, pure deposit refund guarantee, and zero lock-in headaches."
  },
  {
    id: "pg-del-nc-02",
    title: "North Campus Scholars Residency",
    tagline: "5 mins from Kirori Mal & SRCC Gate",
    type: "Student PG",
    roomType: "Double & Triple Sharing",
    gender: "female",
    city: "New Delhi",
    area: "Vijay Nagar, Hudson Lane",
    fullAddress: "B-12, Hudson Lane, GTB Nagar, New Delhi 110009",
    rent: 9800,
    displayRent: "₹9,800/mo",
    deposit: 9800,
    displayDeposit: "1 Month (₹9,800)",
    rentBreakdown: {
      baseRent: 8500,
      maintenance: 1300,
      electricity: "Included up to 100 units/mo",
      securityDeposit: 9800,
      brokerage: 0
    },
    verified: true,
    rating: 4.9,
    reviewsCount: 56,
    matchScore: 94,
    amenities: [
      "Study Table & Ergonomic Chair",
      "Air Conditioning (AC)",
      "RO Purified Water",
      "3 Meals Included (North + South Indian)",
      "High-Speed Wi-Fi",
      "Washing Machine",
      "Fingerprint Door Lock",
      "Library / Silent Study Room"
    ],
    rules: {
      curfew: "10:30 PM entry timing",
      visitors: "Female guests allowed in room",
      foodPolicy: "Pure vegetarian kitchen",
      smoking: "Strictly non-smoking premises",
      pets: "Not permitted"
    },
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80"
    ],
    coordinates: { lat: 28.6942, lng: 77.2090 },
    host: {
      name: "Mrs. Sunita Verma",
      role: "Resident Warden & Owner",
      phone: "+91 98112 34567",
      responseRate: "Within 15 mins",
      badge: "Verified Warden"
    },
    metroDistance: "350m from GTB Nagar Yellow Line Metro",
    description: "Safe, studious, and friendly environment with healthy home-style meals, dedicated exam silent zones, and round-the-clock female security staff."
  },
  {
    id: "pg-pune-viman-03",
    title: "Skyline Urban Flatshare — 3BHK Master Room",
    tagline: "Opposite Symbiosis Campus & Datta Mandir Chowk",
    type: "Shared Flat",
    roomType: "Private Attached Room",
    gender: "male",
    city: "Pune",
    area: "Viman Nagar, Lane 4",
    fullAddress: "Flat 402, Skyline Towers, Viman Nagar, Pune 411014",
    rent: 12500,
    displayRent: "₹12,500/mo",
    deposit: 25000,
    displayDeposit: "2 Months (₹25,000)",
    rentBreakdown: {
      baseRent: 11000,
      maintenance: 1500,
      electricity: "Split equally 3 ways (~₹600/mo)",
      securityDeposit: 25000,
      brokerage: 0
    },
    verified: true,
    rating: 4.7,
    reviewsCount: 28,
    matchScore: 91,
    amenities: [
      "Private Balcony",
      "Attached Western Washroom",
      "Modular Kitchen with Gas Hob",
      "Double Door Refrigerator",
      "High-Speed Fiber Internet",
      "Covered 2-Wheeler Parking",
      "Gym & Swimming Pool Access"
    ],
    rules: {
      curfew: "No curfew",
      visitors: "Friends welcome with flatmate heads-up",
      foodPolicy: "Non-veg cooking allowed",
      smoking: "Balcony only",
      pets: "Cats welcome"
    },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&auto=format&fit=crop&q=80"
    ],
    coordinates: { lat: 18.5679, lng: 73.9143 },
    host: {
      name: "Tanmay Joshi",
      role: "Lead Tenant (Dev @ Barclays)",
      phone: "+91 97654 32109",
      responseRate: "Under 1 hour",
      badge: "Verified Flatmate"
    },
    metroDistance: "1.2 km from Ramwadi Metro Station",
    description: "Looking for a chill working professional or postgraduate student to take the master bedroom. Fully furnished hall and kitchen with microwave, mixer, and high-speed fiber."
  },
  {
    id: "pg-mum-powai-04",
    title: "Hiranandani Lakeview Studio Co-living",
    tagline: "Panoramic view of Powai Lake, 5 mins to IIT Bombay",
    type: "1BHK Studio",
    roomType: "Entire Studio / Twin Sharing",
    gender: "unisex",
    city: "Mumbai",
    area: "Powai, Hiranandani Gardens",
    fullAddress: "Tower B, Central Avenue, Powai, Mumbai 400076",
    rent: 21000,
    displayRent: "₹21,000/mo",
    deposit: 42000,
    displayDeposit: "2 Months (₹42,000)",
    rentBreakdown: {
      baseRent: 19000,
      maintenance: 2000,
      electricity: "As per Adani bill meter",
      securityDeposit: 42000,
      brokerage: 0
    },
    verified: true,
    rating: 4.9,
    reviewsCount: 39,
    matchScore: 95,
    amenities: [
      "French Windows with Lake View",
      "Split AC 1.5 Ton",
      "King Size Bed with Ortho Mattress",
      "Microwave & Induction Cooktop",
      "350 Mbps Airtel Xstream Wi-Fi",
      "Smart TV 43-inch",
      "24/7 Gated Security & Intercom",
      "Running Track & Clubhouse"
    ],
    rules: {
      curfew: "No curfew",
      visitors: "Guests welcome with society ID register",
      foodPolicy: "Any food permitted",
      smoking: "Outdoor podium only",
      pets: "Pet-friendly building"
    },
    images: [
      "https://images.unsplash.com/photo-1502005229762-ee152da7c5d6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=80"
    ],
    coordinates: { lat: 19.1176, lng: 72.9060 },
    host: {
      name: "Karan Singhal",
      role: "Verified Host / Alum",
      phone: "+91 98200 12345",
      responseRate: "Within 20 mins",
      badge: "Prime Host"
    },
    metroDistance: "900m from IIT Powai Metro Station",
    description: "Designed for corporate interns, founders, and IIT research scholars. Walking distance to cafes, gourmet supermarkets, and lakeside promenades."
  },
  {
    id: "pg-hyd-gach-05",
    title: "CyberCity Executive Men's PG",
    tagline: "Heart of Financial District, opposite WaveRock",
    type: "PG / Co-Living",
    roomType: "Single & Double Sharing",
    gender: "male",
    city: "Hyderabad",
    area: "Gachibowli, Financial District",
    fullAddress: "Street 8, Telecom Nagar, Gachibowli, Hyderabad 500032",
    rent: 11000,
    displayRent: "₹11,000/mo",
    deposit: 11000,
    displayDeposit: "1 Month (₹11,000)",
    rentBreakdown: {
      baseRent: 9800,
      maintenance: 1200,
      electricity: "Flat ₹500/mo per person",
      securityDeposit: 11000,
      brokerage: 0
    },
    verified: true,
    rating: 4.6,
    reviewsCount: 31,
    matchScore: 89,
    amenities: [
      "North & South Indian Buffet (3 Times)",
      "Daily Housekeeping",
      "Geyser in Every Room",
      "Wi-Fi with Mesh Network",
      "Automatic Washing Machines",
      "Indoor Games (Foosball & Table Tennis)",
      "Biometric Access",
      "Lift & Generator Backup"
    ],
    rules: {
      curfew: "11:30 PM (Biometric post that)",
      visitors: "Daytime visitors permitted in lobby",
      foodPolicy: "Vegetarian and Chicken options served daily",
      smoking: "Designated terrace spot",
      pets: "Not permitted"
    },
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80"
    ],
    coordinates: { lat: 17.4401, lng: 78.3489 },
    host: {
      name: "Venkat Rao",
      role: "Operations Head",
      phone: "+91 94400 98765",
      responseRate: "Under 30 mins",
      badge: "Verified Partner"
    },
    metroDistance: "Raidurg Metro Station at 10 mins auto drive",
    description: "Convenient, clean, and zero-brokerage PG for software developers working in Microsoft, Google, Amazon, and surrounding tech parks."
  },
  {
    id: "pg-del-sc-06",
    title: "Satya Niketan Cozy Flatshare for Girls",
    tagline: "Steps away from South Campus colleges & cafes",
    type: "Shared Flat",
    roomType: "Twin Sharing (Furnished)",
    gender: "female",
    city: "New Delhi",
    area: "Satya Niketan, South Campus",
    fullAddress: "Plot 88, Satya Niketan, Benito Juarez Marg, New Delhi 110021",
    rent: 10500,
    displayRent: "₹10,500/mo",
    deposit: 10500,
    displayDeposit: "1 Month (₹10,500)",
    rentBreakdown: {
      baseRent: 9200,
      maintenance: 1300,
      electricity: "As per BSES meter split",
      securityDeposit: 10500,
      brokerage: 0
    },
    verified: true,
    rating: 4.8,
    reviewsCount: 47,
    matchScore: 93,
    amenities: [
      "AC in Bedroom",
      "Separate Wooden Wardrobes",
      "Full Modular Kitchen",
      "Water Purifier (Aquaguard)",
      "High-Speed Wi-Fi",
      "Dedicated Balcony",
      "Digital Doorbell with Camera"
    ],
    rules: {
      curfew: "No curfew (Key provided)",
      visitors: "Girls allowed anytime, family with prior notice",
      foodPolicy: "Vegetarian / Eggetarian cooking",
      smoking: "Strictly non-smoking",
      pets: "No pets"
    },
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&auto=format&fit=crop&q=80"
    ],
    coordinates: { lat: 28.5884, lng: 77.1685 },
    host: {
      name: "Pooja Chhabra",
      role: "Superhost / Flat Owner",
      phone: "+91 99990 11223",
      responseRate: "Within 5 mins",
      badge: "Superhost"
    },
    metroDistance: "400m from Durgabai Deshmukh South Campus Metro",
    description: "Located right behind the famous Satya Niketan cafe lane. Extremely safe locality, ventilated rooms, and clean environment ideal for Venkateswara, ARSD, and Motilal Nehru students."
  },
  {
    id: "pg-kota-land-07",
    title: "Apex Achievers Boys Residency",
    tagline: "Dedicated silent study environment near Allen Landmark",
    type: "Student PG",
    roomType: "Single Study Room",
    gender: "male",
    city: "Kota",
    area: "Landmark City, Kunhari",
    fullAddress: "Road No. 1, Landmark City, Kunhari, Kota, Rajasthan 324008",
    rent: 8500,
    displayRent: "₹8,500/mo",
    deposit: 8500,
    displayDeposit: "1 Month (₹8,500)",
    rentBreakdown: {
      baseRent: 7500,
      maintenance: 1000,
      electricity: "Sub-meter billing",
      securityDeposit: 8500,
      brokerage: 0
    },
    verified: true,
    rating: 4.7,
    reviewsCount: 52,
    matchScore: 90,
    amenities: [
      "Large Study Desk with Pinboard",
      "Ergonomic High-Back Chair",
      "Split AC with Timer",
      "Pure Desi Ghee Home Meals",
      "RO Water on Every Floor",
      "On-Call Doctor & Counselor",
      "In-House Laundry & Ironing",
      "Sound-Insulated Doors"
    ],
    rules: {
      curfew: "10:00 PM strict biometric check",
      visitors: "Parents only in visitors lounge",
      foodPolicy: "100% Satvik Pure Veg Mess",
      smoking: "Zero tolerance non-smoking zone",
      pets: "No pets"
    },
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80"
    ],
    coordinates: { lat: 25.2138, lng: 75.8648 },
    host: {
      name: "Mahesh Agrawal",
      role: "Warden & Mentor",
      phone: "+91 94141 55667",
      responseRate: "Within 10 mins",
      badge: "Verified Student Stay"
    },
    metroDistance: "Allen Landmark City Campus at 2 mins walk",
    description: "Curated exclusively for JEE & NEET aspirants seeking a zero-distraction lifestyle, hygienic nutritious meals, and responsive local guardianship."
  },
  {
    id: "pg-blr-kor-08",
    title: "Koramangala 4th Block Indie Villa Flatshare",
    tagline: "Lush green tree-lined lane near Sony World Signal",
    type: "Shared Flat",
    roomType: "Private Bedroom with Balcony",
    gender: "unisex",
    city: "Bengaluru",
    area: "Koramangala, 4th Block",
    fullAddress: "Villa 19, 8th Main, 4th Block, Koramangala, Bengaluru 560034",
    rent: 16500,
    displayRent: "₹16,500/mo",
    deposit: 33000,
    displayDeposit: "2 Months (₹33,000)",
    rentBreakdown: {
      baseRent: 15000,
      maintenance: 1500,
      electricity: "Shared bill (~₹700/mo)",
      securityDeposit: 33000,
      brokerage: 0
    },
    verified: true,
    rating: 4.9,
    reviewsCount: 36,
    matchScore: 97,
    amenities: [
      "Open Garden & Patio",
      "Espresso Coffee Machine",
      "400 Mbps ACT Fiber",
      "Full Kitchen & Dishwasher",
      "Private Work Desk",
      "No Restrictions / High Privacy",
      "Guitar & Vinyl Record Player",
      "Car & Bike Parking"
    ],
    rules: {
      curfew: "No curfew",
      visitors: "Friends welcome anytime",
      foodPolicy: "All cuisines welcome",
      smoking: "Open garden / balcony only",
      pets: "Pet-friendly (Dogs welcome)"
    },
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80"
    ],
    coordinates: { lat: 12.9345, lng: 77.6256 },
    host: {
      name: "Siddharth Nair",
      role: "Designer & Startup Founder",
      phone: "+91 99000 88776",
      responseRate: "Under 20 mins",
      badge: "Verified Host"
    },
    metroDistance: "Koramangala Sony Signal bus station 3 mins walk",
    description: "An authentic, airy, and warm vintage villa with sunlit rooms. Perfect for creative professionals, startup folks, or remote developers looking for a home, not just a room."
  }
];

/* === 9. ROOMMATE PROFILES WITH COMPATIBILITY TRAITS (PHASE 2) === */
const ROOMMATES = [
  {
    id: "rm-01",
    name: "Aarav Sharma",
    age: 23,
    gender: "male",
    seeking: "male",
    city: "Bengaluru",
    targetAreas: ["Koramangala", "HSR Layout", "BTM 2nd Stage"],
    budget: 13500,
    budgetDisplay: "₹11k – ₹15k/mo",
    moveInDate: "Immediate",
    hasFlat: false,
    role: "Frontend Engineer @ Swiggy",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    verified: true,
    verificationBadge: "ID & Company Verified",
    bio: "Shifting from Indiranagar to cut down daily commute. Usually code late night with lofi beats. Big tea fan and clean kitchen advocate.",
    hobbies: ["Filter Coffee", "Indie Rock", "Badminton", "Hackathons"],
    matchScore: 96,
    traits: {
      sleep: "night_owl",
      food: "eggetarian",
      clean: "daily_tidy",
      work: "wfh_hybrid",
      social: "social_balanced",
      smoking: "non_smoker",
      drinking: "occasional",
      ac: "night_only",
      noise: "headphones_always",
      pets: "pet_lover",
      bathroom: "shared_ok",
      conflict: "direct_whatsapp"
    },
    matchBreakdown: {
      sleepPct: 95,
      foodPct: 100,
      cleanPct: 96,
      lifestylePct: 92
    }
  },
  {
    id: "rm-02",
    name: "Meera Krishnan",
    age: 21,
    gender: "female",
    seeking: "female",
    city: "New Delhi",
    targetAreas: ["Vijay Nagar", "Hudson Lane", "Mukherjee Nagar"],
    budget: 10000,
    budgetDisplay: "₹8k – ₹11k/mo",
    moveInDate: "1st of next month",
    hasFlat: true,
    role: "M.A. English, Delhi University",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    verified: true,
    verificationBadge: "DU Student Verified",
    bio: "Looking for a studious, friendly flatmate for a bright 2BHK in Hudson Lane. I wake up early for yoga and reading. Strict no shoes inside policy.",
    hobbies: ["Classic Fiction", "Yoga", "Pottery", "Chai Walks"],
    matchScore: 94,
    traits: {
      sleep: "early_bird",
      food: "pure_veg",
      clean: "daily_tidy",
      work: "office_daily",
      social: "introvert_quiet",
      smoking: "non_smoker",
      drinking: "teetotaler",
      ac: "night_only",
      noise: "headphones_always",
      pets: "no_pets",
      bathroom: "attached_only",
      conflict: "weekly_chai"
    },
    matchBreakdown: {
      sleepPct: 98,
      foodPct: 100,
      cleanPct: 96,
      lifestylePct: 88
    }
  },
  {
    id: "rm-03",
    name: "Dev & Priya (Co-ed Teamup)",
    age: 24,
    gender: "co-ed",
    seeking: "co-ed",
    city: "Pune",
    targetAreas: ["Koregaon Park", "Kalyani Nagar", "Viman Nagar"],
    budget: 16000,
    budgetDisplay: "₹14k – ₹18k/mo",
    moveInDate: "Flexible",
    hasFlat: false,
    role: "Product Designer & UI Dev",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&auto=format&fit=crop&q=80",
    verified: true,
    verificationBadge: "Identity Verified",
    bio: "Two college friends looking for a 3rd flatmate to lease a sunny 3BHK flat in KP. We cook great pasta on Sundays, love board games, and keep noise low after 11 PM.",
    hobbies: ["Board Games", "Cooking", "Bouldering", "Espresso"],
    matchScore: 92,
    traits: {
      sleep: "flexible",
      food: "non_veg",
      clean: "weekly_reset",
      work: "remote_wfh",
      social: "social_balanced",
      smoking: "balcony_only",
      drinking: "social",
      ac: "chilled_24h",
      noise: "daytime_speakers",
      pets: "pet_lover",
      bathroom: "shared_ok",
      conflict: "weekly_chai"
    },
    matchBreakdown: {
      sleepPct: 88,
      foodPct: 92,
      cleanPct: 90,
      lifestylePct: 94
    }
  },
  {
    id: "rm-04",
    name: "Rohan Deshmukh",
    age: 25,
    gender: "male",
    seeking: "male",
    city: "Bengaluru",
    targetAreas: ["HSR Layout", "Bellandur", "Sarjapur Road"],
    budget: 15000,
    budgetDisplay: "₹13k – ₹17k/mo",
    moveInDate: "Immediate",
    hasFlat: true,
    role: "Backend Architect @ Razorpay",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    verified: true,
    verificationBadge: "Work Verified",
    bio: "Spare master bedroom with private washroom available in Green Glen Layout. Looking for another dev/professional. Zero brokerage, split maid & cook.",
    hobbies: ["Gym", "Mechanical Keyboards", "Sci-Fi", "Dosa Trails"],
    matchScore: 95,
    traits: {
      sleep: "night_owl",
      food: "non_veg",
      clean: "daily_tidy",
      work: "remote_wfh",
      social: "social_balanced",
      smoking: "non_smoker",
      drinking: "occasional",
      ac: "chilled_24h",
      noise: "headphones_always",
      pets: "neutral",
      bathroom: "attached_only",
      conflict: "direct_whatsapp"
    },
    matchBreakdown: {
      sleepPct: 94,
      foodPct: 96,
      cleanPct: 95,
      lifestylePct: 92
    }
  },
  {
    id: "rm-05",
    name: "Ananya Sen",
    age: 22,
    gender: "female",
    seeking: "female",
    city: "Bengaluru",
    targetAreas: ["Indiranagar", "Domlur", "Halasuru"],
    budget: 14000,
    budgetDisplay: "₹12k – ₹16k/mo",
    moveInDate: "Within 2 weeks",
    hasFlat: false,
    role: "Content Strategist @ CRED",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    verified: true,
    verificationBadge: "ID Verified",
    bio: "Need a cozy aesthetic flat in Indiranagar. I have a lot of indoor plants and an espresso machine we can share! Seeking non-judgmental female flatmate.",
    hobbies: ["Plant Mom", "Specialty Coffee", "Thrifting", "Photography"],
    matchScore: 93,
    traits: {
      sleep: "flexible",
      food: "eggetarian",
      clean: "daily_tidy",
      work: "wfh_hybrid",
      social: "social_balanced",
      smoking: "balcony_only",
      drinking: "social",
      ac: "night_only",
      noise: "daytime_speakers",
      pets: "pet_lover",
      bathroom: "attached_only",
      conflict: "direct_whatsapp"
    },
    matchBreakdown: {
      sleepPct: 90,
      foodPct: 95,
      cleanPct: 98,
      lifestylePct: 91
    }
  },
  {
    id: "rm-06",
    name: "Kabir Malhotra",
    age: 24,
    gender: "male",
    seeking: "male",
    city: "New Delhi",
    targetAreas: ["Hauz Khas", "Green Park", "Safdarjung"],
    budget: 18000,
    budgetDisplay: "₹15k – ₹20k/mo",
    moveInDate: "Immediate",
    hasFlat: false,
    role: "Product Designer @ Zomato",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    verified: true,
    verificationBadge: "Work Verified",
    bio: "Looking to rent a sunlit South Delhi builder floor with a balcony. Love weekend drives, cycling around Lutyens, and keep common areas neat.",
    hobbies: ["Cycling", "Roadtrips", "Minimalist Design", "Vinyls"],
    matchScore: 90,
    traits: {
      sleep: "night_owl",
      food: "non_veg",
      clean: "weekly_reset",
      work: "office_daily",
      social: "social_balanced",
      smoking: "balcony_only",
      drinking: "occasional",
      ac: "night_only",
      noise: "headphones_always",
      pets: "pet_lover",
      bathroom: "attached_only",
      conflict: "weekly_chai"
    },
    matchBreakdown: {
      sleepPct: 92,
      foodPct: 90,
      cleanPct: 88,
      lifestylePct: 93
    }
  },
  {
    id: "rm-07",
    name: "Tanvi & Rhea (Co-ed/Girls)",
    age: 22,
    gender: "female",
    seeking: "co-ed",
    city: "Mumbai",
    targetAreas: ["Powai", "Andheri East", "Chandivali"],
    budget: 15000,
    budgetDisplay: "₹13k – ₹16k/mo",
    moveInDate: "1st of next month",
    hasFlat: true,
    role: "Fintech Analyst & Media Producer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    verified: true,
    verificationBadge: "Flatmates Verified",
    bio: "One room available in our 3BHK flat near Powai Lake. Open to sensible, career-focused male or female flatmates who appreciate clean bathrooms.",
    hobbies: ["Sunset Runs", "Baking", "Podcasts", "Badminton"],
    matchScore: 91,
    traits: {
      sleep: "early_bird",
      food: "non_veg",
      clean: "daily_tidy",
      work: "office_daily",
      social: "social_balanced",
      smoking: "non_smoker",
      drinking: "occasional",
      ac: "night_only",
      noise: "headphones_always",
      pets: "no_pets",
      bathroom: "attached_only",
      conflict: "direct_whatsapp"
    },
    matchBreakdown: {
      sleepPct: 94,
      foodPct: 90,
      cleanPct: 96,
      lifestylePct: 90
    }
  },
  {
    id: "rm-08",
    name: "Vikram Negi",
    age: 23,
    gender: "male",
    seeking: "male",
    city: "Pune",
    targetAreas: ["Hinjewadi Phase 1", "Wakad", "Baner"],
    budget: 9500,
    budgetDisplay: "₹8k – ₹11k/mo",
    moveInDate: "Immediate",
    hasFlat: false,
    role: "DevOps Engineer @ Infosys",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
    verified: true,
    verificationBadge: "ID Verified",
    bio: "Need a pocket-friendly place near Hinjewadi Phase 1 tech circle. Non-smoker, early morning runner, and very cooperative with chores and rent on time.",
    hobbies: ["Trail Running", "Trekking", "Guitar", "Chess"],
    matchScore: 92,
    traits: {
      sleep: "early_bird",
      food: "pure_veg",
      clean: "daily_tidy",
      work: "wfh_hybrid",
      social: "introvert_quiet",
      smoking: "non_smoker",
      drinking: "teetotaler",
      ac: "fan_preferred",
      noise: "headphones_always",
      pets: "neutral",
      bathroom: "shared_ok",
      conflict: "direct_whatsapp"
    },
    matchBreakdown: {
      sleepPct: 98,
      foodPct: 98,
      cleanPct: 94,
      lifestylePct: 86
    }
  },
  {
    id: "rm-09",
    name: "Divya Nambiar",
    age: 24,
    gender: "female",
    seeking: "female",
    city: "Hyderabad",
    targetAreas: ["Gachibowli", "Madhapur", "Kondapur"],
    budget: 12000,
    budgetDisplay: "₹10k – ₹13k/mo",
    moveInDate: "Flexible",
    hasFlat: false,
    role: "Data Scientist @ Microsoft",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    verified: true,
    verificationBadge: "Work Verified",
    bio: "Relocating to Hyderabad. Looking for a chilled-out, respectful female flatmate to rent a 2BHK gated society flat near Financial District.",
    hobbies: ["Swimming", "Classical Dance", "Data viz", "Filter Coffee"],
    matchScore: 95,
    traits: {
      sleep: "flexible",
      food: "non_veg",
      clean: "daily_tidy",
      work: "wfh_hybrid",
      social: "social_balanced",
      smoking: "non_smoker",
      drinking: "occasional",
      ac: "chilled_24h",
      noise: "headphones_always",
      pets: "pet_lover",
      bathroom: "attached_only",
      conflict: "direct_whatsapp"
    },
    matchBreakdown: {
      sleepPct: 92,
      foodPct: 95,
      cleanPct: 96,
      lifestylePct: 94
    }
  },
  {
    id: "rm-10",
    name: "Arjun & Squad",
    age: 25,
    gender: "co-ed",
    seeking: "co-ed",
    city: "Bengaluru",
    targetAreas: ["Indiranagar", "Koramangala", "Old Airport Road"],
    budget: 17000,
    budgetDisplay: "₹15k – ₹19k/mo",
    moveInDate: "Immediate",
    hasFlat: true,
    role: "Startup Marketers & AI Researchers",
    avatar: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&auto=format&fit=crop&q=80",
    verified: true,
    verificationBadge: "Verified Community",
    bio: "Have an independent penthouse duplex in Indiranagar. One massive private studio room available for a flatmate who values great conversations and independence.",
    hobbies: ["Podcasting", "Rooftop BBQ", "Table Tennis", "Reading"],
    matchScore: 94,
    traits: {
      sleep: "night_owl",
      food: "non_veg",
      clean: "weekly_reset",
      work: "remote_wfh",
      social: "social_balanced",
      smoking: "balcony_only",
      drinking: "social",
      ac: "chilled_24h",
      noise: "daytime_speakers",
      pets: "pet_lover",
      bathroom: "attached_only",
      conflict: "weekly_chai"
    },
    matchBreakdown: {
      sleepPct: 91,
      foodPct: 94,
      cleanPct: 90,
      lifestylePct: 96
    }
  }
];


/* === 10. EXPANDED TRAVEL SQUADS & WEEKEND EXPEDITIONS (PHASE 3) === */
const TRIPS = [
  {
    id: "trip-spiti-01",
    title: "Spiti Valley Winter Expedition 4x4",
    destination: "Spiti Valley, Himachal Pradesh",
    originCity: "New Delhi",
    pickupPoint: "Majnu Ka Tilla / Kashmere Gate Metro",
    startDate: "2026-11-20T06:00:00",
    endDate: "2026-11-27T20:00:00",
    dateDisplay: "Nov 20 – Nov 27, 2026",
    duration: "7 Days, 6 Nights",
    vibe: "Roadtrip & Mountains",
    vibeCategory: "roadtrip",
    difficulty: "Moderate",
    transportMode: "Private 4x4 Scorpio / Thar (Split)",
    budget: 14500,
    budgetDisplay: "₹14,500 / person",
    budgetBreakdown: {
      transport: 6500,
      stay: 4500,
      food: 2500,
      permits: 1000
    },
    slots: {
      total: 6,
      booked: 4,
      remaining: 2
    },
    host: {
      id: "host-arjun",
      name: "Arjun Mehta",
      role: "Freelance Architect & Photographer",
      city: "New Delhi",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      tripsLed: 8,
      rating: 4.9,
      verified: true,
      bio: "Completed 5 high-altitude winter circuits. Love astrophotography, hot chai at mountain passes, and driving chill playlists."
    },
    squad: [
      {
        id: "sq-1",
        name: "Arjun Mehta",
        role: "Host & Driver",
        city: "Delhi",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80"
      },
      {
        id: "sq-2",
        name: "Rohan Deshmukh",
        role: "SDE @ Swiggy",
        city: "Bengaluru",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80"
      },
      {
        id: "sq-3",
        name: "Tanvi Sharma",
        role: "UI Designer",
        city: "Jaipur",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"
      },
      {
        id: "sq-4",
        name: "Kabir Malhotra",
        role: "Product Designer @ Zomato",
        city: "Gurugram",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=800",
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
    ],
    itinerary: [
      { day: 1, title: "Delhi to Shimla / Narkanda", desc: "Early 6 AM departure via Murthal for parathas. Ascend through pine valleys, overnight stay in Narkanda orchard homestay.", icon: "car" },
      { day: 2, title: "Narkanda to Kalpa & Kinnaur Valley", desc: "Drive along the ferocious Sutlej river through the Kinnaur gate. Sunset view of Kinner Kailash range.", icon: "mountain" },
      { day: 3, title: "Kalpa to Tabo via Nako Lake", desc: "Cross Khab sangam (Sutlej & Spiti confluence). Visit Nako frozen lake and the 1000-year-old Tabo Monastery.", icon: "compass" },
      { day: 4, title: "Tabo to Kaza via Dhankar Gompa", desc: "Explore the dramatic cliff-hanging Dhankar Monastery. Arrive at Kaza, evening cafe hopping and acclimatization.", icon: "flag" },
      { day: 5, title: "Hikkim, Komic & Langza Circuit", desc: "Post letters from the World's Highest Post Office (Hikkim at 14,567 ft) and visit the giant Langza Buddha statue.", icon: "send" },
      { day: 6, title: "Key Monastery & Kibber Wildlife Sanctuary", desc: "Morning prayer chanting at Key Monastery. Spot blue sheep and Himalayan foxes around Kibber village.", icon: "camera" },
      { day: 7, title: "Kaza to Manali / Return to Delhi", desc: "Cross Atal Tunnel, celebratory trout dinner in Old Manali, overnight return Volvo/SUV back to Delhi.", icon: "check-circle" }
    ],
    inclusions: [
      "Shared 4x4 SUV (Dedicated driver, fuel & toll taxes)",
      "6 Nights cozy homestays with heating & tandoor",
      "Fresh breakfast and warm Pahadi dinners daily",
      "Inner Line permits & wildlife entry fees",
      "First-aid kit with portable oxygen canister"
    ],
    exclusions: [
      "Midday cafe lunches & personal snacks",
      "Personal thermal clothing & boots",
      "Emergency medical expenses"
    ],
    description: "An unfiltered, student-budget winter expedition through high-altitude desert landscapes. No commercial agencies — just 6 sensible travelers sharing fuel and homestay costs."
  },
  {
    id: "trip-gokarna-02",
    title: "Gokarna Cliff Hike & Beach Backpacking",
    destination: "Gokarna & Honnavar, Karnataka",
    originCity: "Bengaluru",
    pickupPoint: "Yeshwantpur Railway Station / Goraguntepalya",
    startDate: "2026-12-04T21:00:00",
    endDate: "2026-12-07T06:00:00",
    dateDisplay: "Dec 04 – Dec 07, 2026",
    duration: "Weekend (2 Days, 1 Night + Travel)",
    vibe: "Beach & Coastal",
    vibeCategory: "beach",
    difficulty: "Easy / Chill",
    transportMode: "Overnight Sleeper Train / Shared TT",
    budget: 4800,
    budgetDisplay: "₹4,800 / person",
    budgetBreakdown: {
      transport: 2200,
      stay: 1400,
      food: 1200
    },
    slots: { total: 8, booked: 5, remaining: 3 },
    host: {
      id: "host-pooja",
      name: "Pooja Venkat",
      role: "Frontend Dev @ Razorpay",
      city: "Bengaluru",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
      tripsLed: 4,
      rating: 4.8,
      verified: true,
      bio: "Backpacker who knows every quiet cliff and beach shack from Kudle to Half Moon. Teetotaler-friendly and sunset enthusiast."
    },
    squad: [
      { id: "sq-10", name: "Pooja V.", role: "Host", city: "Bengaluru", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
      { id: "sq-11", name: "Ananya Sen", role: "Content Lead", city: "Bengaluru", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400" },
      { id: "sq-12", name: "Dev Roy", role: "Product Designer", city: "Pune", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400" },
      { id: "sq-13", name: "Siddharth N.", role: "Founder", city: "Bengaluru", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400" },
      { id: "sq-14", name: "Meera K.", role: "Student", city: "Delhi", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" }
    ],
    coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
    ],
    itinerary: [
      { day: 1, title: "Friday Night Departure", desc: "Board overnight train from Bengaluru. Jam with acoustic guitar in sleeper coach.", icon: "train" },
      { day: 2, title: "The 5-Beach Cliff Trek", desc: "Trek from Belekan beach across Paradise, Half Moon, and Om Beach. Sunset dinner at Namaste Cafe.", icon: "compass" },
      { day: 3, title: "Honnavar Mangrove Boat Ride & Return", desc: "Morning boat safari through Sharavathi backwaters. Evening return train arriving Bengaluru Monday 6 AM.", icon: "sun" }
    ],
    inclusions: [
      "Beachfront hostel / tent accommodation on Kudle Beach",
      "Guided 5-beach cliff trek route",
      "Honnavar mangrove boat ride pass",
      "Saturday seaside breakfast and dinner"
    ],
    exclusions: [
      "Train tickets (coordinated group booking)",
      "Sunday beach cafe lunch"
    ],
    description: "Escape Bangalore traffic for a zero-stress weekend of cliff hikes, ocean sunsets, fresh seafood and thali shacks, and night walks on glowing bioluminescent sand."
  },
  {
    id: "trip-rishi-03",
    title: "Rishikesh Grade-4 Rafting & Bonfire Camp",
    destination: "Rishikesh & Shivpuri, Uttarakhand",
    originCity: "New Delhi",
    pickupPoint: "Akshardham Metro Station, Delhi",
    startDate: "2026-12-11T22:00:00",
    endDate: "2026-12-13T21:00:00",
    dateDisplay: "Dec 11 – Dec 13, 2026",
    duration: "Weekend (2 Days, 1 Night)",
    vibe: "Trekking & Campfire",
    vibeCategory: "trek",
    difficulty: "Moderate",
    transportMode: "AC Tempo Traveller / Carpool",
    budget: 3900,
    budgetDisplay: "₹3,900 / person",
    budgetBreakdown: { transport: 1500, stay: 1400, food: 1000 },
    slots: { total: 10, booked: 6, remaining: 4 },
    host: {
      id: "host-vikram",
      name: "Vikram Negi",
      role: "B.Tech Final Year, IIT Roorkee",
      city: "Dehradun",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
      tripsLed: 6,
      rating: 4.9,
      verified: true,
      bio: "Certified swift-water rescuer and avid trekker. Led 10+ college groups on Ganga rapids."
    },
    squad: [
      { id: "sq-20", name: "Vikram Negi", role: "Host", city: "Dehradun", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400" },
      { id: "sq-21", name: "Rhea Sen", role: "Media Producer", city: "Mumbai", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400" },
      { id: "sq-22", name: "Tanmay Joshi", role: "Dev @ Barclays", city: "Pune", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" }
    ],
    coverImage: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800"
    ],
    itinerary: [
      { day: 1, title: "Overnight Drive to Shivpuri", desc: "Night drive from Delhi, arrive at riverside camp for sunrise chai.", icon: "car" },
      { day: 2, title: "16 km White Water Rafting & Cliff Jump", desc: "Navigate Roller Coaster, Golf Course, and Club House rapids with certified guides. Evening acoustic bonfire.", icon: "zap" },
      { day: 3, title: "Beatles Ashram & Ganga Aarti", desc: "Morning meditation at Beatles Ashram. Triveni Ghat evening aarti before returning to Delhi by 10 PM.", icon: "heart" }
    ],
    inclusions: [
      "16km River Rafting with safety helmets & life jackets",
      "1 Night riverside dome tent camping",
      "3 Meals (Buffet lunch, dinner with campfire snacks, breakfast)",
      "Trek to secret waterfall near camp"
    ],
    exclusions: ["Cliff jump video GoPro charges (optional)", "Personal drinks"],
    description: "Action-packed weekend on the Ganga rapids with riverside bonfires and music under star-filled skies."
  },
  {
    id: "trip-kasol-04",
    title: "Kasol & Kheerganga Hot Springs Trek",
    destination: "Parvati Valley, Himachal Pradesh",
    originCity: "New Delhi",
    pickupPoint: "Kashmere Gate ISBT, Delhi",
    startDate: "2026-12-18T18:00:00",
    endDate: "2026-12-22T08:00:00",
    dateDisplay: "Dec 18 – Dec 22, 2026",
    duration: "4 Days, 3 Nights",
    vibe: "Trekking & Campfire",
    vibeCategory: "trek",
    difficulty: "Moderate",
    transportMode: "Semi-Sleeper Volvo + Local Cab",
    budget: 6800,
    budgetDisplay: "₹6,800 / person",
    budgetBreakdown: { transport: 3200, stay: 2000, food: 1600 },
    slots: { total: 8, booked: 6, remaining: 2 },
    host: {
      id: "host-divya",
      name: "Divya Nambiar",
      role: "Data Scientist @ Microsoft",
      city: "Hyderabad / Delhi",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      tripsLed: 3,
      rating: 4.8,
      verified: true,
      bio: "Parvati Valley lover. I know the best riverside cafes in Chalal and secret hot spring spots."
    },
    squad: [
      { id: "sq-30", name: "Divya N.", role: "Host", city: "Delhi", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400" },
      { id: "sq-31", name: "Aarav Sharma", role: "Frontend Dev", city: "Bengaluru", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400" }
    ],
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    gallery: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"],
    itinerary: [
      { day: 1, title: "Overnight Bus to Bhuntar", desc: "Depart Delhi 6 PM, morning arrival in Kasol.", icon: "bus" },
      { day: 2, title: "Kasol & Chalal Cafe Walk", desc: "Walk along Parvati river, Israeli shakshuka and cinnamon rolls.", icon: "coffee" },
      { day: 3, title: "Trek to Kheerganga Summit", desc: "12 km pine forest hike to natural hot sulfur springs under snow peaks.", icon: "mountain" },
      { day: 4, title: "Descent & Manikaran Sahib", desc: "Descend to Barshaini, visit holy Manikaran gurudwara, overnight bus back.", icon: "check" }
    ],
    inclusions: ["Roundtrip Volvo transport", "Hostel in Kasol + Summit tent in Kheerganga", "Hot spring entry & guide", "Daily breakfast"],
    exclusions: ["Cafe meals in Kasol", "Pony/porter service if required"],
    description: "Trek up through apple orchards and misty pine woods to take a dip in natural hot sulfur springs surrounded by snow-covered peaks."
  },
  {
    id: "trip-pondi-05",
    title: "Pondicherry French Quarter & Auroville Trail",
    destination: "Pondicherry & Auroville",
    originCity: "Chennai",
    pickupPoint: "Guindy / Koyambedu, Chennai",
    startDate: "2026-12-25T07:00:00",
    endDate: "2026-12-27T21:00:00",
    dateDisplay: "Dec 25 – Dec 27, 2026",
    duration: "Christmas Weekend (3 Days, 2 Nights)",
    vibe: "Culture & Heritage",
    vibeCategory: "culture",
    difficulty: "Easy / Chill",
    transportMode: "East Coast Road (ECR) Scenic Drive",
    budget: 5200,
    budgetDisplay: "₹5,200 / person",
    budgetBreakdown: { transport: 1800, stay: 2200, food: 1200 },
    slots: { total: 6, booked: 4, remaining: 2 },
    host: {
      id: "host-aarav",
      name: "Aarav Sharma",
      role: "Frontend Engineer @ Swiggy",
      city: "Bengaluru",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400",
      tripsLed: 5,
      rating: 4.9,
      verified: true,
      bio: "French bakery addict, cycle explorer, and ECR roadtrip enthusiast."
    },
    squad: [
      { id: "sq-40", name: "Aarav Sharma", role: "Host", city: "Bengaluru", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400" },
      { id: "sq-41", name: "Meera Krishnan", role: "Student", city: "Delhi", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" }
    ],
    coverImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800",
    gallery: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800"],
    itinerary: [
      { day: 1, title: "ECR Coastal Drive to White Town", desc: "Scenic drive along Bay of Bengal. Check in to colonial heritage villa.", icon: "car" },
      { day: 2, title: "Auroville Matrimandir & Surfing", desc: "Cycle through Auroville forests, sourdough bakery visits, evening surf session.", icon: "sun" },
      { day: 3, title: "Promenade Sunrise & Return", desc: "Sunrise filter coffee on Rock Beach, French pastries at Coromandel Cafe.", icon: "coffee" }
    ],
    inclusions: ["Shared coastal carpool", "2 nights French villa stay", "Vintage bicycle rental for 2 days", "Daily artisan breakfast"],
    exclusions: ["Surfing lessons (optional ₹1,000)", "Cafe dinners"],
    description: "Christmas weekend along the bougainvillea-covered streets of White Town, golden croissants, and Auroville forest trails."
  },
  {
    id: "trip-pushkar-06",
    title: "Pushkar Desert Stargazing & Camping",
    destination: "Pushkar & Thar Desert, Rajasthan",
    originCity: "Jaipur",
    pickupPoint: "Sindhi Camp Bus Stand, Jaipur",
    startDate: "2026-11-13T14:00:00",
    endDate: "2026-11-15T18:00:00",
    dateDisplay: "Nov 13 – Nov 15, 2026",
    duration: "Weekend (2 Days, 2 Nights)",
    vibe: "Culture & Heritage",
    vibeCategory: "culture",
    difficulty: "Easy / Chill",
    transportMode: "AC Mini Coach / Carpool",
    budget: 3500,
    budgetDisplay: "₹3,500 / person",
    budgetBreakdown: { transport: 1200, stay: 1300, food: 1000 },
    slots: { total: 10, booked: 7, remaining: 3 },
    host: {
      id: "host-tanvi",
      name: "Tanvi Sharma",
      role: "B.Tech, MNIT Jaipur",
      city: "Jaipur",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      tripsLed: 4,
      rating: 4.8,
      verified: true,
      bio: "Local Jaipur traveler who knows secret sunset dunes and authentic dal baati churma spots."
    },
    squad: [
      { id: "sq-50", name: "Tanvi Sharma", role: "Host", city: "Jaipur", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400" }
    ],
    coverImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800",
    gallery: ["https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800"],
    itinerary: [
      { day: 1, title: "Drive through Aravallis to Pushkar", desc: "Afternoon drive from Jaipur, sunset hike up Savitri Temple hill.", icon: "mountain" },
      { day: 2, title: "Desert Safari, Folk Music & Stargazing", desc: "Camel cart safari to isolated dunes, Kalbelia folk performance, midnight bonfire under clear desert stars.", icon: "moon" },
      { day: 3, title: "Pushkar Lake Ghats & Return", desc: "Morning stroll around 52 sacred ghats, rabdi malpua breakfast, return to Jaipur by 6 PM.", icon: "coffee" }
    ],
    inclusions: ["Roundtrip transport from Jaipur", "1 night Swiss desert tent with attached bath", "Traditional Rajasthani dinner & breakfast", "Desert dune safari"],
    exclusions: ["Shopping in Pushkar bazaar", "Personal snacks"],
    description: "Witness golden desert dunes, hypnotic Sufi rhythms by the campfire, and the tranquil spiritual ghats of Pushkar."
  },
  {
    id: "trip-rajmachi-07",
    title: "Rajmachi Fort Night Trek & Firefly Trail",
    destination: "Lonavala & Rajmachi, Maharashtra",
    originCity: "Pune",
    pickupPoint: "Shivajinagar / Wakad, Pune",
    startDate: "2026-12-12T16:00:00",
    endDate: "2026-12-13T14:00:00",
    dateDisplay: "Dec 12 – Dec 13, 2026",
    duration: "Overnight Night Trek",
    vibe: "Trekking & Campfire",
    vibeCategory: "trek",
    difficulty: "Easy / Moderate",
    transportMode: "Local Train to Lonavala + Shared Jeep",
    budget: 1800,
    budgetDisplay: "₹1,800 / person",
    budgetBreakdown: { transport: 600, stay: 600, food: 600 },
    slots: { total: 12, booked: 9, remaining: 3 },
    host: {
      id: "host-tanmay",
      name: "Tanmay Joshi",
      role: "Dev @ Barclays",
      city: "Pune",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      tripsLed: 7,
      rating: 4.9,
      verified: true,
      bio: "Sahyadri weekend warrior. Passionate about night treks, local village homestays, and pithla bhakri."
    },
    squad: [
      { id: "sq-60", name: "Tanmay Joshi", role: "Host", city: "Pune", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" }
    ],
    coverImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
    gallery: ["https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800"],
    itinerary: [
      { day: 1, title: "Saturday Twilight Ascent", desc: "Catch local train to Lonavala, start 14 km scenic plateau hike as sun sets behind Duke's Nose.", icon: "moon" },
      { day: 2, title: "Sunrise at Shrivardhan Peak & Return", desc: "Summit Shrivardhan fort for 360-degree Sahyadri sunrise. Village breakfast of hot poha and chai, return to Pune by 2 PM.", icon: "sun" }
    ],
    inclusions: ["Village homestay / tent stay at Udhewadi", "Authentic rural Maharashtrian dinner (Pithla Bhakri)", "Morning hot breakfast and tea", "Trek leader & first aid"],
    exclusions: ["Local train ticket (₹20)", "Torch / headlamp batteries"],
    description: "The ultimate pocket-friendly weekend night trek for Pune and Mumbai students. Cool Sahyadri breezes, starry skies, and historic Maratha fortifications."
  },
  {
    id: "trip-hampi-08",
    title: "Hampi Bouldering & Hippie Island Cycle Squad",
    destination: "Hampi & Anegundi, Karnataka",
    originCity: "Bengaluru",
    pickupPoint: "Majestic Bus Stand / Yeshwantpur",
    startDate: "2027-01-08T22:00:00",
    endDate: "2027-01-11T06:00:00",
    dateDisplay: "Jan 08 – Jan 11, 2027",
    duration: "Long Weekend (2 Days, 1 Night + Travel)",
    vibe: "Culture & Heritage",
    vibeCategory: "culture",
    difficulty: "Easy / Chill",
    transportMode: "KSRTC Airavat AC Sleeper Bus",
    budget: 4500,
    budgetDisplay: "₹4,500 / person",
    budgetBreakdown: { transport: 2000, stay: 1400, food: 1100 },
    slots: { total: 8, booked: 5, remaining: 3 },
    host: {
      id: "host-dev",
      name: "Dev Roy",
      role: "Product Designer & Boulderer",
      city: "Bengaluru",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400",
      tripsLed: 5,
      rating: 4.8,
      verified: true,
      bio: "Hampi enthusiast who loves climbing giant granite boulders, coracle rides on Tungabhadra, and jamming at sunset point."
    },
    squad: [
      { id: "sq-70", name: "Dev Roy", role: "Host", city: "Bengaluru", avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400" }
    ],
    coverImage: "https://images.unsplash.com/photo-1600100397608-f010f4439c23?w=800",
    gallery: ["https://images.unsplash.com/photo-1600100397608-f010f4439c23?w=800"],
    itinerary: [
      { day: 1, title: "Friday Night Bus Departure", desc: "Board comfortable KSRTC sleeper bus from Majestic.", icon: "bus" },
      { day: 2, title: "Coracle Boat Ride & Sanapur Lake", desc: "Check in to riverside bamboo huts in Anegundi. Cliff jumping at Sanapur lake and bouldering at sunset point.", icon: "sun" },
      { day: 3, title: "Vijayanagara Ruins by Moped & Return", desc: "Rent mopeds to explore Vijaya Vittala temple and Lotus Mahal. Sunset at Matanga Hill, evening return bus.", icon: "compass" }
    ],
    inclusions: ["2 Days moped rental with helmet", "Riverside guest house stay in Anegundi", "Guided bouldering crash pad session", "Coracle boat ride on Tungabhadra"],
    exclusions: ["Bus tickets (booked together via KSRTC app)", "Cafe meals (Mango Tree / Laughing Buddha)"],
    description: "Immerse yourself in surreal boulder-strewn landscapes, ancient monolithic temples, coracle river rides, and magical sunset acoustic jams."
  }
];


/* =========================================================================
 * PHASE 4 APPEND: PLACES MOCK DATASET (THE DISCOVER VERTICAL)
 * Categories: food | places | fun
 * ========================================================================= */

const PLACES = [
  // --- FOOD CATEGORY ---
  {
    id: "place-food-blr-01",
    name: "V.V. Puram Food Street",
    category: "food",
    city: "Bengaluru",
    area: "Sajjan Rao Circle, VV Puram",
    priceRange: "₹80 - ₹250",
    priceLevel: 1,
    ratingPct: 96,
    reviewCount: 1420,
    popularity: 95,
    recencyDays: 2,
    userMatchPct: 94,
    upvotes: 842,
    downvotes: 28,
    tagline: "The nocturnal street food paradise with 20+ authentic vegetarian stalls",
    description: "A bustling vehicle-free culinary lane famous for crispy Congress bun maska, garlic roast butter dosas, piping hot badam milk, and curd kodubale. A rite of passage for students across South Bangalore.",
    reasonsWhy: [
      "Over 20 heritage food stalls packed into a 200m vehicle-free stretch",
      "Pocket-friendly prices under ₹200 for a feast of hot delicacies",
      "Legendary garlic roast dosa and gulab jamun made fresh right in front of you"
    ],
    timings: "5:30 PM – 1:30 AM (Daily)",
    address: "Old Tharagupet, Bengaluru, Karnataka 560004",
    tags: ["Late Night", "Street Food", "Pure Veg", "Must Visit", "Budget Eats"],
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"
    ],
    perks: ["Late night open till 1:30 AM", "UPI QR payments everywhere", "No seating hassle - walk and eat"]
  },
  {
    id: "place-food-pune-02",
    name: "Cafe Goodluck & Irani Chai Hub",
    category: "food",
    city: "Pune",
    area: "Deccan Gymkhana / FC Road",
    priceRange: "₹90 - ₹220",
    priceLevel: 1,
    ratingPct: 95,
    reviewCount: 1980,
    popularity: 93,
    recencyDays: 1,
    userMatchPct: 92,
    upvotes: 915,
    downvotes: 42,
    tagline: "Pune's oldest Irani cafe running strong since 1935",
    description: "Iconic meeting ground for Fergusson College students, writers, and techies. Renowned for its crusty bun maska dunked in special elaichi Irani chai, kheema pav, and signature caramel custard.",
    reasonsWhy: [
      "Original 1935 recipe bun maska with generous scoops of fresh white butter",
      "Spicy mutton kheema pav that has fueled Pune student generations",
      "Fast-moving tables, vibrant college banter, and pocket-friendly menu"
    ],
    timings: "7:00 AM – 11:30 PM (Daily)",
    address: "Fergusson College Rd, Deccan Gymkhana, Pune, Maharashtra 411004",
    tags: ["Student Legend", "Irani Chai", "Bun Maska", "Breakfast", "FC Road"],
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"
    ],
    perks: ["Authentic Irani ambiance", "Quick service under 5 mins", "Student hotspot for group discussions"]
  },
  {
    id: "place-food-del-03",
    name: "Moolchand Parantha Thikana",
    category: "food",
    city: "New Delhi",
    area: "Under Moolchand Metro, Lajpat Nagar",
    priceRange: "₹100 - ₹260",
    priceLevel: 1,
    ratingPct: 94,
    reviewCount: 2240,
    popularity: 96,
    recencyDays: 3,
    userMatchPct: 95,
    upvotes: 1120,
    downvotes: 55,
    tagline: "Late night hot tawa paranthas with melting butter and thick lassi",
    description: "Situated right beneath the Moolchand metro station, this roadside culinary landmark feeds night owls, students studying for exams, and road-trippers with smoking hot stuffed paranthas and mint chutney.",
    reasonsWhy: [
      "Crisp multi-layered egg-keema and paneer pyaaz paranthas",
      "Open well past 2:00 AM for student midnight hunger cravings",
      "Iconic sweet lassi served in earthen kulhad"
    ],
    timings: "9:00 AM – 3:00 AM (Daily)",
    address: "Metro Station, Lala Lajpat Rai Marg, Vikram Vihar, New Delhi 110024",
    tags: ["Late Night", "Paranthas", "Delhi Street Food", "Budget Eats", "Open Past Midnight"],
    img: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800",
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800"
    ],
    perks: ["Immediate metro accessibility", "Outdoor parking bench eating", "Open till 3:00 AM"]
  },
  {
    id: "place-food-mum-04",
    name: "Ashok Vada Pav & Sardar Pav Bhaji",
    category: "food",
    city: "Mumbai",
    area: "Kirti College Lane, Dadar & Tardeo",
    priceRange: "₹40 - ₹280",
    priceLevel: 1,
    ratingPct: 95,
    reviewCount: 2600,
    popularity: 97,
    recencyDays: 2,
    userMatchPct: 91,
    upvotes: 1280,
    downvotes: 60,
    tagline: "The golden standard of Mumbai street food since the 1960s",
    description: "Ashok Vada Pav's secret chura mixture and Sardar's slab of melting Amul butter floating on red spiced pav bhaji define the heart of authentic Bombay indulgence for college youth and office goers alike.",
    reasonsWhy: [
      "Exclusive proprietary spicy green chutney and crispy besan chura",
      "Fresh hot batches coming out every 90 seconds",
      "Unmatched authentic Mumbai street flavor at an unbeatable price"
    ],
    timings: "11:00 AM – 10:30 PM (Daily)",
    address: "Off Cadel Road, Kirti College Lane, Prabhadevi, Mumbai 400028",
    tags: ["Mumbai Legend", "Vada Pav", "Pav Bhaji", "Quick Bite", "Must Visit"],
    img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800",
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800"
    ],
    perks: ["Iconic celebrity favorite", "Ready in 60 seconds", "Pocket money friendly"]
  },
  {
    id: "place-food-blr-05",
    name: "CTR (Shri Sagar) Benne Masala Dosa",
    category: "food",
    city: "Bengaluru",
    area: "7th Cross, Margosa Road, Malleshwaram",
    priceRange: "₹70 - ₹180",
    priceLevel: 1,
    ratingPct: 97,
    reviewCount: 3100,
    popularity: 98,
    recencyDays: 1,
    userMatchPct: 96,
    upvotes: 1540,
    downvotes: 35,
    tagline: "Crispy on the outside, cloud-soft inside with golden pure butter",
    description: "Central Tiffin Room (CTR) in historic Malleshwaram is the holy shrine of Benne Masala Dosa in India. Served piping hot with coconut mint chutney and aromatic filter coffee poured from brass tumblers.",
    reasonsWhy: [
      "Signature crispy red crust with fluffy, porous interior soaked in butter",
      "Unrivaled filter kaapi that sets the mood for weekend study marathons",
      "Over 100 years of unbroken culinary tradition"
    ],
    timings: "7:00 AM – 12:30 PM, 4:00 PM – 9:30 PM",
    address: "7th Cross Road, Margosa Rd, Malleshwaram, Bengaluru 560003",
    tags: ["Heritage Dosa", "Filter Coffee", "Malleshwaram", "Top Rated", "Breakfast"],
    img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800"
    ],
    perks: ["Authentic heritage setting", "Consistent taste for decades", "Top ranked breakfast spot"]
  },
  {
    id: "place-food-jai-06",
    name: "Rawat Mishthan Bhandar & Pyaaz Kachori",
    category: "food",
    city: "Jaipur",
    area: "Station Road, Sindhi Camp",
    priceRange: "₹60 - ₹200",
    priceLevel: 1,
    ratingPct: 93,
    reviewCount: 2450,
    popularity: 91,
    recencyDays: 4,
    userMatchPct: 90,
    upvotes: 890,
    downvotes: 45,
    tagline: "The undisputable world capital of flaky, spicy Pyaaz Kachoris",
    description: "No student trip or hostel homecoming in Jaipur is complete without boxes of Rawat's fiery, flaky pyaaz kachoris paired with sweet tamarind chutney, mawa kachoris, and thick kesar lassi.",
    reasonsWhy: [
      "Gigantic flaky kachoris stuffed with caramelized spicy onion filling",
      "Fresh frying round the clock ensures warm crispiness every single order",
      "Famous sweet mawa kachori dripping in fragrant saffron syrup"
    ],
    timings: "6:30 AM – 10:30 PM (Daily)",
    address: "Station Road, Opposite Polo Victory Cinema, Sindhi Camp, Jaipur 302001",
    tags: ["Jaipur Specialty", "Pyaaz Kachori", "Spicy Snacks", "Heritage Sweet Shop"],
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800"
    ],
    perks: ["Directly opposite central bus terminal", "Bulk packaging for train travels", "Fast token counter"]
  },
  {
    id: "place-food-del-07",
    name: "Tom Uncle Maggi Point",
    category: "food",
    city: "New Delhi",
    area: "Chhatra Marg, North Campus DU",
    priceRange: "₹60 - ₹160",
    priceLevel: 1,
    ratingPct: 92,
    reviewCount: 1670,
    popularity: 90,
    recencyDays: 2,
    userMatchPct: 96,
    upvotes: 790,
    downvotes: 52,
    tagline: "The legendary North Campus student hangout with 50+ Maggi varieties",
    description: "A beloved staple for Delhi University students since 1978. Serving steaming plates of cheese butter masala maggi, peri peri maggi, masala soda, and cold coffee during college breaks and exam weeks.",
    reasonsWhy: [
      "Over 50 inventive styles of Maggi cooked with secret spices",
      "Unrivaled student vibes right in the center of DU North Campus",
      "Super economical prices that fit any college student pocket"
    ],
    timings: "10:00 AM – 10:00 PM (Daily)",
    address: "Near Ramjas College, University Enclave, New Delhi 110007",
    tags: ["DU North Campus", "Maggi Point", "Student Hotspot", "Budget Snack", "Quick Bite"],
    img: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=800",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"
    ],
    perks: ["DU student discounts", "Shaded outdoor seating benches", "Fast college meetup zone"]
  },
  {
    id: "place-food-hyd-08",
    name: "Shah Ghouse & Pista House Haleem",
    category: "food",
    city: "Hyderabad",
    area: "Tolichowki / Charminar",
    priceRange: "₹140 - ₹380",
    priceLevel: 2,
    ratingPct: 96,
    reviewCount: 3800,
    popularity: 98,
    recencyDays: 1,
    userMatchPct: 95,
    upvotes: 1680,
    downvotes: 48,
    tagline: "Aromatic slow-cooked mutton dum biryani and GI-tagged royal haleem",
    description: "The crown jewel of Hyderabadi culinary royalty. Long grain Basmati rice infused with whole spices and tender meat, crowned with fried onions and accompanied by authentic mirchi ka salan and dahi chutney.",
    reasonsWhy: [
      "Slow firewood dum cooking technique preserves intense aromas",
      "Generous student portions easily shared among flatmates",
      "Irani chai and Osmania biscuits served on the bustling street counter"
    ],
    timings: "11:30 AM – 1:30 AM (Daily)",
    address: "Opposite Bio Diversity Park, Gachibowli & Tolichowki, Hyderabad 500008",
    tags: ["Dum Biryani", "Hyderabadi", "Late Night", "Non-Veg Feast", "Group Meal"],
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800",
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800"
    ],
    perks: ["Late night dining till 1:30 AM", "Giant sharing portions", "Authentic spice blend"]
  },
  {
    id: "place-food-kol-09",
    name: "Kusum Rolls & Arsalan Royal Biryani",
    category: "food",
    city: "Kolkata",
    area: "Park Street & Marina Lane",
    priceRange: "₹70 - ₹290",
    priceLevel: 1,
    ratingPct: 94,
    reviewCount: 2750,
    popularity: 92,
    recencyDays: 2,
    userMatchPct: 93,
    upvotes: 1140,
    downvotes: 56,
    tagline: "Kolkata's iconic flaky laccha paratha kathi rolls and fragrant biryani with aloo",
    description: "Park Street's street food institution. Flaky handmade parathas wrapped around juicy spiced chicken skewers, fried onions, and green chilies, finished with a dash of lime and chaat masala.",
    reasonsWhy: [
      "The birthplace of Kolkata's legendary double-egg chicken kathi roll",
      "Crisp, flaky paratha fried with precision on gigantic flat cast iron tawas",
      "Unmatched flavor profile that is quick, filling, and incredibly cheap"
    ],
    timings: "11:00 AM – 11:30 PM (Daily)",
    address: "21 Karnani Mansion, Park Street, Kolkata, West Bengal 700016",
    tags: ["Kathi Roll", "Park Street", "Kolkata Street Food", "Quick Bite", "Student Favorite"],
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800"
    ],
    perks: ["Central Park Street location", "Ready in under 3 minutes", "Grab and walk snack"]
  },
  {
    id: "place-food-chn-10",
    name: "Murugan Idli Shop & Ghee Podi Dosa",
    category: "food",
    city: "Chennai",
    area: "GN Chetty Road, T. Nagar",
    priceRange: "₹80 - ₹240",
    priceLevel: 1,
    ratingPct: 95,
    reviewCount: 2890,
    popularity: 94,
    recencyDays: 3,
    userMatchPct: 92,
    upvotes: 1290,
    downvotes: 44,
    tagline: "Melt-in-mouth steaming hot idlis drenched in spicy gun powder and pure ghee",
    description: "Famous across Tamil Nadu for cloud-soft mallipoo idlis served on fresh green banana leaves with four distinct varieties of homemade chutneys and piping hot drumstick sambar.",
    reasonsWhy: [
      "Signature spicy podi mixed with pure aromatic melted ghee over soft idlis",
      "Four authentic unlimited chutneys: coconut, coriander, tomato, and mint",
      "Refreshing Madurai-style cold Jigarthanda dessert"
    ],
    timings: "7:00 AM – 11:00 PM (Daily)",
    address: "46/1 GN Chetty Rd, T. Nagar, Chennai, Tamil Nadu 600017",
    tags: ["South Indian", "Podi Idli", "T Nagar", "Unlimited Chutneys", "Comfort Food"],
    img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800"
    ],
    perks: ["Authentic banana leaf dining", "Unlimited refills of sambar & chutney", "Fast table turnover"]
  },
  {
    id: "place-food-blr-11",
    name: "Rameshwaram Cafe Indiranagar",
    category: "food",
    city: "Bengaluru",
    area: "12th Main Rd, HAL 2nd Stage, Indiranagar",
    priceRange: "₹90 - ₹260",
    priceLevel: 1,
    ratingPct: 96,
    reviewCount: 4200,
    popularity: 99,
    recencyDays: 1,
    userMatchPct: 95,
    upvotes: 1920,
    downvotes: 72,
    tagline: "The fastest moving ghee tiffin experience active till 2:00 AM",
    description: "Bangalore's viral phenomenon known for generous ladles of pure desi ghee poured over thick thatte idlis, open masala dosas, and crispy vada, accompanied by hot filter coffee and spicy garlic chutney.",
    reasonsWhy: [
      "Open till 2:00 AM for late-night engineers, designers, and college students",
      "Ghee podi thatte idlis so soft they dissolve immediately",
      "Electrifying high-energy open kitchen and lightning fast order tokens"
    ],
    timings: "6:30 AM – 2:00 AM (Daily)",
    address: "2984, 12th Main Rd, Indiranagar, Bengaluru 560008",
    tags: ["Late Night", "Ghee Dosa", "Indiranagar", "Top Rated", "Fast Food"],
    img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800",
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800"
    ],
    perks: ["Open till 2:00 AM", "UPI token pickup under 4 mins", "Unfiltered filter coffee"]
  },
  {
    id: "place-food-pune-12",
    name: "Vaishali & F.C. Road SPDP Point",
    category: "food",
    city: "Pune",
    area: "Fergusson College Road, Shivajinagar",
    priceRange: "₹80 - ₹240",
    priceLevel: 1,
    ratingPct: 94,
    reviewCount: 3200,
    popularity: 94,
    recencyDays: 2,
    userMatchPct: 93,
    upvotes: 1380,
    downvotes: 52,
    tagline: "The undisputed epicenter of Pune's college cafe culture",
    description: "Under the shade of sprawling trees on FC Road, Vaishali has witnessed decades of college romances, startup ideations, and lively political debates over plates of crisp SPDP, Mysore masala dosa, and cold coffee.",
    reasonsWhy: [
      "The iconic SPDP (Sev Potato Dahi Puri) with sweet-tangy curd balance",
      "Open courtyard seating under canopy trees with pure student buzz",
      "Exceptional filter coffee and crispy cheese onion uthappam"
    ],
    timings: "7:00 AM – 11:00 PM (Daily)",
    address: "1218/1, FC Rd, Shivajinagar, Pune, Maharashtra 411004",
    tags: ["Pune Icon", "SPDP", "Courtyard Vibe", "College Landmark", "Veg Eatery"],
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800"
    ],
    perks: ["Vibrant garden seating", "Pocket money pricing", "Central location next to campuses"]
  },

  // --- PLACES CATEGORY (Attractions, Parks, Heritage, Sunset Points) ---
  {
    id: "place-spots-blr-01",
    name: "Cubbon Park & Heritage Reading Circle",
    category: "places",
    city: "Bengaluru",
    area: "Kasturba Road, Sampangi Rama Nagara",
    priceRange: "Free Entry",
    priceLevel: 1,
    ratingPct: 97,
    reviewCount: 3400,
    popularity: 98,
    recencyDays: 1,
    userMatchPct: 97,
    upvotes: 1720,
    downvotes: 30,
    tagline: "300 acres of lush bamboo groves, dog parks, and silent weekend book clubs",
    description: "The emerald heart of Bangalore. Vehicles are banned on weekends, turning the historic park into a sanctuary for joggers, acoustic musicians, silent reading clubs ('Cubbon Reads'), and lazy Sunday picnics under colonial canopies.",
    reasonsWhy: [
      "Over 6,000 species of trees and flora with shady running avenues",
      "The home of 'Cubbon Reads' - join hundreds reading peacefully on grass",
      "Completely free entry with zero commercial noise"
    ],
    timings: "6:00 AM – 7:00 PM (Vehicles banned Sundays)",
    address: "Kasturba Rd, Behind High Court, Bengaluru 560001",
    tags: ["Green Lung", "Free Entry", "Picnic Spot", "Reading Club", "Dog Friendly"],
    img: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
    ],
    perks: ["Metro station right at park gate", "Free entry for everyone", "Open outdoor workout zones"]
  },
  {
    id: "place-spots-del-02",
    name: "Sunder Nursery Heritage Park & Lake",
    category: "places",
    city: "New Delhi",
    area: "Nizamuddin, Near Humayun's Tomb",
    priceRange: "₹50 entry",
    priceLevel: 1,
    ratingPct: 96,
    reviewCount: 2900,
    popularity: 96,
    recencyDays: 2,
    userMatchPct: 95,
    upvotes: 1450,
    downvotes: 40,
    tagline: "Delhi's Central Park with 16th-century Mughal monuments and tranquil water mirrors",
    description: "A breathtaking UNESCO-accredited heritage restoration covering 90 acres. Features Mughal-era pavilions, amphitheaters, organic weekend farmers' markets, flower beds, and a serene lake where students relax with books and chai.",
    reasonsWhy: [
      "Restored 16th-century monuments juxtaposed with manicured lawns",
      "Weekend farmer market with artisanal sourdough and cold pressed juices",
      "Quiet shaded amphitheater steps perfect for group study or photography"
    ],
    timings: "7:00 AM – 9:00 PM (Daily)",
    address: "Bharat Scouts and Guides Marg, Nizamuddin, New Delhi 110013",
    tags: ["Heritage", "Mughal Architecture", "Picnic Spot", "Peaceful", "Photography"],
    img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800"
    ],
    perks: ["Student discount tickets", "Clean washrooms & drinking water", "FabCafe inside park grounds"]
  },
  {
    id: "place-spots-jai-03",
    name: "Nahargarh Fort & Padao Sunset Point",
    category: "places",
    city: "Jaipur",
    area: "Krishna Nagar, Brahampuri, Aravalli Hills",
    priceRange: "₹50 - ₹100",
    priceLevel: 1,
    ratingPct: 95,
    reviewCount: 3100,
    popularity: 95,
    recencyDays: 3,
    userMatchPct: 94,
    upvotes: 1380,
    downvotes: 48,
    tagline: "The highest panoramic sunset view over the Amber and Pink City rooftops",
    description: "Perched dramatically on the jagged crest of the Aravalli hills, Nahargarh ('Abode of Tigers') offers awe-inspiring sunset vistas. College groups flock here for the windy rooftop cafes and golden hour photography.",
    reasonsWhy: [
      "Panoramic 360-degree views of Jaipur lighting up at dusk",
      "Scenic winding ghat bike ride up the Aravalli hills",
      "Historic stepwell (Baori) featured in iconic Bollywood films"
    ],
    timings: "10:00 AM – 10:00 PM (Daily)",
    address: "Nahargarh Fort, Brahampuri, Jaipur, Rajasthan 302002",
    tags: ["Sunset Point", "Aravalli Hills", "Panoramic View", "Roadtrip Ride", "Heritage Fort"],
    img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800"
    ],
    perks: ["Open till late evening 10 PM", "Spectacular photography spot", "Affordable student entry"]
  },
  {
    id: "place-spots-pune-04",
    name: "Sinhagad Fort Sunrise Trek & Cloud Point",
    category: "places",
    city: "Pune",
    area: "Thoptewadi, Sinhagad Ghat",
    priceRange: "₹50 - ₹100",
    priceLevel: 1,
    ratingPct: 96,
    reviewCount: 3500,
    popularity: 97,
    recencyDays: 1,
    userMatchPct: 96,
    upvotes: 1620,
    downvotes: 38,
    tagline: "Pune's sacred weekend sunrise trek with piping hot pitla bhakri",
    description: "Located 30km from central Pune, Sinhagad rises 1300m above sea level. Students conquer the steep stone trail before dawn to watch the sunrise pierce through monsoon mist, followed by rustic hot kanda bhaji and taak.",
    reasonsWhy: [
      "Invigorating 1.5-hour trek with refreshing mountain breeze and cloud cover",
      "Authentic rural Maharashtrian breakfast: Pitla Bhakri and Thecha made on chulhas",
      "Deep Maratha historical significance and breathtaking valley drops"
    ],
    timings: "5:00 AM – 6:00 PM (Daily)",
    address: "Sinhagad Ghat Rd, Thoptewadi, Maharashtra 411025",
    tags: ["Weekend Trek", "Sunrise View", "Pitla Bhakri", "Cloud Walk", "Nature"],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800"
    ],
    perks: ["Early 5 AM opening for sunrise catchers", "Direct PMPML bus connection", "Fresh homemade village food"]
  },
  {
    id: "place-spots-mum-05",
    name: "Marine Drive Promenade & Queen's Necklace",
    category: "places",
    city: "Mumbai",
    area: "Netaji Subhash Chandra Bose Road, South Mumbai",
    priceRange: "Free Entry",
    priceLevel: 1,
    ratingPct: 98,
    reviewCount: 5200,
    popularity: 99,
    recencyDays: 1,
    userMatchPct: 98,
    upvotes: 2450,
    downvotes: 42,
    tagline: "The timeless 3.6km C-shaped coastal promenade that never sleeps",
    description: "The ultimate egalitarian space in Mumbai. Sitting on the concrete tetrapods, watching the Arabian Sea waves crash against the promenade while city lights sparkle along the arc of Back Bay. Midnight chai wallahs and cool sea breezes make it therapeutic.",
    reasonsWhy: [
      "Free public sanctuary active 24/7 with zero commercial barriers",
      "Mesmerizing sea breeze and sunset views over the Arabian Sea",
      "Safe, well-lit corridor for midnight conversations and contemplation"
    ],
    timings: "Open 24 Hours (Best after 6:00 PM)",
    address: "Netaji Subhash Chandra Bose Rd, Churchgate, Mumbai 400020",
    tags: ["24x7 Open", "Free Entry", "Sea Breeze", "Iconic Mumbai", "Midnight Chill"],
    img: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"
    ],
    perks: ["Open 24 hours everyday", "Walking distance from Churchgate station", "Safe police patrolled avenue"]
  },
  {
    id: "place-spots-del-06",
    name: "Hauz Khas Fort & Deer Park Lake",
    category: "places",
    city: "New Delhi",
    area: "Hauz Khas Village, South Delhi",
    priceRange: "₹25 entry",
    priceLevel: 1,
    ratingPct: 93,
    reviewCount: 3100,
    popularity: 93,
    recencyDays: 3,
    userMatchPct: 94,
    upvotes: 1210,
    downvotes: 62,
    tagline: "13th-century stone madrasa ruins overlooking a sparkling urban reservoir",
    description: "Where Delhi's medieval history collides with vibrant modern youth culture. Explore the stone pavilions, arches, and graves of Alauddin Khilji's royal reservoir, then walk through the adjacent deer park or bohemian Hauz Khas Village cafes.",
    reasonsWhy: [
      "Picturesque stone arches and corridors overlooking the lake at sunset",
      "Right next to HKV's independent art galleries, bookstores, and cafes",
      "Serene walking loop around the lake inside Deer Park"
    ],
    timings: "7:00 AM – 7:00 PM (Daily)",
    address: "Hauz Khas Village, Deer Park, New Delhi 110016",
    tags: ["Heritage Ruins", "Lake View", "Sunset Spot", "HKV Village", "Photography"],
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800"
    ],
    perks: ["Affordable ₹25 student ticket", "Directly beside boutique cafes", "Stunning golden hour light"]
  },
  {
    id: "place-spots-blr-07",
    name: "Nandi Hills Sunrise & Sea of Clouds",
    category: "places",
    city: "Bengaluru",
    area: "Chikkaballapur District (60km from city)",
    priceRange: "₹50 entry",
    priceLevel: 1,
    ratingPct: 94,
    reviewCount: 4600,
    popularity: 96,
    recencyDays: 1,
    userMatchPct: 95,
    upvotes: 1840,
    downvotes: 75,
    tagline: "The classic 4 AM motorcycle roadtrip to catch clouds rolling beneath your feet",
    description: "An ancient hill fortress 4,851 feet above sea level. The quintessential weekend ritual for every Bangalore college student: waking up at 3:30 AM, riding through chilly pre-dawn mist, and sipping roadside ginger chai as the sun emerges above a sea of clouds.",
    reasonsWhy: [
      "Spectacular inversion layer creating a realistic 'sea of clouds'",
      "Exhilarating early morning road trip and winding hairpin curves",
      "Historic Tipu's Drop and colonial British summer bungalows"
    ],
    timings: "6:00 AM – 6:00 PM (Gates open 6:00 AM sharp)",
    address: "Nandi Hills, Chikkaballapur, Karnataka 562103",
    tags: ["Weekend Ride", "Sunrise Spot", "Sea of Clouds", "Bangalore Ritual", "Adventure"],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800"
    ],
    perks: ["Pre-dawn convoy rides", "Chilly mountain temperature", "Delicious roadside omelettes"]
  },

  // --- FUN CATEGORY (Activities, Gaming, Arcades, Adventure, Cafes) ---
  {
    id: "place-fun-blr-01",
    name: "The Board Game Den & Guild Cafe",
    category: "fun",
    city: "Bengaluru",
    area: "5th Block, Koramangala",
    priceRange: "₹150 - ₹350",
    priceLevel: 1,
    ratingPct: 96,
    reviewCount: 1850,
    popularity: 94,
    recencyDays: 1,
    userMatchPct: 96,
    upvotes: 890,
    downvotes: 24,
    tagline: "Over 450+ tabletop games, D&D campaigns, and artisanal coffee",
    description: "Escape screen fatigue in Koramangala. A warm, welcoming board game lounge where Game Gurus explain rules in 3 minutes for Catan, Ticket to Ride, Secret Hitler, and Wingspan while you sip pour-over coffee with flatmates.",
    reasonsWhy: [
      "Massive library of 450+ modern board and strategy games",
      "On-demand Game Gurus who teach you any game without reading rulebooks",
      "Cosy loft seating with zero time pressure and friendly college crowds"
    ],
    timings: "11:30 AM – 11:00 PM (Daily)",
    address: "80 Feet Rd, 5th Block, Koramangala, Bengaluru 560095",
    tags: ["Board Games", "Cozy Cafe", "Group Fun", "Screen Free", "Koramangala"],
    img: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800"
    ],
    perks: ["Student discount on weekdays", "Solo players matched with tables", "Unlimited playtime passes"]
  },
  {
    id: "place-fun-del-02",
    name: "Mystery Rooms Live Escape Quest",
    category: "fun",
    city: "New Delhi",
    area: "Connaught Place (M Block) & Rajouri Garden",
    priceRange: "₹600 - ₹950",
    priceLevel: 2,
    ratingPct: 95,
    reviewCount: 2200,
    popularity: 93,
    recencyDays: 2,
    userMatchPct: 93,
    upvotes: 940,
    downvotes: 35,
    tagline: "Heart-pounding 60-minute real-life escape adventures with Hollywood set design",
    description: "Locked in a themed chamber, you and your squad have exactly 60 minutes to crack ciphers, locate hidden doors, and disarm ticking bombs. Missions range from 'The Hurt Locker' to 'Lockout: A Prison Break'.",
    reasonsWhy: [
      "Intricate mechanical puzzles, laser triggers, and high-tech secrets",
      "Thrilling team bonding experience that tests everyone's logic under pressure",
      "Multiple difficulty ratings suitable for beginners to escape veterans"
    ],
    timings: "11:00 AM – 11:00 PM (Daily)",
    address: "M-Block, Outer Circle, Connaught Place, New Delhi 110001",
    tags: ["Escape Room", "Puzzles", "Adrenaline", "Team Bonding", "Connaught Place"],
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800",
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800"
    ],
    perks: ["College group discounts (15% off)", "Instant team commemorative polaroid", "Air-conditioned indoor fun"]
  },
  {
    id: "place-fun-mum-03",
    name: "Smaaash Electric Go-Karting & Arcade",
    category: "fun",
    city: "Mumbai",
    area: "Kamala Mills Compound, Lower Parel",
    priceRange: "₹500 - ₹1,200",
    priceLevel: 2,
    ratingPct: 94,
    reviewCount: 3100,
    popularity: 96,
    recencyDays: 2,
    userMatchPct: 92,
    upvotes: 1350,
    downvotes: 55,
    tagline: "Multi-level indoor electric kart track with instantaneous torque and neon lighting",
    description: "The ultimate entertainment hub in Lower Parel. Features high-speed electric go-karts racing across banked chicanes, 360-degree VR flight simulators, twilight bowling lanes, and arcade dance-offs.",
    reasonsWhy: [
      "Multi-tiered indoor racing track with electronic lap timing monitors",
      "Zero fume, high-torque electric karts that reach top speeds in seconds",
      "Twilight bowling lanes with upbeat DJ music and party vibes"
    ],
    timings: "1:00 PM – Midnight (Daily)",
    address: "Gate 4, Kamala Mills Compound, Lower Parel, Mumbai 400013",
    tags: ["Go Karting", "Arcade Games", "Bowling", "VR Simulators", "High Energy"],
    img: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800"
    ],
    perks: ["Student happy hours on Wednesdays", "Pro racing helmets & safety gear", "All-in-one game card passes"]
  },
  {
    id: "place-fun-blr-04",
    name: "Play Arena Multi-Sports & Paintball Hub",
    category: "fun",
    city: "Bengaluru",
    area: "Kasavanahalli, Sarjapur Road",
    priceRange: "₹250 - ₹800",
    priceLevel: 2,
    ratingPct: 95,
    reviewCount: 3800,
    popularity: 95,
    recencyDays: 3,
    userMatchPct: 94,
    upvotes: 1480,
    downvotes: 46,
    tagline: "30+ sports including tactical woodsball paintball, skatepark, and climbing walls",
    description: "Spread over 10 sprawling acres on Sarjapur Road, Play Arena is Bangalore's premier adventure sports playground. Compete in tactical paintball wars, conquer 50-foot climbing pinnacles, or skate the half-pipe with friends.",
    reasonsWhy: [
      "Realistic military obstacle course for outdoor paintball matches",
      "Olympic-grade artificial turf for 5v5 midnight football tournaments",
      "Bowling, laser tag, and dirt go-karts all under one open sky roof"
    ],
    timings: "6:00 AM – 11:00 PM (Daily)",
    address: "Silverwood Regency Apartment Rd, Kasavanahalli, Bengaluru 560035",
    tags: ["Paintball", "Adventure", "Skatepark", "Laser Tag", "Sarjapur"],
    img: "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?w=800",
      "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=800"
    ],
    perks: ["Group squad packages", "On-site food courts & craft cafe", "Gear rentals included"]
  },
  {
    id: "place-fun-pune-05",
    name: "High Spirits Cafe & Indie Music Sundays",
    category: "fun",
    city: "Pune",
    area: "Lane 6, Koregaon Park",
    priceRange: "₹300 - ₹900",
    priceLevel: 2,
    ratingPct: 97,
    reviewCount: 2950,
    popularity: 98,
    recencyDays: 1,
    userMatchPct: 97,
    upvotes: 1590,
    downvotes: 32,
    tagline: "The beating heart of Pune's live indie music and legendary Cookout Sundays",
    description: "An institution in Koregaon Park. Known for intimate open-air gigs featuring India's best indie rock bands, stand-up comedy nights, student-friendly prices, and Sunday Cookouts with live barbecues and acoustic jams.",
    reasonsWhy: [
      "Electric, unpretentious vibes with live indie rock, reggae, and hip-hop",
      "Legendary 'High Cookout' every Sunday with unlimited grills and craft drinks",
      "Fair student entry pricing that respects young creative budgets"
    ],
    timings: "8:00 PM – 1:30 AM (Cookout Sundays 1:30 PM – 5:00 PM)",
    address: "35A, 1, N Main Rd, Koregaon Park, Pune, Maharashtra 411001",
    tags: ["Live Music", "Indie Gigs", "Koregaon Park", "Nightlife", "Student Hotspot"],
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800"
    ],
    perks: ["Student ID discounts", "Outdoor tree-canopy dance floor", "Safe community atmosphere"]
  },
  {
    id: "place-fun-pune-06",
    name: "Koregaon Park Artisan Pottery & Clay Studio",
    category: "fun",
    city: "Pune",
    area: "North Main Road, Koregaon Park",
    priceRange: "₹450 - ₹850",
    priceLevel: 2,
    ratingPct: 94,
    reviewCount: 1420,
    popularity: 91,
    recencyDays: 3,
    userMatchPct: 93,
    upvotes: 720,
    downvotes: 28,
    tagline: "Mindful pottery wheel sessions, handmade terracotta glazing, and herbal teas",
    description: "A tranquil rustic garden sanctuary where students de-stress from deadlines and exams. Master the potter's wheel, shape terracotta mugs or bowls, and enjoy relaxing conversations in a sun-dappled courtyard.",
    reasonsWhy: [
      "Guided 90-minute wheel throwing workshop with all clay and firing included",
      "Take your baked and glazed ceramic creations home as a keepsake",
      "Peaceful therapeutic environment that completely melts academic stress away"
    ],
    timings: "10:30 AM – 7:30 PM (Closed Mondays)",
    address: "Lane 5, Koregaon Park, Pune, Maharashtra 411001",
    tags: ["Pottery Studio", "Mindfulness", "Creative Workshop", "De-stress", "Crafts"],
    img: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800",
    gallery: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800",
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800"
    ],
    perks: ["All materials provided", "Beginner-friendly instructors", "Complementary herbal infusion tea"]
  }
];

/* === 15. IN-APP CHATS MOCK DATA (PHASE 5) === */
const CHATS = [
  {
    id: "chat-01",
    name: "Aarav Sharma",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&auto=format&fit=crop&q=80",
    role: "Frontend Engineer @ Swiggy",
    city: "Bengaluru",
    verified: true,
    online: true,
    contextTag: "Stay • HSR 2BHK Flat Share",
    lastMessage: "Sounds good! Can we split the deposit 50-50?",
    time: "10:42 AM",
    unread: 2,
    messages: [
      {
        id: "m-101",
        sender: "them",
        text: "Hey Rohan! Saw your roommate profile. Are you still looking for a flatmate in HSR Sector 2?",
        time: "10:30 AM",
        status: "read"
      },
      {
        id: "m-102",
        sender: "me",
        text: "Hey Aarav! Yes, looking to shift by next month. The place has 24/7 power backup and high-speed fiber.",
        time: "10:34 AM",
        status: "read"
      },
      {
        id: "m-103",
        sender: "them",
        text: "Awesome! Can we split the deposit details and discuss the owner agreement?",
        time: "10:38 AM",
        status: "read"
      },
      {
        id: "m-104",
        sender: "me",
        text: "No worries, we can use the JhoomRahi Masked Call button above or chat here!",
        time: "10:40 AM",
        status: "read"
      },
      {
        id: "m-105",
        sender: "them",
        text: "Sounds good! Can we split the deposit 50-50?",
        time: "10:42 AM",
        status: "delivered"
      }
    ]
  },
  {
    id: "chat-02",
    name: "Tanvi Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
    role: "B.Tech Final Year, MNIT Jaipur",
    city: "Jaipur",
    verified: true,
    online: true,
    contextTag: "Campus • Pushkar Weekend Trip",
    lastMessage: "Should we rent a self-drive Thar or take the sleeper bus?",
    time: "Yesterday",
    unread: 0,
    messages: [
      {
        id: "m-201",
        sender: "them",
        text: "Hey, 3 of us from MNIT are heading to Pushkar this Saturday. Saw you were interested in weekend road trips!",
        time: "Yesterday, 4:15 PM",
        status: "read"
      },
      {
        id: "m-202",
        sender: "me",
        text: "Awesome! Yes, count me in if the budget split is around ₹3.5k.",
        time: "Yesterday, 4:20 PM",
        status: "read"
      },
      {
        id: "m-203",
        sender: "them",
        text: "Should we rent a self-drive Thar or take the sleeper bus?",
        time: "Yesterday, 4:28 PM",
        status: "read"
      }
    ]
  },
  {
    id: "chat-03",
    name: "Kabir Malhotra",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    role: "Product Designer @ Zomato",
    city: "Gurugram",
    verified: true,
    online: false,
    contextTag: "Travel • Spiti Expedition 2026",
    lastMessage: "Packing list shared in the community group!",
    time: "Nov 4",
    unread: 0,
    messages: [
      {
        id: "m-301",
        sender: "them",
        text: "Hey Rohan, making sure everyone has high-altitude sickness meds and thermal layers for Kaza.",
        time: "Nov 4, 11:15 AM",
        status: "read"
      },
      {
        id: "m-302",
        sender: "them",
        text: "Packing list shared in the community group!",
        time: "Nov 4, 11:16 AM",
        status: "read"
      }
    ]
  },
  {
    id: "chat-04",
    name: "Priya Nair",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    role: "UX Researcher @ Zepto",
    city: "Bengaluru",
    verified: true,
    online: false,
    contextTag: "Stay • Koramangala 1BHK",
    lastMessage: "Visiting the flat tomorrow at 11 AM.",
    time: "Nov 2",
    unread: 0,
    messages: [
      {
        id: "m-401",
        sender: "them",
        text: "Hi Rohan! The Koramangala landlord confirmed we can come inspect the 2BHK terrace flat.",
        time: "Nov 2, 5:45 PM",
        status: "read"
      },
      {
        id: "m-402",
        sender: "them",
        text: "Visiting the flat tomorrow at 11 AM.",
        time: "Nov 2, 6:00 PM",
        status: "read"
      }
    ]
  },
  {
    id: "chat-05",
    name: "Devika & Squad",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    role: "Sinhagad Sunrise Trek Group (5)",
    city: "Pune",
    verified: true,
    online: true,
    contextTag: "Discover • Sinhagad Sunrise Trek",
    lastMessage: "Meeting point: Chandni Chowk McD at 5:00 AM sharp!",
    time: "Oct 30",
    unread: 0,
    messages: [
      {
        id: "m-501",
        sender: "them",
        text: "Hey everyone! Weather forecast is crisp and clear for the Sunday sunrise trek.",
        time: "Oct 30, 8:10 PM",
        status: "read"
      },
      {
        id: "m-502",
        sender: "them",
        text: "Meeting point: Chandni Chowk McD at 5:00 AM sharp!",
        time: "Oct 30, 8:12 PM",
        status: "read"
      }
    ]
  }
];

/* === 16. COMMUNITIES & SOCIAL FEED DATA (PHASE 5) === */
const COMMUNITIES = [
  {
    id: "comm-mnit",
    name: "MNIT Jaipur Students",
    category: "Campus Tribe",
    city: "Jaipur",
    members: 2840,
    membersDisplay: "2.8k members",
    avatar: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200",
    coverImg: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    description: "Official student hub for MNITians: hostel room tips, exam prep banter, project team finders, and weekend Aravali drives.",
    isJoined: true,
    rules: ["Respect peers", "No promotional spam", "Strictly no brokerage posts"],
    posts: [
      {
        id: "post-mnit-1",
        author: {
          name: "Tanvi Sharma",
          role: "B.Tech Final Year, MNIT",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
          verified: true
        },
        timeAgo: "2 hours ago",
        content: "Anyone heading from VLTC to Raja Park this evening? Looking to carpool or split an auto. Also looking for 6th sem Signal Processing handwritten notes! 📚☕",
        likes: 18,
        isLiked: false,
        commentsCount: 6,
        tags: ["#Carpool", "#Academics", "#RajaPark"]
      },
      {
        id: "post-mnit-2",
        author: {
          name: "Vikas Meena",
          role: "Civil Engg '25",
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
          verified: false
        },
        timeAgo: "5 hours ago",
        content: "Selling my study desk + ergonomic mesh chair as I am moving into a shared 2BHK flat near Tonk Road. ₹2,200 for both. DM me directly on JhoomRahi chat!",
        likes: 12,
        isLiked: true,
        commentsCount: 4,
        tags: ["#CampusMarket", "#HostelShift"]
      }
    ]
  },
  {
    id: "comm-blr-techies",
    name: "Bengaluru Techies",
    category: "City Chapter",
    city: "Bengaluru",
    members: 14200,
    membersDisplay: "14.2k members",
    avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200",
    coverImg: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800",
    description: "Young developers, designers, and founders across HSR, Koramangala, and Indiranagar. Tech meetups, hackathons, and flatmate matching.",
    isJoined: true,
    rules: ["Tech & lifestyle discussion only", "No recruiters spamming DMs", "Be collaborative"],
    posts: [
      {
        id: "post-blr-1",
        author: {
          name: "Aarav Sharma",
          role: "Frontend Engineer @ Swiggy",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200",
          verified: true
        },
        timeAgo: "1 hour ago",
        content: "PSA for everyone looking in HSR Layout Sector 1 & 2: Landlords are asking 6 months deposit again. Don't pay more than 2-3 months! Check our verified PGs section on JhoomRahi for zero-brokerage, transparent deposit options. 🚫💸",
        likes: 74,
        isLiked: false,
        commentsCount: 23,
        tags: ["#RentTips", "#HSRLayout", "#ZeroBrokerage"]
      },
      {
        id: "post-blr-2",
        author: {
          name: "Rohan Deshmukh",
          role: "SDE-1 @ Swiggy",
          avatar: "https://picsum.photos/seed/rohan_dev/200/200",
          verified: true
        },
        timeAgo: "3 hours ago",
        content: "Hosting a casual weekend open-source and chai session at Third Wave Coffee Koramangala this Saturday at 4 PM. All junior devs and college students welcome! ☕💻",
        likes: 45,
        isLiked: true,
        commentsCount: 14,
        tags: ["#BengaluruDevs", "#Meetup", "#Koramangala"]
      }
    ]
  },
  {
    id: "comm-mumbai-pg",
    name: "Finding PG in Mumbai",
    category: "Housing Network",
    city: "Mumbai",
    members: 8900,
    membersDisplay: "8.9k members",
    avatar: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=200",
    coverImg: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800",
    description: "Navigating Mumbai rent without brokerage tears. Roommate matching, deposit split advice, and suburban reviews from Bandra to Powai.",
    isJoined: false,
    rules: ["Direct tenants only", "No agents allowed", "Masked chat mandatory"],
    posts: [
      {
        id: "post-mum-1",
        author: {
          name: "Siddharth Rao",
          role: "Analyst @ Morgan Stanley",
          avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200",
          verified: true
        },
        timeAgo: "4 hours ago",
        content: "Single occupancy available in a peaceful 2BHK in Goregaon East, 7 mins from Western Express Highway metro. Rent ₹16k/mo including cook and maid. Ping me on JhoomRahi chat!",
        likes: 31,
        isLiked: false,
        commentsCount: 9,
        tags: ["#MumbaiRent", "#Goregaon", "#VerifiedFlat"]
      }
    ]
  },
  {
    id: "comm-du-tribe",
    name: "Delhi University Tribe",
    category: "Campus Tribe",
    city: "New Delhi",
    members: 11400,
    membersDisplay: "11.4k members",
    avatar: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=200",
    coverImg: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=800",
    description: "North & South Campus students sharing flat vacancies, Hudson Lane food spots, college festival updates, and student discounts.",
    isJoined: false,
    rules: ["DU students only", "No political flame wars", "Help juniors find verified stays"],
    posts: [
      {
        id: "post-du-1",
        author: {
          name: "Ananya Iyer",
          role: "B.A. Economics, Delhi University",
          avatar: "https://picsum.photos/seed/ananya_du/200/200",
          verified: true
        },
        timeAgo: "6 hours ago",
        content: "Need 1 female flatmate for a sunny 3BHK flat in Vijay Nagar (North Campus). Rent comes down to ₹7,800/person with 24/7 water and no landlord interference. Looking for someone clean and respectful of study hours. 🌸",
        likes: 52,
        isLiked: false,
        commentsCount: 17,
        tags: ["#NorthCampus", "#VijayNagar", "#FlatmateWanted"]
      }
    ]
  },
  {
    id: "comm-pune-trekkers",
    name: "Pune Weekend Explorers",
    category: "Travel Tribe",
    city: "Pune",
    members: 5600,
    membersDisplay: "5.6k members",
    avatar: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200",
    coverImg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    description: "Trek squad for Western Ghats, sunrise bike rides to Lavasa, and weekend Pawna lake campouts for young professionals and college students.",
    isJoined: true,
    rules: ["Leave no trace", "Safety first on ghats", "Equal cost split"],
    posts: [
      {
        id: "post-pune-1",
        author: {
          name: "Devika & Squad",
          role: "Sinhagad Sunrise Trek Group",
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
          verified: true
        },
        timeAgo: "8 hours ago",
        content: "Next trek announced: Torna Fort Night Trek with sunrise view of the clouds. Carpool slots available from Kothrud and Wakad. Check travel vertical to register! 🎒🌄",
        likes: 39,
        isLiked: false,
        commentsCount: 11,
        tags: ["#PuneTreks", "#WesternGhats", "#Torna"]
      }
    ]
  }
];

