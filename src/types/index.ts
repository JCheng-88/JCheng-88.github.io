export interface Product {
  id: string;
  name: string;
  qrCodeValue: string;
  nutritionalInfo: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    servingSize: string;
  };
  ingredients: string[];
  allergens: string[];
  sustainability: {
    score: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
    co2Footprint: string;
    sourcing: string[];
    impactStatement?: string;
  };
  images: string[];
  description: string;
  dataAiHint?: string;
}

export interface UserProfile {
  dietaryRestrictions: {
    glutenFree: boolean;
    dairyFree: boolean;
    vegetarian: boolean;
    vegan: boolean;
  };
  allergies: string[];
  preferences: {
    lowSodium: boolean;
    highProtein: boolean;
  };
  accessibility: {
    textToSpeech: boolean;
    enlargedText: boolean; // Renamed from highContrastMode, now specifically for text enlargement
    textSizeScale: number; // Scale factor for text size, e.g., 1.0, 1.2, 1.5
    highContrastMode: boolean; // New, separate toggle for high contrast
  };
}
