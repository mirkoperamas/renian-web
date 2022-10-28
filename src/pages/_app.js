import Head from "next/head";
import { Web3Provider } from "../contexts/Web3/Web3Provider";
import Script from "next/script";
import "../styles/main.scss";
import { Footer, Header, WhatsappWidget } from "../components";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Renian | Registro Nacional de Identidad Animal</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/renian.ico" />
      </Head>
      <Script src="https://cdn.lordicon.com/xdjxvujz.js"></Script>
      <Web3Provider>
        <div>
          <Header />
          <Component {...pageProps} />
          <WhatsappWidget />
          <Footer />
        </div>
      </Web3Provider>
    </>
  );
}

export default MyApp;
