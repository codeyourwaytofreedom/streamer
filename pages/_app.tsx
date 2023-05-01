import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { ComponentClass } from 'react';
import NextComponentType from "next/app";
import NextPageContext from "next/app";

interface PageWithLayout extends NextComponentType<NextPageContext, any, any>, ComponentClass {
  getLayout?: (page: JSX.Element) => JSX.Element
}

export default function App({ Component, pageProps }: AppProps) {
  
  const getLayout = (Component as PageWithLayout).getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}
