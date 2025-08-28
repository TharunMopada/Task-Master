import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  onClick, 
  className 
}) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl",
        "gradient-primary hover:opacity-90 transition-all duration-300",
        "transform hover:scale-110 active:scale-95",
        "animate-pulse hover:animate-none",
        "shadow-glow",
        className
      )}
      size="icon"
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Add new task</span>
    </Button>
  );
};