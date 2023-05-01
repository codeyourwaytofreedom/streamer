import Head from 'next/head'
import Homie from '../components/Homie'
import Layout from '../components/Layout'

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
          <Homie/>
      </main>
    </>
  )
}


Home.getLayout = function getLayout(page:any) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}