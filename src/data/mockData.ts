import type { Product, UserProfile } from '@/types';

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Organic Green Apple",
    qrCodeValue: "PROD001",
    nutritionalInfo: {
      calories: 95,
      protein: 0.5,
      fat: 0.3,
      carbs: 25,
      servingSize: "1 medium apple (182g)",
    },
    ingredients: ["Organic Green Apple"],
    allergens: [],
    sustainability: {
      score: 'A',
      co2Footprint: "0.2 kg CO2e/kg",
      sourcing: ["Certified Organic", "Locally Sourced (California)"],
      impactStatement: "Cultivated using water-efficient methods and supports local farm biodiversity."
    },
    images: ["https://placehold.co/600x400.png"],
    description: "A crisp and juicy organic green apple, perfect for a healthy snack. Grown with care for you and the planet.",
    dataAiHint: "green apple"
  },
  {
    id: "2",
    name: "Whole Wheat Bread",
    qrCodeValue: "PROD002",
    nutritionalInfo: {
      calories: 70,
      protein: 4,
      fat: 1,
      carbs: 12,
      servingSize: "1 slice (28g)",
    },
    ingredients: ["Whole Wheat Flour", "Water", "Yeast", "Salt", "Wheat Gluten", "Sunflower Oil"],
    allergens: ["Wheat", "Gluten"],
    sustainability: {
      score: 'B',
      co2Footprint: "0.8 kg CO2e/kg",
      sourcing: ["Sustainably Farmed Wheat"],
      impactStatement: "Made with whole grains from farms practicing sustainable agriculture to reduce environmental impact."
    },
    images: ["https://placehold.co/600x400.png"],
    description: "Nutritious whole wheat bread, ideal for sandwiches or toast. A good source of fiber.",
    dataAiHint: "wheat bread"
  },
  {
    id: "3",
    name: "Almond Milk (Unsweetened)",
    qrCodeValue: "PROD003",
    nutritionalInfo: {
      calories: 30,
      protein: 1,
      fat: 2.5,
      carbs: 1,
      servingSize: "1 cup (240ml)",
    },
    ingredients: ["Filtered Water", "Almonds", "Calcium Carbonate", "Sea Salt", "Potassium Citrate", "Sunflower Lecithin", "Gellan Gum", "Vitamin A Palmitate", "Vitamin D2", "D-Alpha-Tocopherol (Natural Vitamin E)"],
    allergens: ["Almonds (Tree Nuts)"],
    sustainability: {
      score: 'B',
      co2Footprint: "0.5 kg CO2e/liter",
      sourcing: ["Responsibly Sourced Almonds"],
      impactStatement: "Our almonds are sourced from farms committed to water stewardship and bee-friendly practices."
    },
    images: ["https://placehold.co/600x400.png"],
    description: "Smooth and creamy unsweetened almond milk. A great dairy-free alternative for cereals, coffee, or by itself.",
    dataAiHint: "Alpro almond"
  },
  {
    id: "4",
    name: "Dark Chocolate Bar (70%)",
    qrCodeValue: "PROD004",
    nutritionalInfo: {
      calories: 170,
      protein: 2,
      fat: 12,
      carbs: 13,
      servingSize: "3 squares (30g)",
    },
    ingredients: ["Cocoa Mass", "Sugar", "Cocoa Butter", "Soy Lecithin (Emulsifier)", "Natural Vanilla Flavor"],
    allergens: ["Soy"], // May contain traces of milk, nuts
    sustainability: {
      score: 'C',
      co2Footprint: "2.5 kg CO2e/kg",
      sourcing: ["Fair Trade Certified Cocoa"],
      impactStatement: "Crafted with Fair Trade cocoa, ensuring ethical sourcing and support for cocoa farming communities."
    },
    images: ["https://placehold.co/600x400.png"],
    description: "Rich and intense 70% dark chocolate bar. Perfect for a sophisticated treat or baking.",
    dataAiHint: "dark chocolate"
  }
];

export const defaultUserProfile: UserProfile = {
  dietaryRestrictions: {
    glutenFree: false,
    dairyFree: false,
    vegetarian: false,
    vegan: false,
  },
  allergies: [],
  preferences: {
    lowSodium: false,
    highProtein: false,
  },
};
