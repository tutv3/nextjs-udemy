import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/results-title";
import CustomButton from "../../components/ui/custom-button";
import ErrorAlert from "../../components/ui/error-alert";
import { getFilteredEvents } from "../../utils/api-data";
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

  if (!loadedEvents) {
    return <p>Loading events...</p>;
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === +year && eventDate.getMonth() === +month - 1
    );
  });

  if (error) {
    return (
      <>
        <ErrorAlert>
          <p>Error when fetching events</p>
        </ErrorAlert>
        <div className="center">
          <CustomButton link="/events">Show All Events</CustomButton>
        </div>
      </>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p className="center">No Events Found</p>
        </ErrorAlert>
        <div className="center">
          <CustomButton link="/events">Show All Events</CustomButton>
        </div>
      </>
    );
  }

  const dateTime = new Date(+year, +month - 1);

  return (
    <div>
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
