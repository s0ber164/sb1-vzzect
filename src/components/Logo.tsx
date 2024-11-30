import { Box } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Box className="w-8 h-8" />
      <span className="font-semibold text-xl tracking-tight">SIS Props</span>
    </div>
  );
}