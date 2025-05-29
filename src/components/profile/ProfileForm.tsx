// src/components/profile/ProfileForm.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import type { UserProfile } from "@/types";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { defaultUserProfile } from "@/data/mockData";

const profileFormSchema = z.object({
  dietaryRestrictions: z.object({
    glutenFree: z.boolean().default(false),
    dairyFree: z.boolean().default(false),
    vegetarian: z.boolean().default(false),
    vegan: z.boolean().default(false),
  }),
  allergies: z.string().transform(val => val.split(',').map(s => s.trim()).filter(Boolean)).default(""),
  preferences: z.object({
    lowSodium: z.boolean().default(false),
    highProtein: z.boolean().default(false),
  }),
  accessibility: z.object({
    textToSpeech: z.boolean().default(false),
    highContrastMode: z.boolean().default(false),
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const { toast } = useToast();
  const { translate } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      ...defaultUserProfile,
      allergies: defaultUserProfile.allergies.join(', '), // Convert array to string for form
      accessibility: { // Ensure accessibility defaults are spread
        ...defaultUserProfile.accessibility,
      },
    },
  });

  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('nutricode-user-profile');
      if (storedProfile) {
        const parsedProfile: UserProfile = JSON.parse(storedProfile);
        form.reset({
            ...parsedProfile,
            allergies: parsedProfile.allergies.join(', '),
            accessibility: { // Ensure accessibility settings are loaded or defaulted
              textToSpeech: parsedProfile.accessibility?.textToSpeech || false,
              highContrastMode: parsedProfile.accessibility?.highContrastMode || false,
            },
        });
      } else {
        // If no stored profile, ensure default accessibility values are set from defaultUserProfile
        form.reset({
          ...defaultUserProfile,
          allergies: defaultUserProfile.allergies.join(', '),
          accessibility: {
            ...defaultUserProfile.accessibility,
          },
        });
      }
    } catch (error) {
      console.error("Failed to load profile from localStorage", error);
       // Fallback to default values if parsing fails or any error occurs
       form.reset({
        ...defaultUserProfile,
        allergies: defaultUserProfile.allergies.join(', '),
        accessibility: {
          ...defaultUserProfile.accessibility,
        },
      });
    }
    setIsLoading(false);
  }, [form]);

  function onSubmit(data: ProfileFormValues) {
    try {
      const profileToSave: UserProfile = {
        ...data,
        allergies: data.allergies // data.allergies is already string[] here
      };
      localStorage.setItem('nutricode-user-profile', JSON.stringify(profileToSave));
      toast({
        title: translate('profileSavedSuccess'),
        description: "Your preferences have been updated.",
        variant: "default", 
      });
    } catch (error) {
      toast({
        title: translate('profileSaveError'),
        description: "Could not save your preferences.",
        variant: "destructive",
      });
    }
  }

  if (isLoading) {
    return <p>{translate("Loading profile...")}</p>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="mb-4 text-lg font-medium">{translate('dietaryRestrictions')}</h3>
          <div className="space-y-4">
            {Object.keys(defaultUserProfile.dietaryRestrictions).map((key) => (
              <FormField
                key={key}
                control={form.control}
                name={`dietaryRestrictions.${key as keyof ProfileFormValues['dietaryRestrictions']}`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {translate(key.charAt(0).toLowerCase() + key.slice(1))} 
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translate('allergies')}</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Peanuts, Shellfish, Soy" {...field} />
              </FormControl>
              <FormDescription>
                {translate("Enter any allergies you have, separated by commas.")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div>
          <h3 className="mb-4 text-lg font-medium">{translate('preferences')}</h3>
          <div className="space-y-4">
            {Object.keys(defaultUserProfile.preferences).map((key) => (
              <FormField
                key={key}
                control={form.control}
                name={`preferences.${key as keyof ProfileFormValues['preferences']}`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {translate(key.charAt(0).toLowerCase() + key.slice(1))}
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">{translate('accessibilityFeatures')}</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="accessibility.textToSpeech"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {translate('enableTextToSpeech')}
                    </FormLabel>
                    <FormDescription>
                      {translate('textToSpeechDescription')}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accessibility.highContrastMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {translate('enableHighContrastMode')}
                    </FormLabel>
                    <FormDescription>
                      {translate('highContrastModeDescription')}
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full sm:w-auto">
          {translate('saveProfileButton')}
        </Button>
      </form>
    </Form>
  );
}
