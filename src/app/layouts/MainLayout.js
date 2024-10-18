
import localFont from "next/font/local";
import Image from "next/image";
import "../globals.css";
import Link from "next/link";
import Header from './header';
import Headerbar from './Headerbar';
import SideNavigation from './SideNavigation';

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {

  return (
    <html data-theme="dracula" lang="en">
      <Header />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Headerbar  />
        <SideNavigation />
        {children}
        
        <footer className="row-start-3 fixed flex gap-6 flex-wrap items-center justify-center">
          {/* Footer content goes here */}
        </footer>
      </body>
    </html>
  );
}
