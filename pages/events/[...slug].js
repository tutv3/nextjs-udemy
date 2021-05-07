import React from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../data/dummy";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/results-title";
import CustomButton from "../../components/ui/custom-button";
import ErrorAlert from "../../components/ui/error-alert";

const FilteredEvents = () => {
  const router = useRouter();
  let [year, month] = router.query.slug || [];
  if (!year || !month) {
    return <p className='center'>Loading...</p>;
  }
  console.log(year, month);
  year = +year;
  month = +month;
  if (isNaN(year) || isNaN(month) || month < 1 || year > 2030 || month > 12) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid Filter Value</p>
        </ErrorAlert>
        <div className='center'>
          <CustomButton link='/events'>Show All Events</CustomButton>
        </div>
      </>
    );
  }
  const eventResults = getFilteredEvents(+year, +month);

  if (!eventResults || eventResults.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p className='center'>No Events Found</p>
        </ErrorAlert>
        <div className='center'>
          <CustomButton link='/events'>Show All Events</CustomButton>
        </div>
      </>
    );
  }

  const date = new Date(year, month - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList events={eventResults || []} />
    </div>
  );
};

export default FilteredEvents;
