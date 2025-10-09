// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// import { Toaster } from "react-hot-toast";


// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Next Blog",
//   description: "A simple blog built with Next.js, Tailwind CSS, and shadcn/ui.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
//       >
    
//          <div>
//            {children}
//          </div>
//          <Toaster position="top-right" reverseOrder={false} />
//       </body>
//     </html>
//   );
// }











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
    <html lang="en">
      <body
        className={`${poppins.variable} font-sans antialiased`} 
      >
        <div>
           
              {children}
            
           
        </div>
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
