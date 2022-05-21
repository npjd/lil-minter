import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import SubmitNFTForm from '../components/Form/SubmitNFTForm'
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

        <div className="mt-6 w-5/6 ">
          <SubmitNFTForm/>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
