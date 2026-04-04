import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "@/app/globals.css";
import { Providers } from "@/components/providers";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });

const siteUrl = "https://vidyadeepinstitute.in";
const title = {
  template: "%s | Vidyadeep Paramedical Institute",
  default: "Vidyadeep Paramedical Institute | Best Paramedical College in Gurugram, Haryana",
};
const description =
  "Vidyadeep Paramedical Institute (Farrukhnagar, Gurugram) is a premier healthcare education hub offering diploma and degree programs in Nursing (ANM/GNM), MLT, Physiotherapy, and Pharmacy with 100% placement assistance.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    "Vidyadeep Paramedical Institute",
    "Best paramedical college in Gurugram",
    "Nursing college in Haryana",
    "DMLT course in Delhi NCR",
    "Physiotherapy diploma Gurugram",
    "ANM GNM admission 2024",
    "Medical lab technology Haryana",
    "Paramedical institute Farrukhnagar",
    "Healthcare education India",
    "Vidyadeep Institute",
  ],
  authors: [{ name: "Vidyadeep Paramedical Institute" }],
  creator: "Vidyadeep Paramedical Institute",
  publisher: "Vidyadeep Paramedical Institute",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Vidyadeep Paramedical Institute | Premium Medical Education",
    description,
    url: siteUrl,
    siteName: "Vidyadeep Paramedical Institute",
    images: [{ url: "/images/logo.png", width: 1200, height: 630, alt: "Vidyadeep Paramedical Institute Campus" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidyadeep Paramedical Institute | Leading Healthcare Education",
    description,
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: "Vidyadeep Paramedical Institute",
    alternateName: "Vidyadeep Institute",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    description: "A premier health and educational foundation committed to healthcare excellence and rural upliftment.",
    founder: {
      "@type": "Person",
      name: "Dr. Sandeep Singh",
    },
    foundingDate: "2020",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Civil Hospital, Opp Nayara Petrol Pump, Haily Mandi Road, Farrukhnagar",
      addressLocality: "Gurugram",
      addressRegion: "Haryana",
      postalCode: "122506",
      addressCountry: "India",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "28.4501",
      longitude: "76.8242",
    },
    telephone: ["+919992101666", "+917988348872", "+9107056098341"],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "17:00",
    },
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
