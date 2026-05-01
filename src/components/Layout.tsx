import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { I18nProvider } from "@/lib/i18n";
import { CartProvider } from "@/lib/cart";
import { ThemeProvider } from "@/lib/theme";
import { Toaster } from "@/components/ui/sonner";

export function Layout() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
            <Toaster position="top-center" />
          </div>
        </CartProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
