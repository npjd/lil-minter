import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import ConnectWallet from '../components/Form/ConnectWallet'
import SubmitNFTForm from '../components/Form/SubmitNFTForm'
import Hero from '../components/Hero'

const Home: NextPage = () => {
  return (
    <div className="flex flex-col py-2 h-screen">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <div className="flex flex-row-reverse  w-full h-16 -ml-10 mt-8">
          <ConnectWallet />
        </div>
      </nav>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Hero />

        <div className="mt-6 w-5/6 ">
          <SubmitNFTForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
