
import type {Metadata} from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';

export const metadata: Metadata = {
  title: {
    default: 'GM Beauty House | Salón, Barbería & Boutique en el Sur de Quito',
    template: '%s | GM Beauty House'
  },
  description: 'Descubre GM Beauty House en el Sur de Quito. Una experiencia editorial de lujo que combina Salón de Belleza, Barbería de Autor, Boutique de Moda, Diseño de Interiores con Modulares GM y un Lounge VIP.',
  keywords: ['Barbería Quito Sur', 'Salón de Belleza Quito', 'Diseño de Interiores Ecuador', 'Modulares GM', 'Boutique de Lujo Quito', 'Gamer Lounge Quito', 'Balayage Quito'],
  authors: [{ name: 'GM Beauty House' }],
  creator: 'GM Beauty House',
  publisher: 'GM Beauty House',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_EC',
    url: 'https://gmbeautyhouse.com',
    title: 'GM Beauty House | El Manifiesto de la Estética Moderna',
    description: 'Belleza, Moda y Diseño de Interiores de Vanguardia en un solo lugar.',
    siteName: 'GM Beauty House',
    images: [
      {
        url: 'https://picsum.photos/seed/gm-og/1200/630',
        width: 1200,
        height: 630,
        alt: 'GM Beauty House Experience',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GM Beauty House | Concept Store VIP',
    description: 'La curaduría estética definitiva en Quito.',
    images: ['https://picsum.photos/seed/gm-twitter/1200/630'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "GM Beauty House",
              "image": "https://picsum.photos/seed/gm-schema/800/600",
              "@id": "https://gmbeautyhouse.com",
              "url": "https://gmbeautyhouse.com",
              "telephone": "+593987654321",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Rosa Yeira 420 y Serapio Japeravi",
                "addressLocality": "Quito",
                "addressRegion": "Pichincha",
                "postalCode": "170111",
                "addressCountry": "EC"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -0.22985,
                "longitude": -78.52495
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "20:00"
              },
              "sameAs": [
                "https://www.facebook.com/gmbeautyhouse",
                "https://www.instagram.com/gmbeautyhouse"
              ],
              "department": [
                {
                  "@type": "BeautySalon",
                  "name": "GM Beauty Salon",
                  "description": "Servicios de peluquería, color editorial y cuidado capilar en el sur de Quito."
                },
                {
                  "@type": "BarberShop",
                  "name": "GM Barber Shop",
                  "description": "Barbería de autor y cuidado masculino tradicional con toques modernos."
                },
                {
                  "@type": "ClothingStore",
                  "name": "GM Boutique",
                  "description": "Moda exclusiva y perfumería de lujo en el corazón del sur."
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground overflow-x-hidden">
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
