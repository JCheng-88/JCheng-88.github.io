
// src/app/about/page.tsx
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart3, Globe, PackageOpen, Users, Eye, MessageCircle } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function StatCard({ icon, value, label }: StatCardProps) {
  return (
    <Card className="bg-secondary/50 shadow-md">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <div className="text-primary mb-2">{icon}</div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

export default function AboutPage() {
  const { translate } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <PackageOpen className="h-12 w-12 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">{translate('aboutTitle')}</CardTitle>
          <CardDescription className="text-lg">
            {translate('aboutSubtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">{translate('problemTitle')}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {translate('problemDescription')}
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">{translate('solutionTitle')}</h2>
            <p className="leading-relaxed">
              {translate('solutionDescription')}
            </p>
          </section>
          
          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-center text-primary">{translate('impactTitle')}</h2>
            <p className="text-center text-muted-foreground mb-6">
              {translate('impactIntro')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              <StatCard 
                icon={<Globe className="h-8 w-8" />} 
                value={translate('statMigrantsValue')} 
                label={translate('statMigrantsLabel')} 
              />
              <StatCard 
                icon={<BarChart3 className="h-8 w-8" />}  // Using BarChart for tourists as placeholder
                value={translate('statTouristsValue')} 
                label={translate('statTouristsLabel')} 
              />
              <StatCard 
                icon={<Users className="h-8 w-8" />} 
                value={translate('statAllergiesValue')} 
                label={translate('statAllergiesLabel')} 
              />
              <StatCard 
                icon={<Eye className="h-8 w-8" />} 
                value={translate('statVisionImpairmentValue')} 
                label={translate('statVisionImpairmentLabel')} 
              />
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">{translate('inclusivityTitle')}</h2>
            <div className="flex items-start space-x-3 p-4 border rounded-md bg-secondary/30">
              <MessageCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <p className="leading-relaxed text-sm">
                {translate('inclusivityDescription')}
              </p>
            </div>
          </section>

          <Separator />
          
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-primary">{translate('benefitsTitle')}</h2>
            <ul className="list-disc list-inside space-y-2 pl-5 text-muted-foreground leading-relaxed">
              <li>{translate('benefitFoodCompanies')}</li>
              <li>{translate('benefitHealthApps')}</li>
              <li>{translate('benefitConsumers')}</li>
            </ul>
          </section>

          <Separator />

          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-3 text-accent">{translate('visionTitle')}</h2>
            <p className="text-lg italic">
              "{translate('visionDescription')}"
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
