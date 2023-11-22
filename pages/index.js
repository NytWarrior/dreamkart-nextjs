import { Inter } from 'next/font/google'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head>
        <title>DreamKart - Live the dream!!</title>
        <meta name='description' content='DreamKart - Live the dream!!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar />
      <div>
        <img src='/2.jpg' alt='' />
      </div>
      <Footer />
    </div>
  )
}
