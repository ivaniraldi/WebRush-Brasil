// app/layout.js
import { Montserrat, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { viewport, defaultMetadata } from "./config/metadata";

// Font configurations
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Export viewport configuration
export { viewport };

// Metadata for SEO
export const metadata = {
  ...defaultMetadata,
  title: "WebRush Brasil - Seu sucesso, nossa missão tecnológica",
  description:
    "Transforme seu negócio com as mais recentes soluções digitais. Desenvolvimento web, apps móveis e muito mais.",
  openGraph: {
    title: "WebRush Brasil - Seu sucesso, nossa missão tecnológica",
    description:
      "Soluções digitais de ponta para otimizar e transformar seu negócio.",
    url: "https://webrushbrasil.com.br",
    siteName: "WebRush Brasil",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://i.imgur.com/z2yA6hn.png",
        alt: "WebRush Brasil - Seu sucesso, nossa missão tecnológica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebRush Brasil - Seu sucesso, nossa missão tecnológica",
    description:
      "Soluções digitais de ponta para otimizar e transformar seu negócio.",
    images: ["https://i.imgur.com/z2yA6hn.png"],
    creator: "@webrushbrasil",
  },
  keywords: [
    "desenvolvimento web",
    "marketing digital",
    "soluções digitais",
    "tecnologia",
    "inovação",
    "web development",
    "mobile development",
    "software development",
    "custom software development",
    "qatest",
  ],
};

import ClientLayout from "./ClientLayout";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Montserrat:wght@700&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://i.imgur.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <script
          src="https://kit.fontawesome.com/d71e0cdf3f.js"
          crossOrigin="anonymous"
          defer
        />
      </head>
      <body
        className={`${montserrat.variable} ${poppins.variable} font-sans min-h-screen flex flex-col bg-[#0f172a] text-white transition-colors duration-300`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WZ6FKK4H');
            `,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WZ6FKK4H"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Facebook Pixel */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !(function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)})(window,document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '644276235121835');
              fbq('track', 'PageView');
              fbq('track', 'Contact');
              fbq('track', 'Lead');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=644276235121835&ev=PageView&noscript=1"
            alt="fb-pixel"
          />
        </noscript>

        {/* Google Analytics */}
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-Y6672GD94C"
        />
        <Script
          id="google-analytics-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Y6672GD94C');
            `,
          }}
        />

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}