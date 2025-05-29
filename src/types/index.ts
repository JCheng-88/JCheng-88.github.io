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
    highContrastMode: boolean;
  };
}
