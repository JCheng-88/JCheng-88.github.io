// src/components/product/InfoCardItem.tsx
import type { ReactNode } from 'react';

interface InfoCardItemProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export function InfoCardItem({ label, value, className }: InfoCardItemProps) {
  return (
    <div className={`flex justify-between items-start py-1 ${className}`}>
      <span className="text-sm text-muted-foreground">{label}:</span>
      <span className="text-sm font-medium text-right break-words">{value}</span>
    </div>
  );
}
