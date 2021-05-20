import classes from "./newsletter-registration.module.css";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { validateEmail } from "../../utils/validators";
import { NotificationContext } from "../../context/notification-context";

function NewsletterRegistration() {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const { showNotification, hideNotification } = useContext(
    NotificationContext
  );

  function registrationHandler(event) {
    event.preventDefault();

    const { value: email } = emailRef.current;

    if (!email || !validateEmail(email)) {
      setError("Email is not in valid format");
      return 1;
    }

    showNotification({
      title: "Signing up",
      status: "pending",
      message: "Registering news letter"
    });

    axios
      .post("/api/news-letter", {
        email
      })
      .then(({ data }) => {
        emailRef.current.value = "";
        showNotification({
          title: "Signed up for " + email,
          status: "success",
          message: data.msg
        });
        clearNotiTimeout();
      })
      .catch((err) => {
        showNotification({
          title: "Signed up failed with " + email,
          status: "error",
          message: err.msg
        });
        clearNotiTimeout();
      });

    return 0;
  }

  const clearNotiTimeout = () => {
    setTimeout(() => {
      hideNotification();
    }, 5000);
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            ref={emailRef}
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
      {error && <p className={classes.errorMsg}> {error} </p>}
    </section>
  );
}

export default NewsletterRegistration;
