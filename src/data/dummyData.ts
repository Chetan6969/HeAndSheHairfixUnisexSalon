// Dummy data for salon services and packages
// This will be replaced with MongoDB data once backend is connected

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration_minutes: number;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  services: string[];
  target_audience: string;
}

export const dummyServices: Service[] = [
  // Hair Services
  {
    id: "1",
    name: "Men's Haircut",
    category: "hair",
    description: "Professional styling for all hair types",
    price: 299,
    duration_minutes: 30
  },
  {
    id: "2",
    name: "Women's Haircut",
    category: "hair",
    description: "Expert cutting and styling",
    price: 499,
    duration_minutes: 45
  },
  {
    id: "3",
    name: "Hair Spa",
    category: "hair",
    description: "Deep nourishment and relaxation",
    price: 599,
    duration_minutes: 60
  },
  {
    id: "4",
    name: "Keratin Treatment",
    category: "hair",
    description: "Silky smooth, manageable hair",
    price: 2999,
    duration_minutes: 120
  },
  {
    id: "5",
    name: "Hair Coloring",
    category: "hair",
    description: "Transform your look with vibrant colors",
    price: 1499,
    duration_minutes: 90
  },
  {
    id: "6",
    name: "Highlights",
    category: "hair",
    description: "Add dimension with highlights",
    price: 1999,
    duration_minutes: 120
  },
  // Beauty Services
  {
    id: "7",
    name: "Facial",
    category: "beauty",
    description: "Glowing, refreshed skin",
    price: 799,
    duration_minutes: 60
  },
  {
    id: "8",
    name: "Cleanup",
    category: "beauty",
    description: "Quick refresh for your skin",
    price: 499,
    duration_minutes: 30
  },
  {
    id: "9",
    name: "De-tan Treatment",
    category: "beauty",
    description: "Remove tan and brighten skin",
    price: 499,
    duration_minutes: 30
  },
  {
    id: "10",
    name: "Party Makeup",
    category: "beauty",
    description: "Look stunning for special occasions",
    price: 1999,
    duration_minutes: 60
  },
  {
    id: "11",
    name: "Bridal Makeup",
    category: "beauty",
    description: "Complete bridal makeover",
    price: 3499,
    duration_minutes: 120
  },
  {
    id: "12",
    name: "Nail Art",
    category: "beauty",
    description: "Beautiful, creative nail designs",
    price: 699,
    duration_minutes: 45
  },
  // Grooming Services
  {
    id: "13",
    name: "Beard Styling",
    category: "grooming",
    description: "Sharp, well-maintained beard",
    price: 199,
    duration_minutes: 20
  },
  {
    id: "14",
    name: "Head Massage",
    category: "grooming",
    description: "Stress relief and relaxation",
    price: 299,
    duration_minutes: 30
  },
  {
    id: "15",
    name: "Full Body Massage",
    category: "grooming",
    description: "Complete body relaxation",
    price: 1999,
    duration_minutes: 90
  },
  {
    id: "16",
    name: "Manicure",
    category: "grooming",
    description: "Hand care and nail grooming",
    price: 399,
    duration_minutes: 30
  },
  {
    id: "17",
    name: "Pedicure",
    category: "grooming",
    description: "Foot care and relaxation",
    price: 499,
    duration_minutes: 45
  },
  {
    id: "18",
    name: "Waxing (Full Body)",
    category: "grooming",
    description: "Smooth, hair-free skin",
    price: 1299,
    duration_minutes: 60
  },
];

export const dummyPackages: Package[] = [
  {
    id: "pkg1",
    name: "Groom Package",
    description: "Complete grooming package for grooms including haircut, facial, massage, and beard styling",
    price: 9999,
    services: ["1", "7", "13", "14"],
    target_audience: "groom"
  },
  {
    id: "pkg2",
    name: "Bride Package",
    description: "Comprehensive bridal package with makeup, hairdo, facial, manicure, and pedicure",
    price: 14999,
    services: ["2", "11", "7", "12", "16", "17"],
    target_audience: "bride"
  },
  {
    id: "pkg3",
    name: "Monthly Care Package",
    description: "Regular monthly package with haircut, facial, and massage services",
    price: 9999,
    services: ["1", "7", "14", "3"],
    target_audience: "regular"
  }
];
