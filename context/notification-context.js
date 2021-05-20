import { createContext, useState } from "react";

export const NotificationContext = createContext({
  notification: null,
  showNotification: () => {},
  hideNotification: () => {
    console.log("hide noti");
  }
});

const NotiticationProvider = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState(null);

  const showNotification = (notiData) => {
    setActiveNotification(notiData);
  };

  const hideNotification = (notiData) => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotification,
    hideNotification: hideNotification
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotiticationProvider;
