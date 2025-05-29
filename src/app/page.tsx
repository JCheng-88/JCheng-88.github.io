// src/app/page.tsx
"use client";
import { useEffect, useState, useRef } from 'react';
import { ProductDisplay } from '@/components/product/ProductDisplay';
import { mockProducts } from '@/data/mockData';
import type { Product } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, ScanLine, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AppPromotionBanner } from '@/components/app/AppPromotionBanner';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const MAX_HISTORY_ITEMS = 5;
const HISTORY_STORAGE_KEY = 'nutricode-scan-history-ids';

export default function HomePage() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [scanHistory, setScanHistory] = useState<Product[]>([]);
  const { translate } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    const storedHistoryIdsJSON = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (storedHistoryIdsJSON) {
      try {
        const storedHistoryIds = JSON.parse(storedHistoryIdsJSON) as string[];
        const historicProducts = storedHistoryIds
          .map(id => mockProducts.find(p => p.id === id))
          .filter(p => p !== undefined) as Product[];
        setScanHistory(historicProducts);
      } catch (e) {
        console.error("Error parsing scan history from localStorage", e);
        localStorage.removeItem(HISTORY_STORAGE_KEY); // Clear corrupted data
      }
    }
  }, []);

  const handleProductSelect = (productId: string | null) => {
    setSelectedProductId(productId);
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
             // historyIds remains empty, effectively resetting if corrupted
          }
        }
        
        historyIds = historyIds.filter(id => id !== productId);
        historyIds.unshift(productId);
        historyIds = historyIds.slice(0, MAX_HISTORY_ITEMS);
        
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(historyIds));
        
        const historicProducts = historyIds
          .map(id => mockProducts.find(p => p.id === id))
          .filter(p => p !== undefined) as Product[];
        setScanHistory(historicProducts);
      }
    }
  };

  const handleClearHistory = () => {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    setScanHistory([]);
    setSelectedProductId(null); // Clear selected product when history is cleared
    toast({ 
      title: translate('historyCleared'),
      description: translate('historyClearedMessage'),
      variant: "default"
    });
  };

  const selectedProduct = mockProducts.find(p => p.id === selectedProductId);

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
            <ul className="space-y-3">
              {scanHistory.map(product => (
                <li key={product.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50">
                  <span className="font-medium">{product.name}</span>
                  <Button variant="ghost" size="sm" onClick={() => handleProductSelect(product.id)}>
                    {translate('viewProduct')}
                  </Button>
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
