// src/components/layout/SiteHeader.tsx
"use client";
import Link from 'next/link';
import { Leaf, Languages, UserCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export function SiteHeader() {
  const { language, setLanguage, translate, availableLanguages, appName } = useLanguage();
  const pathname = usePathname();

  const baseLinkClasses = "transition-colors hover:text-foreground/80";
  const activeClass = "text-foreground font-medium";
  const inactiveClass = "text-foreground/60";

  const [homeLinkEffectiveClass, setHomeLinkEffectiveClass] = useState(inactiveClass);
  const [aboutLinkEffectiveClass, setAboutLinkEffectiveClass] = useState(inactiveClass);

  useEffect(() => {
    setHomeLinkEffectiveClass(pathname === "/" ? activeClass : inactiveClass);
    setAboutLinkEffectiveClass(pathname === "/about" ? activeClass : inactiveClass);
  }, [pathname, activeClass, inactiveClass]); // Add dependencies

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block text-lg">{appName}</span>
        </Link>
        
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
          <Link
            href="/"
            className={cn(baseLinkClasses, homeLinkEffectiveClass)}
          >
            {translate('navHome')}
          </Link>
          <Link
            href="/about"
            className={cn(baseLinkClasses, aboutLinkEffectiveClass)}
          >
            {translate('navAbout')}
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="text-sm">
                <Languages className="mr-2 h-4 w-4" />
                {availableLanguages.find(l => l.code === language)?.name || translate('language')}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link href="/profile">
            <Button variant="ghost" size="icon" aria-label={translate('navProfile')}>
              <UserCircle className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
      <Separator />
    </header>
  );
}
