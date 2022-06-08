import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertContainer from '../components/AlertContainer'

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  transition: transitions.SCALE,
  offset: '10px',
  containerStyle: {
    marginTop: '55px',
    zIndex: 9999,
  },
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlertProvider {...options} template={AlertContainer}>
      <Component {...pageProps} />{' '}
    </AlertProvider>
  )
}

export default MyApp
