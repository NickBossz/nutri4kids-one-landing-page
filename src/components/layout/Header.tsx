import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { CartButton } from "@/components/cart/CartButton";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

import { PlantToggle } from "@/components/shared/PlantToggle";

const NAV_ITEMS = [
  {
    to: "/" as const,
    label: "Início",
  },
  {
    to: "/produtos" as const,
    label: "Cardápio",
  },
  {
    to: "/escolas" as const,
    label: "Para escolas",
  },
  {
    to: "/sobre" as const,
    label: "Sobre nós",
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/95 shadow-sm backdrop-blur"
          : "border-transparent bg-background/85 backdrop-blur",
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-4">
        <Link
          to="/"
          aria-label="Ir para a página inicial"
          className="shrink-0"
        >
          <Logo />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{
                exact: item.to === "/",
              }}
              activeProps={{
                className: "bg-accent text-primary font-semibold",
              }}
              inactiveProps={{
                className:
                  "text-foreground/75 hover:bg-accent hover:text-foreground",
              }}
              className="rounded-xl px-4 py-2 text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        
        <div className="flex items-center gap-2">
          <PlantToggle />

          <CartButton />

          <Button
            asChild
            className="hidden lg:inline-flex"
          >
            <Link to="/produtos">
              Ver cardápio
            </Link>
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
                aria-label="Abrir menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <nav
                aria-label="Navegação para dispositivos móveis"
                className="mt-8 flex flex-col gap-2"
              >
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    activeOptions={{
                      exact: item.to === "/",
                    }}
                    activeProps={{
                      className: "bg-accent text-primary font-semibold",
                    }}
                    inactiveProps={{
                      className:
                        "text-foreground/80 hover:bg-accent",
                    }}
                    className="rounded-xl px-4 py-3 text-base transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}

                <Button
                  asChild
                  size="lg"
                  className="mt-4 w-full"
                >
                  <Link
                    to="/produtos"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Ver cardápio
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}