import '@/styles/globals.css'
import '@/styles/main.scss';
import type { AppProps } from 'next/app'
import {NextUIProvider} from '@nextui-org/react'
import MainNav from '@/components/MainNav'





export default function App({ Component, pageProps }: AppProps) {
  return (
  <NextUIProvider>
    {/* <MainNav></MainNav> */}
    <Component {...pageProps} />
  </NextUIProvider>
  )
}
