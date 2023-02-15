import '@/styles/reset.css';
import '@/styles/body.css';
import 'public/fonts/colaterasoft.css';
import 'public/fonts/slimfit.css';

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}