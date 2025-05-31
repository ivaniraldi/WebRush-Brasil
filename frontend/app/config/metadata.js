export const viewport = {
  themeColor: "#a855f7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export const defaultMetadata = {
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WebRush Brasil",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    maxSnippets: -1,
    maxImagePreview: "large",
  },
  alternates: {
    canonical: "https://webrushbrasil.com.br",
    languages: {
      "pt-BR": "https://webrushbrasil.com.br",
      en: "https://webrush.com.br/en",
    },
  },
  authors: [{ name: "WebRush Brasil" }],
}; 