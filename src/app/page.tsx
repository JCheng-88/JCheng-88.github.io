// src/app/page.tsx
"use client";
import { useEffect, useState, useRef } from 'react';
import { ProductDisplay } from '@/components/product/ProductDisplay';
import { mockProducts } from '@/data/mockData';
import type { Product, UserProfile } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, ScanLine, Trash2, AlertTriangle, Volume2Icon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AppPromotionBanner } from '@/components/app/AppPromotionBanner';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const MAX_HISTORY_ITEMS = 5;
const HISTORY_STORAGE_KEY = 'nutricode-scan-history-ids';
const USER_PROFILE_STORAGE_KEY = 'nutricode-user-profile';

export default function HomePage() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [scanHistory, setScanHistory] = useState<Product[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [activeAllergenWarnings, setActiveAllergenWarnings] = useState<string[]>([]);
  const { translate } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    // Load scan history
    const storedHistoryIdsJSON = localStorage.getItem(HISTORY_STORAGE_KEY);
    let historicProducts: Product[] = [];

    if (storedHistoryIdsJSON) {
      try {
        const storedHistoryIds = JSON.parse(storedHistoryIdsJSON) as string[];
        historicProducts = storedHistoryIds
          .map(id => mockProducts.find(p => p.id === id))
          .filter(p => p !== undefined) as Product[];
      } catch (e) {
        console.error("Error parsing scan history from localStorage", e);
        localStorage.removeItem(HISTORY_STORAGE_KEY); 
      }
    }

    if (historicProducts.length === 0 && mockProducts.length > 0) {
      const defaultHistoryCount = Math.min(MAX_HISTORY_ITEMS, 3, mockProducts.length);
      const defaultProductIds = mockProducts.slice(0, defaultHistoryCount).map(p => p.id);
      historicProducts = defaultProductIds
        .map(id => mockProducts.find(p => p.id === id))
        .filter(p => p !== undefined) as Product[];
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(defaultProductIds));
    }
    setScanHistory(historicProducts);

    // Load user profile
    const storedProfile = localStorage.getItem(USER_PROFILE_STORAGE_KEY);
    if (storedProfile) {
      try {
        setUserProfile(JSON.parse(storedProfile));
      } catch (e) {
        console.error("Error parsing user profile from localStorage", e);
      }
    }
  }, []);

  const selectedProduct = mockProducts.find(p => p.id === selectedProductId);

  useEffect(() => {
    if (selectedProduct && userProfile && userProfile.allergies.length > 0) {
      const warnings: string[] = [];
      selectedProduct.allergens.forEach(productAllergen => {
        const productAllergenLower = productAllergen.toLowerCase();
        if (userProfile.allergies.some(userAllergen => {
          const userAllergenLower = userAllergen.toLowerCase();
          return productAllergenLower.includes(userAllergenLower) || userAllergenLower.includes(productAllergenLower);
        })) {
          warnings.push(productAllergen);
        }
      });
      setActiveAllergenWarnings(warnings);
    } else {
      setActiveAllergenWarnings([]);
    }
  }, [selectedProduct, userProfile]);

  const handleProductSelect = (productId: string | null) => {
    setSelectedProductId(productId);
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
    if (productId) {
      const currentProduct = mockProducts.find(p => p.id === productId);
      if (currentProduct) {
        const storedHistoryIdsJSON = localStorage.getItem(HISTORY_STORAGE_KEY);
        let historyIds: string[] = [];
        if (storedHistoryIdsJSON) {
          try {
            historyIds = JSON.parse(storedHistoryIdsJSON);
          } catch (e) {
             console.error("Error parsing scan history for update", e);
          }
        }
        
        historyIds = historyIds.filter(id => id !== productId);
        historyIds.unshift(productId);
        historyIds = historyIds.slice(0, MAX_HISTORY_ITEMS);
        
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyIds));
        
        const newHistoricProducts = historyIds
          .map(id => mockProducts.find(p => p.id === id))
          .filter(p => p !== undefined) as Product[];
        setScanHistory(newHistoricProducts);
      }
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    setScanHistory([]);
    setSelectedProductId(null);
    setActiveAllergenWarnings([]);
    toast({ 
      title: translate('historyCleared'),
      description: translate('historyClearedMessage'),
      variant: "default"
    });
  };

  const handleReadAloud = () => {
    if (!selectedProduct) {
      toast({
        title: translate('ttsInitiatedToastTitle'),
        description: "No product selected to read.",
        variant: "destructive"
      });
      return;
    }
    // In a real app, this would trigger speech synthesis
    // based on userProfile.accessibility.ttsSectionsToRead, userProfile.accessibility.ttsVoice and selectedProduct details.
    const sections = userProfile?.accessibility?.ttsSectionsToRead?.join(', ') || 'all selected';
    const voice = userProfile?.accessibility?.ttsVoice || 'default';
    toast({
      title: translate('ttsInitiatedToastTitle'),
      description: translate('ttsInitiatedToastDescription', { sections: sections, voice: voice }),
      variant: "default"
    });
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center space-x-2">
          <ScanLine className="h-6 w-6 text-primary" />
          <CardTitle>{translate('scanPromptTitle')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {translate('scanPromptMessage')}
          </p>
        </CardContent>
      </Card>

      {activeAllergenWarnings.length > 0 && (
        <Alert variant="destructive" className="shadow-lg">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>{translate('allergenAlertTitle')}</AlertTitle>
          <AlertDescription>
            {translate('allergenAlertMessage', { allergens: activeAllergenWarnings.join(', ') })}
          </AlertDescription>
        </Alert>
      )}

      {userProfile?.accessibility?.textToSpeech && selectedProduct && (
        <div className="my-4 flex justify-center">
          <Button 
            onClick={handleReadAloud} 
            variant="default" // Changed to default for primary color styling
            size="lg" 
            aria-label={translate('readAloudButtonLabel')}
            className="font-semibold shadow-md" // Added font-semibold and shadow for emphasis
          >
            <Volume2Icon className="mr-2 h-6 w-6" />
            {translate('readAloudButtonLabel')}
          </Button>
        </div>
      )}

      {selectedProduct ? (
        <ProductDisplay product={selectedProduct} />
      ) : selectedProductId ? ( 
         <Card className="shadow-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">{translate('productNotFound')}</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <p className="text-center text-lg text-muted-foreground">
              {translate('noProductSelectedPrompt')}
            </p>
          </CardContent>
        </Card>
      )}

      <Separator />

      <AppPromotionBanner />

      <Separator />

      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center space-x-2">
            <History className="h-6 w-6 text-primary" />
            <CardTitle>{translate('scanHistoryTitle')}</CardTitle>
          </div>
          {scanHistory.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleClearHistory}>
              <Trash2 className="h-4 w-4 mr-2" />
              {translate('clearHistory')}
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {scanHistory.length > 0 ? (
            <ul className="space-y-2">
              {scanHistory.map(product => (
                <li 
                  key={product.id} 
                  onClick={() => handleProductSelect(product.id)}
                  className="p-3 border rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleProductSelect(product.id); }}
                >
                  <span className="font-medium">{product.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">{translate('noScanHistory')}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
