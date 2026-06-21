import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Navigate,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

import { CartDrawer } from "@/components/cart/CartDrawer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { GrowingPlant } from "@/components/shared/GrowingPlant";
import { Toaster } from "@/components/ui/sonner";
import { captureUtm } from "@/lib/utm";

function NotFoundComponent() {
  return <Navigate to="/" replace />;
}

function ErrorComponent({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Algo deu errado</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Tente novamente ou volte para o início.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Tentar novamente
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Nutri4Kids | Lanches infantis para famílias e escolas",
      },
      {
        name: "description",
        content:
          "Conheça os lanches, kits e soluções da Nutri4Kids para famílias e escolas parceiras. Monte o pedido e confirme pelo WhatsApp.",
      },
      {
        name: "author",
        content: "Nutri4Kids",
      },
      {
        name: "theme-color",
        content: "#c4654a",
      },
      {
        property: "og:title",
        content: "Nutri4Kids | Lanches infantis para famílias e escolas",
      },
      {
        property: "og:description",
        content:
          "Alimentação infantil preparada para famílias e escolas parceiras, com pedidos pelo WhatsApp.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Nutri4Kids | Lanches infantis para famílias e escolas",
      },
      {
        name: "twitter:description",
        content:
          "Lanches, kits e soluções personalizadas para famílias e escolas.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Nunito+Sans:wght@600;700;800;900&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>

      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    captureUtm();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-dvh flex-col">
        <AnnouncementBar />
        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </div>

      <CartDrawer />
      <GrowingPlant />
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
