import Head from "next/head";
import NotiticationProvider from "../context/notification-context";
import "../styles/globals.css";
import Layout from "./layout";

function MyApp({ Component, pageProps }) {
  return (
    <NotiticationProvider>
      <Layout>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotiticationProvider>
  );
}

export default MyApp;
