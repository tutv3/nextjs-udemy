import { useContext, useState, useEffect } from "react";

import classes from "./notification.module.css";
import { NotificationContext } from "../../context/notification-context";

function Notification(props) {
  const notificationCtx = useContext(NotificationContext);
  const [progressWidth, setProgressWidth] = useState(0);
  const { title, message, status, isShow } = props;

  useEffect(() => {
    if (status === "success" || status === "error") {
      for (let i = 1; i <= 40; i++) {
        setTimeout(() => {
          setProgressWidth(i * 2.5);
        }, 125 * i);
      }
    } else {
      setProgressWidth(0);
    }
    setTimeout(() => {
      setProgressWidth(0);
    }, 5000);
  }, [status]);

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses} ${
    isShow ? classes.show : ""
  }`;

  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
      <div className={classes.progress}>
        <div
          className={classes.progressRunning}
          style={{
            width: `${progressWidth}%`
          }}
        ></div>
      </div>
    </div>
  );
}

export default Notification;
