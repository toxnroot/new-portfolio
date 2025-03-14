import Navbar from '@/components/Navbar';
import "./globals.css";
import { Toaster } from 'react-hot-toast';


// ✅ المتغيرات المشتركة
const authorName = "Mohammed Kamal";
const siteName = "Mohammed Portfolio";
const siteDescription = "Welcome to my portfolio! I’m a passionate frontend developer specializing in React, Three.js, and Framer Motion.";
const siteUrl = "https://mohammed-kamal.netlify.app"; // حط رابطك هنا
const siteImage = `${siteUrl}/myimage.webp`; // رابط الصورة
const primaryColor = "#00ffff"; // الأزرق المستخدم
const secondaryColor = "#ff00ff"; // الزهري المستخدم

// ✅ Metadata
export const metadata = {
  title: `${authorName} Portfolio | Frontend Developer`,
  description: siteDescription,
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Web Development",
    "Framer Motion",
    "Web Developer Portfolio",
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
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Meta Tags إضافية */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={primaryColor} />
        <meta name="author" content={authorName} />

        {/* OpenGraph */}
        <meta property="og:title" content={`${authorName}'Portfolio | Frontend Developer`} />
        <meta property="og:description" content="Check out my latest projects and skills in frontend development!" />
        <meta property="og:image" content={siteImage} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${authorName}'Portfolio | Frontend Developer`} />
        <meta name="twitter:description" content="Check out my latest projects and skills in frontend development!" />
        <meta name="twitter:image" content={siteImage} />
      </head>

      <body className={`antialiased bg-black text-white`}>
      <Toaster position="top-center" reverseOrder={false} />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
