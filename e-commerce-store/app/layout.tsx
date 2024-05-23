import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

import "./globals.css";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";

const font = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Store",
  description: "E-commerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <StoreProvider>
          <ModalProvider />
          <ToastProvider />
          <Navbar />
          {children}

          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
