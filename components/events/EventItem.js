import React from "react";
import styles from "./event-item.module.css";
import CustomButton from "../ui/custom-button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import Image from "next/image";

const EventItem = ({ event }) => {
  const { image, title, date, location, id } = event;
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
  return (
    <li className={styles.item}>
      <Image
        className={styles.image}
        src={`/${image}`}
        alt={title}
        width={340}
        height={160}
      />
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
          <address> {location?.replace(",", "\n")} </address>
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
