import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const SITE = "https://normacor.es";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Normacor | Descubre qué obligaciones legales tiene tu empresa",
    template: "%s | Normacor",
  },
  description:
    "Haz el test gratuito y descubre en pocos minutos qué normativas te aplican, cuánto cuesta implantarlas y contrátalas online.",
  applicationName: "Normacor",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE,
    siteName: "Normacor",
    title: "Normacor | Descubre qué obligaciones legales tiene tu empresa",
    description:
      "Haz el test gratuito y descubre en pocos minutos qué normativas te aplican, cuánto cuesta implantarlas y contrátalas online.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    /* suppressHydrationWarning: el script de abajo añade la clase `js` al
       <html> antes de que React hidrate, así que el marcado del servidor y
       el del cliente no coinciden a propósito. */
    <html
      lang="es"
      className={`${instrument.variable} ${interTight.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Marca que hay JS antes de pintar nada: el CSS solo esconde lo que
            va a animarse si GSAP va a poder mostrarlo después. */}
        <script
          dangerouslySetInnerHTML={{
            __html: 'document.documentElement.classList.add("js")',
          }}
        />
        {children}
      </body>
    </html>
  );
}
