// pages/_app.tsx
import type { AppProps } from "next/app"
import { createGlobalStyle } from "styled-components"
import "normalize.css"

const GlobalStyle = createGlobalStyle`
  html {
    font-family: sans-serif;
    font-size: 90%;
  }

  body {
    font-size: 14px;
    font-size: 1.4rem;
  }
`

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}
