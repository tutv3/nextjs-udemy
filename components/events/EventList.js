import React from "react";
import EventItem from "./EventItem";
import styles from "./event-list.module.css";
import ErrorAlert from "../ui/error-alert";

const EventList = ({ events }) => {
  if (events && events.length === 0) {
    return <ErrorAlert> Event List is empty</ErrorAlert>;
  }
  return (
    <ul className={styles.list}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
};

export default EventList;
