import Head from "next/head";
import { useRef } from "react";
import EventList from "../components/events/EventList";
import { getFeaturedEvents } from "../utils/api-data";

function Home({ events }) {
  const emailRef = useRef();
  const feedbackRef = useRef();

  function submitFeedbackHandler(e) {
    e.preventDefault();
    const { value: emailValue } = emailRef.current;
    const { value: feedbackValue } = feedbackRef.current;
    console.log(emailValue, feedbackValue);
  }

  return (
    <div>
      <Head>
        <title>Book An Events</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Fell free & enjoy to book an event" />
      </Head>
      <form onSubmit={submitFeedbackHandler}>
        <div>
          <label htmlFor="email">Your email</label>
          <input type="email" name="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <input type="text" name="feedback" id="feedback" ref={feedbackRef} />
        </div>
        <input type="submit" value="Send feedback" />
      </form>
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
