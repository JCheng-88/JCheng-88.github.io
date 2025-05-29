// src/app/profile/page.tsx
"use client";
import { ProfileForm } from '@/components/profile/ProfileForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { UserCog } from 'lucide-react';

export default function ProfilePage() {
  const { translate } = useLanguage();

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-2">
            <UserCog className="h-8 w-8 text-primary" />
            <CardTitle className="text-3xl">{translate('profileTitle')}</CardTitle>
          </div>
          <CardDescription>
            {translate("Customize your nutritional information based on your dietary needs and preferences. This will help NutriCode highlight relevant information for you.")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
