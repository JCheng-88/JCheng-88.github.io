// src/components/app/AppPromotionBanner.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Apple, Download, Smartphone } from "lucide-react";
import Image from "next/image";

export function AppPromotionBanner() {
  const { translate } = useLanguage();

  return (
    <Card className="shadow-lg border-accent border-2">
      <CardHeader>
        <div className="flex items-center space-x-3 mb-2">
          <Smartphone className="h-8 w-8 text-accent" />
          <CardTitle className="text-2xl text-accent">{translate('appPromotionTitle')}</CardTitle>
        </div>
        <CardDescription>{translate('appPromotionMessage')}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4 items-center">
        <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
          <Apple className="mr-2 h-5 w-5" />
          {translate('downloadOnAppStore')}
        </Button>
        <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
          <Download className="mr-2 h-5 w-5" />
          {translate('getItOnGooglePlay')}
        </Button>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>Mock download buttons for demonstration purposes.</p>
      </CardFooter>
    </Card>
  );
}
