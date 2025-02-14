import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

// /dist/types/components.server

const inter=Inter({subsets:["latin"]});

export const metadata = {
  title: "Wealth",
  description: "One expense tracking Platform ",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className}`}>
          {/* header */}
          <Header/>


          <main className="min-h-screen">
            {children}
          </main>
        {/* {children} */}
        {/* footer */}
        <footer className="bg-blue-50 py-12">
        <div className="container mx-auto px-4 text-center text-grey-600">
          <p>Made with love by Ayush</p>
        </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
