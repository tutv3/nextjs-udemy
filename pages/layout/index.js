import React, { useContext } from "react";
import Notification from "../../components/ui/notification";
import { NotificationContext } from "../../context/notification-context";
import MainHeader from "./header";

const Layout = ({ children }) => {
  const { notification } = useContext(NotificationContext);
  return (
    <div className="main-wrapper">
      <MainHeader />
      <div className="main-container py-2">{children}</div>
      <Notification
        title={notification?.title}
        status={notification?.status}
        message={notification?.message}
        isShow={!!notification}
      />
    </div>
  );
};

export default Layout;
