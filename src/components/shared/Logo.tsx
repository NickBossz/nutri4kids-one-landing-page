import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "light";
}

export function Logo({ className }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Logo da empresa"
      className={cn(
        "h-12 w-auto object-contain",
        className,
      )}
    />
  );
}