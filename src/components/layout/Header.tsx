import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { CartButton } from "@/components/cart/CartButton";
import { openMenuDrawer } from "@/components/products/MenuDrawer";
import { Logo } from "@/components/shared/Logo";
import { PlantToggle } from "@/components/shared/PlantToggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    id: "sobre",
    label: "Sobre",
  },
  {
    id: "como-funciona",
    label: "Como funciona",
  },
  {
    id: "produtos",
    label: "Cardápio",
  },
  {
    id: "escolas",
    label: "Escolas",
  },
  {
    id: "faq",
    label: "Dúvidas",
  },
] as const;

function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);

  if (!element) {
    return;
  }

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      let currentSection = "";

      for (const item of NAV_ITEMS) {
        const section = document.getElementById(item.id);

        if (!section) {
          continue;
        }

        if (section.getBoundingClientRect().top <= 160) {
          currentSection = item.id;
        }
      }

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavigation = (sectionId: string) => {
    setMobileMenuOpen(false);

    window.setTimeout(() => {
      scrollToSection(sectionId);
    }, 100);
  };

  const handleOpenMenu = () => {
    setMobileMenuOpen(false);

    window.setTimeout(() => {
      openMenuDrawer();
    }, 100);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/95 shadow-sm backdrop-blur"
          : "border-transparent bg-background/85 backdrop-blur",
      )}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <button
          type="button"
          aria-label="Voltar ao início"
          onClick={() => handleNavigation("inicio")}
          className="shrink-0"
        >
          <Logo />
        </button>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map((item) => {
            const active = activeSection === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigation(item.id)}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm transition-colors",
                  active
                    ? "bg-accent font-semibold text-primary"
                    : "text-foreground/75 hover:bg-accent hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <PlantToggle />

          <CartButton />

          <Button
            type="button"
            onClick={handleOpenMenu}
            className="hidden rounded-full lg:inline-flex"
          >
            Ver cardápio
          </Button>

          <Sheet
            open={mobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
          >
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <nav
                className="mt-8 flex flex-col gap-2"
                aria-label="Navegação móvel"
              >
                {NAV_ITEMS.map((item) => {
                  const active = activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleNavigation(item.id)}
                      className={cn(
                        "rounded-xl px-4 py-3 text-left text-base transition-colors",
                        active
                          ? "bg-accent font-semibold text-primary"
                          : "text-foreground/80 hover:bg-accent",
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}

                <Button
                  type="button"
                  size="lg"
                  onClick={handleOpenMenu}
                  className="mt-4 w-full rounded-full"
                >
                  Ver cardápio completo
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}