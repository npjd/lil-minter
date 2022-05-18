import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Hero />

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full"></div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
