import React from "react";
import Head from "next/head";
import EventSearch from "../../components/events/event-search";
import EventList from "../../components/events/EventList";
import { getAllEvents } from "../../utils/api-data";
import { useRouter } from "next/router";

const Events = ({ events }) => {
  const router = useRouter();
  const findEventHandler = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };
  return (
    <div>
      <Head>
        <title>All Events</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="List of all events" />
      </Head>
      <EventSearch onSearch={findEventHandler} />
      <EventList events={events} />
    </div>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events
    },
    revalidate: 90
  };
}

export default Events;
