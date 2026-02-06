import Navbar from '@/components/Navbar';
import "./globals.css";
import ToasterProvider from '@/components/ToasterProvider';
import { LanguageProvider } from '@/context/LanguageContext';
import { Cairo, Fira_Code, Press_Start_2P } from 'next/font/google';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900', '1000'],
  variable: '--font-cairo',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

const pressStart2P = Press_Start_2P({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-press-start',
  display: 'swap',
});


const authorName = "Mohammed Kamal";
const siteName = "Mohammed Portfolio";
const siteDescription = "Welcome to my portfolio! I’m a passionate frontend developer specializing in React, Three.js, and Framer Motion.";
const siteUrl = "https://mohammed-kamal.netlify.app";
const siteImage = `${siteUrl}/myimage.webp`;
const primaryColor = "#00ffff";
const secondaryColor = "#ff00ff";

// Next Metadata
export const metadata = {
  title: `${authorName} Portfolio | Frontend Developer`,
  description: siteDescription,
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Web Development",
    "Framer Motion",
    "Web Developer Portfolio",
    "مطور واجهات أمامية",
    "مبرمج ريأكت",
    "تطوير مواقع",
    `${authorName} Portfolio`,
  ],
  authors: [{ name: authorName }],
  creator: authorName,
  openGraph: {
    title: `${authorName} Portfolio | Frontend Developer`,
    description: "Check out my latest projects and skills in frontend development!",
    url: siteUrl,
    siteName: siteName,
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: `${authorName}Portfolio Preview`,
      },
    ],
    locale: "en_US",
    type: "website",
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
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": authorName,
    "url": siteUrl,
    "image": siteImage,
    "jobTitle": "Frontend Developer",
    "sameAs": [
      // Add your social links here if they are in your contact data
      "https://github.com/mohammed-kamal",
      "https://linkedin.com/in/mohammed-kamal"
    ],
    "description": siteDescription
  };

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" className={`${cairo.variable} ${firaCode.variable} ${pressStart2P.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body className={`antialiased bg-black text-white`}>
        <LanguageProvider>
          <ToasterProvider />
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
