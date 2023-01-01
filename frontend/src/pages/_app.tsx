import "@styles/global.scss";
import type { AppProps } from "next/app";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { Inter, JetBrains_Mono } from "@next/font/google";

import { SocketProvider } from "@context/Socket";
import { SessionProvider } from "@context/Session";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Roboto", "sans-serif"],
});
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  fallback: ["Roboto Mono", "monospace"],
});

const mantineTheme: MantineThemeOverride = {
  colorScheme: "light",
  fontFamily: inter.style.fontFamily,
  headings: { fontFamily: inter.style.fontFamily },
  fontFamilyMonospace: jetBrainsMono.style.fontFamily,
  lineHeight: "1.5rem",
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MantineProvider withGlobalStyles withCSSVariables theme={mantineTheme}>
        <SocketProvider>
          <SessionProvider>
            <Component {...pageProps} />
          </SessionProvider>
        </SocketProvider>
      </MantineProvider>
    </>
  );
}
