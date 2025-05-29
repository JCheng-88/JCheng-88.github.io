// src/components/product/ProductDisplay.tsx
"use client";
import type { Product, UserProfile } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, CheckCircle, Info, Leaf, Utensils, Sparkles, Package } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { InfoCardItem } from './InfoCardItem';
import { useEffect, useState } from 'react';

interface ProductDisplayProps {
  product: Product;
}

export function ProductDisplay({ product }: ProductDisplayProps) {
  const { translate } = useLanguage();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('nutricode-user-profile');
    if (storedProfile) {
      setUserProfile(JSON.parse(storedProfile));
    }
  }, []);

  const isAllergenPresent = (allergen: string) => {
    if (!userProfile || !userProfile.allergies) return false;
    return userProfile.allergies.some(userAllergen => 
      allergen.toLowerCase().includes(userAllergen.toLowerCase()) || 
      userAllergen.toLowerCase().includes(allergen.toLowerCase())
    );
  };
  
  const getSustainabilityScoreColor = (score: Product['sustainability']['score']) => {
    switch (score) {
      case 'A': return 'bg-green-500 hover:bg-green-500';
      case 'B': return 'bg-lime-500 hover:bg-lime-500';
      case 'C': return 'bg-yellow-500 hover:bg-yellow-500';
      case 'D': return 'bg-orange-500 hover:bg-orange-500';
      case 'E': return 'bg-red-500 hover:bg-red-500';
      case 'F': return 'bg-rose-700 hover:bg-rose-700';
      default: return 'bg-gray-400 hover:bg-gray-400';
    }
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card className="shadow-lg overflow-hidden">
          <div className="relative w-full h-64">
            <Image
              src={product.images[0] || "https://placehold.co/600x400.png"}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={product.dataAiHint || "food product"}
            />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="md:col-span-2 space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center space-x-2">
            <Utensils className="h-6 w-6 text-primary" />
            <CardTitle>{translate('nutritionalInformation')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <InfoCardItem label={translate('servingSize')} value={product.nutritionalInfo.servingSize} />
            <Separator/>
            <InfoCardItem label={translate('calories')} value={`${product.nutritionalInfo.calories} ${translate('kcal')}`} />
            <InfoCardItem label={translate('protein')} value={`${product.nutritionalInfo.protein}${translate('g')}`} />
            <InfoCardItem label={translate('fat')} value={`${product.nutritionalInfo.fat}${translate('g')}`} />
            <InfoCardItem label={translate('carbs')} value={`${product.nutritionalInfo.carbs}${translate('g')}`} />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center space-x-2">
            <Package className="h-6 w-6 text-primary" />
            <CardTitle>{translate('ingredients')}</CardTitle>
          </CardHeader>
          <CardContent>
            {product.ingredients.length > 0 ? (
              <p className="text-sm text-muted-foreground">{product.ingredients.join(', ')}.</p>
            ) : (
              <p className="text-sm text-muted-foreground">{translate('noInformationAvailable')}</p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <CardTitle>{translate('allergenWarnings')}</CardTitle>
          </CardHeader>
          <CardContent>
            {product.allergens.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {product.allergens.map((allergen, index) => (
                  <Badge 
                    key={index} 
                    variant={isAllergenPresent(allergen) ? "destructive" : "secondary"}
                    className="text-sm"
                  >
                    {isAllergenPresent(allergen) && <AlertTriangle className="h-4 w-4 mr-1" />}
                    {allergen}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="flex items-center text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                {translate('No common allergens listed.')}
              </div>
            )}
             {userProfile && userProfile.allergies.length > 0 && (
              <p className="text-xs mt-2 text-muted-foreground">
                {translate('Personalized based on your profile allergies:')} {userProfile.allergies.join(', ')}
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <CardTitle>{translate('sustainabilityTracking')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{translate('environmentalScore')}:</span>
              <Badge className={`text-lg font-bold px-3 py-1 text-white ${getSustainabilityScoreColor(product.sustainability.score)}`}>
                {product.sustainability.score}
              </Badge>
            </div>
            <Separator/>
            <InfoCardItem label={translate('co2Footprint')} value={product.sustainability.co2Footprint} />
             <Separator/>
            <div>
              <h4 className="text-sm text-muted-foreground mb-1">{translate('sourcingInfo')}:</h4>
              {product.sustainability.sourcing.length > 0 ? (
                <ul className="list-disc list-inside pl-1 space-y-1">
                  {product.sustainability.sourcing.map((source, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <Leaf className="h-3 w-3 mr-2 text-green-600 flex-shrink-0" />
                      {source}
                    </li>
                  ))}
                </ul>
              ) : (
                 <p className="text-sm text-muted-foreground">{translate('noInformationAvailable')}</p>
              )}
            </div>
            {product.sustainability.impactStatement && (
              <>
                <Separator/>
                <div>
                  <h4 className="text-sm text-muted-foreground mb-1">{translate('impactStatement')}:</h4>
                  <p className="text-sm italic">"{product.sustainability.impactStatement}"</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
