export type Language = 'en' | 'es' | 'fr';

export const appName = "NutriCode";

export const availableLanguages: { code: Language; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
];

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    navHome: "Scan",
    navProfile: "Profile",
    language: "Language",
    // Home Page (Scan)
    scanPromptTitle: "Scan a Product", // Changed from scanPrompt
    scanPromptMessage: "Product details will appear here once a QR code is scanned. You can also view items from your history below.", // New
    noProductSelectedPrompt: "Scan a product or select an item from your history to view its details.", // New
    productNotFound: "Product not found.",
    nutritionalInformation: "Nutritional Information",
    ingredients: "Ingredients",
    allergenWarnings: "Allergen Warnings",
    sustainabilityTracking: "Sustainability Tracking",
    environmentalScore: "Environmental Score",
    co2Footprint: "CO₂ Footprint",
    sourcingInfo: "Sourcing Information",
    impactStatement: "Impact Statement",
    calories: "Calories",
    protein: "Protein",
    fat: "Fat",
    carbs: "Carbohydrates",
    servingSize: "Serving Size",
    // Profile Page
    profileTitle: "Personalized Nutrition Profile",
    dietaryRestrictions: "Dietary Restrictions",
    allergies: "Allergies (comma-separated)",
    preferences: "Preferences",
    saveProfileButton: "Save Profile",
    profileSavedSuccess: "Profile saved successfully!",
    profileSaveError: "Error saving profile.",
    glutenFree: "Gluten-Free",
    dairyFree: "Dairy-Free",
    vegetarian: "Vegetarian",
    vegan: "Vegan",
    lowSodium: "Low Sodium",
    highProtein: "High Protein",
    // Scan History
    scanHistoryTitle: "Recently Viewed",
    noScanHistory: "You haven't viewed any products yet.",
    clearHistory: "Clear History",
    historyCleared: "Scan history cleared.",
    historyClearedMessage: "Your recently viewed items have been cleared.", // New or updated for consistency
    viewProduct: "View",
    // App Promotion
    appPromotionTitle: "Get the Full NutriCode Experience!",
    appPromotionMessage: "Download our mobile app for offline access, personalized alerts, and an even smoother experience on the go.",
    downloadOnAppStore: "Download on the App Store",
    getItOnGooglePlay: "Get it on Google Play",
    // Common
    g: "g", 
    kcal: "kcal",
    learnMore: "Learn More",
    noInformationAvailable: "No information available."
  },
  es: {
    // Header
    navHome: "Escanear",
    navProfile: "Perfil",
    language: "Idioma",
    // Home Page (Scan)
    scanPromptTitle: "Escanear un Producto", // Changed
    scanPromptMessage: "Los detalles del producto aparecerán aquí una vez que se escanee un código QR. También puedes ver artículos de tu historial a continuación.", // New
    noProductSelectedPrompt: "Escanee un producto o seleccione un artículo de su historial para ver sus detalles.", // New
    productNotFound: "Producto no encontrado.",
    nutritionalInformation: "Información Nutricional",
    ingredients: "Ingredientes",
    allergenWarnings: "Advertencias de Alérgenos",
    sustainabilityTracking: "Seguimiento de Sostenibilidad",
    environmentalScore: "Puntuación Ambiental",
    co2Footprint: "Huella de CO₂",
    sourcingInfo: "Información de Origen",
    impactStatement: "Declaración de Impacto",
    calories: "Calorías",
    protein: "Proteína",
    fat: "Grasa",
    carbs: "Carbohidratos",
    servingSize: "Tamaño de la Porción",
    // Profile Page
    profileTitle: "Perfil Nutricional Personalizado",
    dietaryRestrictions: "Restricciones Dietéticas",
    allergies: "Alergias (separadas por comas)",
    preferences: "Preferencias",
    saveProfileButton: "Guardar Perfil",
    profileSavedSuccess: "¡Perfil guardado con éxito!",
    profileSaveError: "Error al guardar el perfil.",
    glutenFree: "Sin Gluten",
    dairyFree: "Sin Lácteos",
    vegetarian: "Vegetariano",
    vegan: "Vegano",
    lowSodium: "Bajo en Sodio",
    highProtein: "Alto en Proteínas",
    // Scan History
    scanHistoryTitle: "Vistos Recientemente",
    noScanHistory: "Aún no has visto ningún producto.",
    clearHistory: "Borrar Historial",
    historyCleared: "Historial de escaneo borrado.",
    historyClearedMessage: "Tus artículos vistos recientemente han sido borrados.", // New
    viewProduct: "Ver",
    // App Promotion
    appPromotionTitle: "¡Obtén la Experiencia Completa de NutriCode!",
    appPromotionMessage: "Descarga nuestra aplicación móvil para acceso sin conexión, alertas personalizadas y una experiencia aún más fluida sobre la marcha.",
    downloadOnAppStore: "Descargar en App Store",
    getItOnGooglePlay: "Obtener en Google Play",
    // Common
    g: "g",
    kcal: "kcal",
    learnMore: "Aprende Más",
    noInformationAvailable: "No hay información disponible."
  },
  fr: {
    // Header
    navHome: "Scanner",
    navProfile: "Profil",
    language: "Langue",
    // Home Page (Scan)
    scanPromptTitle: "Scanner un Produit", // Changed
    scanPromptMessage: "Les détails du produit apparaîtront ici une fois qu'un code QR est scanné. Vous pouvez également consulter les articles de votre historique ci-dessous.", // New
    noProductSelectedPrompt: "Scannez un produit ou sélectionnez un article de votre historique pour afficher ses détails.", // New
    productNotFound: "Produit non trouvé.",
    nutritionalInformation: "Informations Nutritionnelles",
    ingredients: "Ingrédients",
    allergenWarnings: "Avertissements Allergènes",
    sustainabilityTracking: "Suivi de la Durabilité",
    environmentalScore: "Score Environnemental",
    co2Footprint: "Empreinte CO₂",
    sourcingInfo: "Informations sur l'Approvisionnement",
    impactStatement: "Déclaration d'Impact",
    calories: "Calories",
    protein: "Protéines",
    fat: "Matières Grasses",
    carbs: "Glucides",
    servingSize: "Taille de la Portion",
    // Profile Page
    profileTitle: "Profil Nutritionnel Personnalisé",
    dietaryRestrictions: "Restrictions Alimentaires",
    allergies: "Allergies (séparées par des virgules)",
    preferences: "Préférences",
    saveProfileButton: "Enregistrer le Profil",
    profileSavedSuccess: "Profil enregistré avec succès !",
    profileSaveError: "Erreur lors de l'enregistrement du profil.",
    glutenFree: "Sans Gluten",
    dairyFree: "Sans Produits Laitiers",
    vegetarian: "Végétarien",
    vegan: "Végétalien",
    lowSodium: "Faible en Sodium",
    highProtein: "Riche en Protéines",
    // Scan History
    scanHistoryTitle: "Consultés Récemment",
    noScanHistory: "Vous n'avez encore consulté aucun produit.",
    clearHistory: "Effacer l'Historique",
    historyCleared: "Historique de scan effacé.",
    historyClearedMessage: "Vos articles récemment consultés ont été effacés.", // New
    viewProduct: "Voir",
    // App Promotion
    appPromotionTitle: "Vivez l'Expérience NutriCode Complète !",
    appPromotionMessage: "Téléchargez notre application mobile pour un accès hors ligne, des alertes personnalisées et une expérience encore plus fluide lors de vos déplacements.",
    downloadOnAppStore: "Télécharger sur l'App Store",
    getItOnGooglePlay: "Obtenir sur Google Play",
    // Common
    g: "g",
    kcal: "kcal",
    learnMore: "En Savoir Plus",
    noInformationAvailable: "Aucune information disponible."
  },
};
