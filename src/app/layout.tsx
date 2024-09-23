import type { Metadata } from "next";
import { Poppins } from "next/font/google"

import "primereact/resources/themes/lara-light-blue/theme.css";
import Providers from "./providers";

const poppins = Poppins({ subsets: ["latin"], weight: "400" });

import "./globals.css";
import Navbar from "@/features/general/components/Navbar";
import { NextUIProvider } from "@nextui-org/react";

export const metadata: Metadata = {
  title: "Consultorio Medico",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${poppins.className} flex flex-col`}
      >
        <NextUIProvider>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </NextUIProvider>
      </body>
    </html>
  );
}
