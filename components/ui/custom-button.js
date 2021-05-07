import React from "react";
import Link from "next/link";
import styles from "./button.module.css";

const CustomButton = ({ children, link, onClick, type }) => {
  if (link) {
    return (
      <Link href={link}>
        <a className={styles.btn}>{children}</a>
      </Link>
    );
  }
  return (
    <button className={styles.btn} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default CustomButton;
