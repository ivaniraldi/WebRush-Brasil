// layout.js (mover los metadatos fuera de la sección de cliente)
import { Montserrat, Poppins } from "next/font/google";

// Configuración del viewport
export const viewport = {
  themeColor: "#a855f7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

// Metadata optimizada para SEO (fuera del componente)
export const metadata = {
  title: "WebRush Brasil - Seu sucesso, nossa missão tecnológica",
  description:
    "Transforme seu negócio com as mais recentes soluções digitais. Desenvolvimento web, apps móveis e muito mais.",
  manifest: "./manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WebRush Brasil",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "./favicon.ico",
    shortcut: "./favicon.ico",
    apple: "./favicon.ico",
  },
  openGraph: {
    title: "WebRush Brasil - Seu sucesso, nossa missão tecnológica",
    description:
      "Soluções digitais de ponta para otimizar e transformar seu negócio.",
    url: "https://webrushbrasil.com.br",
    siteName: "WebRush Brasil",
    locale: "pt_BR",
    type: "website",
    image: "https://i.imgur.com/z2yA6hn.png",
    imageAlt: "WebRush Brasil -  Seu sucesso, nossa missão tecnológica",
  },
  twitter: {
    card: "summary_large_image",
    title: "WebRush Brasil - Seu sucesso, nossa missão tecnológica",
    description:
      "Soluções digitais de ponta para otimizar e transformar seu negócio.",
    image: "https://i.imgur.com/z2yA6hn.png",
    creator: "@webrushbrasil",
  },
  robots: {
    index: true,
    follow: true,
    maxSnippets: -1,
    maxImagePreview: "large",
  },
  alternates: {
    canonical: "https://webrushbrasil.com.br",
    hreflang: {
      "pt-BR": "https://webrushbrasil.com.br",
      en: "https://webrush.com.br/en",
    },
  },
};

import ClientLayout from "./ClientLayout";

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

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="./favicon.ico" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://webrushbrasil.com.br" />
        <link rel="manifest" href="./manifest.json" />
        <meta name="application-name" content="WebRush Brasil" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/*  <!-- Preconnect to external domains --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://i.imgur.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        <meta name="apple-mobile-web-app-title" content="WebRush Brasil" />
        <meta
          name="description"
          content="Transforme seu negócio com soluções digitais inovadoras."
        />
        <meta
          name="keywords"
          content="desenvolvimento web, marketing digital, soluções digitais, tecnologia, inovação, web development, mobile development, software development, custom software development, qatest"
        />
        <meta name="author" content="WebRush Brasil" />
        <meta name="geo.region" content="BR" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#000000" />

        <meta name="revisit-after" content="7 days" />
        <meta
          name="robots"
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="apple-touch-icon" href="./icons/apple-touch-icon.png" />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Montserrat:wght@700&display=swap"
          rel="stylesheet"
        />
        <script
          src="https://kit.fontawesome.com/d71e0cdf3f.js"
          crossOrigin="anonymous"
        ></script>

        {/* Meta OpenGraph */}
        <meta
          property="og:title"
          content="WebRush Brasil - Seu sucesso, nossa missão tecnológica"
        />
        <meta
          property="og:description"
          content="Soluções digitais de ponta para otimizar e transformar seu negócio."
        />
        <meta property="og:url" content="https://webrushbrasil.com.br" />
        <meta property="og:image" content="https://i.imgur.com/z2yA6hn.png" />
        <meta
          property="og:image:alt"
          content="WebRush Brasil - Seu sucesso, nossa missão tecnológica"
        />
        <meta property="og:site_name" content="WebRush Brasil" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />

        {/* Meta Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="WebRush Brasil - Seu sucesso, nossa missão tecnológica"
        />
        <meta
          name="twitter:description"
          content="Soluções digitais de ponta para otimizar e transformar seu negócio."
        />
        <meta name="twitter:image" content="https://i.imgur.com/z2yA6hn.png" />
        <meta name="twitter:creator" content="@webrushbrasil" />
        {/* Google Tag Manager */}
        <script
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

        {/* Facebook Pixel */}
        <script
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
      </head>
      <body
        className={`${montserrat.variable} ${poppins.variable} font-sans min-h-screen flex flex-col bg-[#0f172a] text-white transition-colors duration-300`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WZ6FKK4H"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=644276235121835&ev=PageView&noscript=1"
            alt="fb-pixel"
          />
        </noscript>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

import "./globals.css";
