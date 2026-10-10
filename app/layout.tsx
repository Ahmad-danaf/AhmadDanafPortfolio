import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Cedarville_Cursive, Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/main/footer";
import { MotionProvider } from "@/components/main/motion-provider";
import { Navbar } from "@/components/main/navbar";
import { StarField } from "@/components/main/star-field";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const cursive = Cedarville_Cursive({ weight: "400", subsets: ["latin"], variable: "--font-cursive" });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className,
          cursive.variable
        )}
      >
        {/* Without JS, Framer never runs, so show its initially hidden content. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: '<style>[style*="opacity:0"]{opacity:1!important;transform:none!important}</style>',
          }}
        />
        <MotionProvider>
          <StarField />
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
