import Head from "next/head";
import EventList from "../components/events/EventList";
import NewsletterRegistration from "../components/input/newsletter-registration";
import { getFeaturedEvents } from "../utils/api-data";

function Home({ events }) {
  return (
    <div>
      <Head>
        <title>Book An Events</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Fell free & enjoy to book an event" />
      </Head>
      <EventList events={events || []} />
      <NewsletterRegistration />
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
