import React, { Fragment } from "react";
import Head from "next/head";
import { getEventById, getFeaturedEvents } from "../../utils/api-data";
import EventSummary from "../../components/events/event-summary";
import EventContent from "../../components/events/event-content";
import EventLogistics from "../../components/events/event-logistics";
import Comments from "../../components/input/comments";

const EventDetail = ({ eventDetail }) => {
  if (!eventDetail) {
    return (
      <div className="center">
        <p>Loading event</p>
      </div>
    );
  }
  return (
    <Fragment>
      <Head>
        <title> {eventDetail.title} </title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={eventDetail.description} />
      </Head>
      <EventSummary title={eventDetail.title} />
      <EventLogistics
        date={eventDetail.date}
        address={eventDetail.location}
        image={eventDetail.image}
        imageAlt={eventDetail.description}
      />
      <EventContent>
        <p>{eventDetail.description}</p>
      </EventContent>
      <Comments eventId={EventDetail.id || ""} />
    </Fragment>
  );
};

export async function getStaticProps(context) {
  const eventDetail = await getEventById(context.params.eventId);
  return {
    props: {
      eventDetail
    },
    revalidate: 30
  };
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map((evt) => ({
    params: {
      eventId: evt.id
    }
  }));
  return {
    paths,
    fallback: "blocking"
  };
}

export default EventDetail;
