import type { Metadata } from "next";
import { Poppins } from "next/font/google"; 
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], 
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Next Blog",
  description: "A simple blog built with Next.js, Tailwind CSS, and shadcn/ui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins antialiased bg-white dark:bg-[#0b1727] text-[#04004d] dark:text-white">
        <div>
          {children}
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}