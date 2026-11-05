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
