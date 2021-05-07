import Head from "next/head";
import EventList from "../components/events/EventList";
import styles from "../styles/Home.module.css";
import { getFeaturedEvents } from "../utils/api-data";

function Home({ events }) {
  return (
    <div>
      <Head>
        <title>Book An Events</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Programming!</a>
      </h1>
      <EventList events={events || []} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getFeaturedEvents();
  return {
    props: {
      events: events || []
    },
    revalidate: 900
  };
}

export default Home;
