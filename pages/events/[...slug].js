import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/results-title";
import CustomButton from "../../components/ui/custom-button";
import ErrorAlert from "../../components/ui/error-alert";
import { transformObjectToArray } from "../../utils/formatter";
import useSWR from "swr";

const FilteredEvents = () => {
  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();
  let [year, month] = router.query.slug || [];

  const { data, error } = useSWR(
    "https://nextjs-learning-e582d-default-rtdb.firebaseio.com/events.json"
  );

  useEffect(() => {
    if (data) {
      setLoadedEvents(transformObjectToArray(data) || []);
    }
  }, [data]);

  if (isNaN(year) || isNaN(month) || month < 1 || year > 2030 || month > 12) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid Filter Value</p>
        </ErrorAlert>
        <div className="center">
          <CustomButton link="/events">Show All Events</CustomButton>
        </div>
      </>
    );
  }

  const pageHeadData = (
    <Head>
      <title> Filtered Events </title>
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content={`All events for ${month || ""}/${year || ""}`}
      />
    </Head>
  );

  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p>Loading events...</p>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === +year && eventDate.getMonth() === +month - 1
    );
  });

  if (error) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Error when fetching events</p>
        </ErrorAlert>
        <div className="center">
          <CustomButton link="/events">Show All Events</CustomButton>
        </div>
      </Fragment>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p className="center">No Events Found</p>
        </ErrorAlert>
        <div className="center">
          <CustomButton link="/events">Show All Events</CustomButton>
        </div>
      </Fragment>
    );
  }

  const dateTime = new Date(+year, +month - 1);

  return (
    <div>
      {pageHeadData}
      <ResultsTitle date={dateTime} />
      <EventList events={filteredEvents || []} />
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterDate = params.slug;

//   const year = +filterDate[0];
//   const month = +filterDate[1];

//   if (isNaN(year) || isNaN(month) || month < 1 || year > 2030 || month > 12) {
//     return {
//       notFound: true,
//       props: {
//         hasError: true
//       }
//       // redirect: {
//       //   destination: "/error"
//       // }
//     };
//   }

//   const eventResults = await getFilteredEvents(year, month);

//   return {
//     props: {
//       eventResults,
//       date: {
//         year,
//         month
//       }
//     }
//   };
// }

export default FilteredEvents;
