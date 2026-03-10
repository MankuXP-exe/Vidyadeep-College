import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/components/providers";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });

const siteUrl = "https://vidyadeep-paramedical-college.vercel.app";
const title = "Vidyadeep Paramedical College | Premium Medical Education in Gurugram";
const description =
  "Vidyadeep Paramedical College offers premium diploma and degree programs in nursing, lab technology, physiotherapy, and allied healthcare with modern facilities and placement support.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Vidyadeep Paramedical College",
    images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: "Vidyadeep Paramedical College" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/logo.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: "Vidyadeep Paramedical College",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Civil Hospital, Opp Nayara Petrol Pump, Haily Mandi Road, Farrukhnagar",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      addressCountry: "India",
    },
    telephone: ["9992101666", "7988348872", "07056098341"],
    sameAs: [
      "https://youtube.com/@vidyadeepparamedicalcollege",
      "https://www.instagram.com/vidyadeepparamedicalinstitute/",
      "https://maps.app.goo.gl/GVCa31PatoJK62yq6",
    ],
  };

  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <Providers>
          {children}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        </Providers>
      </body>
    </html>
  );
}
