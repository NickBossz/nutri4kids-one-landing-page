import { Button } from "@/components/ui/button";
import { Leaf, LeafyGreen } from "lucide-react";
import { useEffect, useState } from "react";

const STORAGE_KEY = "growing-plant-enabled";
const VISIBILITY_EVENT = "growing-plant-visibility";

export function PlantToggle() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const savedPreference = localStorage.getItem(STORAGE_KEY);

    if (savedPreference !== null) {
      setIsEnabled(savedPreference === "true");
    }

    setHasLoaded(true);
  }, []);

  const togglePlant = () => {
    const newValue = !isEnabled;

    setIsEnabled(newValue);
    localStorage.setItem(STORAGE_KEY, String(newValue));

    window.dispatchEvent(
      new CustomEvent<boolean>(VISIBILITY_EVENT, {
        detail: newValue,
      }),
    );
  };

  if (!hasLoaded) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled
        aria-label="Carregando preferência da planta"
        className="h-9 w-9 rounded-full"
      >
        <Leaf className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={isEnabled ? "secondary" : "ghost"}
      size="icon"
      onClick={togglePlant}
      aria-pressed={isEnabled}
      aria-label={
        isEnabled
          ? "Desativar planta animada"
          : "Ativar planta animada"
      }
      title={
        isEnabled
          ? "Desativar planta animada"
          : "Ativar planta animada"
      }
      className={[
        "relative h-9 w-9 shrink-0 rounded-full transition-all",
        isEnabled
          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 hover:text-emerald-800"
          : "text-muted-foreground hover:bg-emerald-50 hover:text-emerald-700",
      ].join(" ")}
    >
      {isEnabled ? (
        <LeafyGreen className="h-[18px] w-[18px]" />
      ) : (
        <Leaf className="h-[18px] w-[18px] opacity-60" />
      )}

      <span
        aria-hidden="true"
        className={[
          "absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full border-2 border-background",
          isEnabled ? "bg-emerald-500" : "bg-muted-foreground/40",
        ].join(" ")}
      />
    </Button>
  );
}