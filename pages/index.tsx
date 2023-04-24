import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Streamer</title>
        <meta name="description" content="Video Streamer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/live.png" />
      </Head>
      <main>
          <h1>Hello Streamer</h1>
      </main>
    </>
  )
}
