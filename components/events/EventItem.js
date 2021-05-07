import React from "react";
import styles from "./event-item.module.css";
import CustomButton from "../ui/custom-button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

const EventItem = ({ event }) => {
  const { image, title, date, location, id } = event;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <li className={styles.item}>
      <img className={styles.image} src={`/${image}`} alt={title} />
      <div className={styles.content}>
        <div className={styles.title}>
          <h2> {title} </h2>
        </div>
        <div className={styles.date}>
          <DateIcon />
          <time> {humanReadableDate} </time>
        </div>
        <div className={styles.address}>
          <AddressIcon />
          <address> {location.replace(",", "\n")} </address>
        </div>
        <div className={styles.actions}>
          <CustomButton link={`/events/${id}`}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </CustomButton>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
