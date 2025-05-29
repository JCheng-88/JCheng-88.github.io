// src/app/page.tsx
"use client";
import { useState } from 'react';
import { ProductDisplay } from '@/components/product/ProductDisplay';
import { mockProducts } from '@/data/mockData';
import type { Product } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanLine } from 'lucide-react';

export default function HomePage() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const { translate } = useLanguage();

  const selectedProduct = mockProducts.find(p => p.id === selectedProductId);

  return (
    <div className="space-y-8">
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center space-x-2">
          <ScanLine className="h-6 w-6 text-primary" />
          <CardTitle>{translate('scanPrompt')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={setSelectedProductId} value={selectedProductId || ""}>
            <SelectTrigger className="w-full md:w-1/2 lg:w-1/3">
              <SelectValue placeholder={translate('selectProductPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {mockProducts.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
      ) : null}
    </div>
  );
}
