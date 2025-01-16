import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WalletProvider } from "@/context/WalletContext";
import { LaserEyesProvider, MAINNET } from "@omnisat/lasereyes";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import ClientProvider from "@/context/QueryClientContext";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ordinalbots Assessment",
  description: "Ordinalbots assessment for front-end",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  antialiased `}
      >
        <LaserEyesProvider config={{ network: MAINNET }}>
          <WalletProvider>
            <ClientProvider >
              <Navbar />
              <div className="min-h-screen px-4 sm:px-12 md:px-36 bg-scroll bg-neutral-900  text-white">
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
                {children}
              </div>
            </ClientProvider>
          </WalletProvider>
        </LaserEyesProvider>
      </body>
    </html>
  );
}
