import * as ProgressPrimitive from '@radix-ui/react-progress';
import React from 'react';

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      className={`relative overflow-hidden bg-gray-200 rounded-full h-2 ${className}`}
    >
      <ProgressPrimitive.Indicator
        className="bg-blue-600 h-full transition-all"
        style={{ width: `${value}%` }}
      />
    </ProgressPrimitive.Root>
  );
} 