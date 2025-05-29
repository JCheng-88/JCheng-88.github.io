// src/components/profile/ProfileForm.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
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
import { Separator } from "../ui/separator";

const profileFormSchema = z.object({
  dietaryRestrictions: z.object({
    glutenFree: z.boolean().default(defaultUserProfile.dietaryRestrictions.glutenFree),
    dairyFree: z.boolean().default(defaultUserProfile.dietaryRestrictions.dairyFree),
    vegetarian: z.boolean().default(defaultUserProfile.dietaryRestrictions.vegetarian),
    vegan: z.boolean().default(defaultUserProfile.dietaryRestrictions.vegan),
  }),
  allergies: z.string().transform(val => val.split(',').map(s => s.trim()).filter(Boolean)).default(defaultUserProfile.allergies.join(', ')),
  preferences: z.object({
    lowSodium: z.boolean().default(defaultUserProfile.preferences.lowSodium),
    highProtein: z.boolean().default(defaultUserProfile.preferences.highProtein),
  }),
  accessibility: z.object({
    textToSpeech: z.boolean().default(defaultUserProfile.accessibility.textToSpeech),
    ttsSectionsToRead: z.array(z.string()).optional().default(defaultUserProfile.accessibility.ttsSectionsToRead || []),
    enlargedText: z.boolean().default(defaultUserProfile.accessibility.enlargedText),
    textSizeScale: z.number().min(0.8).max(2).step(0.1).default(defaultUserProfile.accessibility.textSizeScale),
    highContrastMode: z.boolean().default(defaultUserProfile.accessibility.highContrastMode),
  }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ttsAvailableSections = [
  { id: 'name', labelKey: 'ttsSectionName' },
  { id: 'description', labelKey: 'ttsSectionDescription' },
  { id: 'nutritionalInfo', labelKey: 'ttsSectionNutritionalInfo' },
  { id: 'ingredients', labelKey: 'ttsSectionIngredients' },
  { id: 'allergens', labelKey: 'ttsSectionAllergens' },
  { id: 'sustainability', labelKey: 'ttsSectionSustainability' },
];


export function ProfileForm() {
  const { toast } = useToast();
  const { translate } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
  });
  
  const enlargedTextEnabled = form.watch("accessibility.enlargedText");
  const currentTextSizeScale = form.watch("accessibility.textSizeScale") || defaultUserProfile.accessibility.textSizeScale;
  const textToSpeechEnabled = form.watch("accessibility.textToSpeech");


  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('nutricode-user-profile');
      if (storedProfile) {
        const parsedProfile: Partial<UserProfile> = JSON.parse(storedProfile);
        const newProfileData: ProfileFormValues = {
          dietaryRestrictions: {
            ...defaultUserProfile.dietaryRestrictions,
            ...(parsedProfile.dietaryRestrictions || {}),
          },
          allergies: parsedProfile.allergies ? parsedProfile.allergies.join(', ') : defaultUserProfile.allergies.join(', '),
          preferences: {
            ...defaultUserProfile.preferences,
            ...(parsedProfile.preferences || {}),
          },
          accessibility: {
            ...defaultUserProfile.accessibility,
            ...(parsedProfile.accessibility || {}),
            ttsSectionsToRead: parsedProfile.accessibility?.ttsSectionsToRead || defaultUserProfile.accessibility.ttsSectionsToRead || [],
          },
        };
        form.reset(newProfileData);
      } else {
        form.reset({
          dietaryRestrictions: { ...defaultUserProfile.dietaryRestrictions },
          allergies: defaultUserProfile.allergies.join(', '),
          preferences: { ...defaultUserProfile.preferences },
          accessibility: { ...defaultUserProfile.accessibility, ttsSectionsToRead: defaultUserProfile.accessibility.ttsSectionsToRead || [] },
        });
      }
    } catch (error) {
      console.error("Failed to load profile from localStorage", error);
       form.reset({
        dietaryRestrictions: { ...defaultUserProfile.dietaryRestrictions },
        allergies: defaultUserProfile.allergies.join(', '),
        preferences: { ...defaultUserProfile.preferences },
        accessibility: { ...defaultUserProfile.accessibility, ttsSectionsToRead: defaultUserProfile.accessibility.ttsSectionsToRead || [] },
      });
    }
    setIsLoading(false);
  }, [form]);

  function onSubmit(data: ProfileFormValues) {
    try {
      const profileToSave: UserProfile = {
        ...data,
        accessibility: {
          ...data.accessibility,
          ttsSectionsToRead: data.accessibility.textToSpeech ? data.accessibility.ttsSectionsToRead : [], // Clear sections if TTS is off
        }
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

            {textToSpeechEnabled && (
              <FormField
                control={form.control}
                name="accessibility.ttsSectionsToRead"
                render={({ field }) => (
                  <FormItem className="rounded-lg border p-4 shadow space-y-3">
                    <FormLabel className="text-base font-medium">
                      {translate('selectTTSSectionsPrompt')}
                    </FormLabel>
                    <div className="space-y-2">
                      {ttsAvailableSections.map((section) => (
                        <FormField
                          key={section.id}
                          control={form.control}
                          name="accessibility.ttsSectionsToRead"
                          render={({ field: ttsField }) => {
                            // Ensure field.value is an array
                            const currentSelections = Array.isArray(ttsField.value) ? ttsField.value : [];
                            return (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={currentSelections.includes(section.id)}
                                    onCheckedChange={(checked) => {
                                      let newSelections = [...currentSelections];
                                      if (checked) {
                                        if (!newSelections.includes(section.id)) {
                                          newSelections.push(section.id);
                                        }
                                      } else {
                                        newSelections = newSelections.filter(id => id !== section.id);
                                      }
                                      ttsField.onChange(newSelections);
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {translate(section.labelKey)}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <Separator />

            <FormField
              control={form.control}
              name="accessibility.enlargedText"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      {translate('enableEnlargedText')}
                    </FormLabel>
                    <FormDescription>
                      {translate('enlargedTextDescription')}
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

            {enlargedTextEnabled && (
              <FormField
                control={form.control}
                name="accessibility.textSizeScale"
                render={({ field }) => (
                  <FormItem className="rounded-lg border p-4 shadow space-y-3">
                    <div className="flex items-center justify-between">
                       <FormLabel>{translate('textSizeScaleLabel')}</FormLabel>
                       <span className="text-sm text-muted-foreground">{(currentTextSizeScale * 100).toFixed(0)}%</span>
                    </div>
                    <FormControl>
                      <Slider
                        value={[field.value]} 
                        onValueChange={(value) => field.onChange(value[0])} 
                        min={0.8}
                        max={2}
                        step={0.1}
                        aria-label={translate('textSizeScaleLabel')}
                      />
                    </FormControl>
                    <FormDescription>
                        {translate('textSizeScaleDescriptionHelp', { value: (currentTextSizeScale * 100).toFixed(0) })}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Separator />

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
