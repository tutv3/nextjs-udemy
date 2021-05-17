import classes from "./newsletter-registration.module.css";
import axios from "axios";
import { useRef, useState } from "react";
import { validateEmail } from "../../utils/validators";

function NewsletterRegistration() {
  const [error, setError] = useState("");
  const emailRef = useRef();
  function registrationHandler(event) {
    event.preventDefault();

    const { value: email } = emailRef.current;

    if (!email || !validateEmail(email)) {
      setError("Email is not in valid format");
      return 1;
    }

    axios
      .post("/api/news-letter", {
        email
      })
      .then(({ data }) => {
        emailRef.current.value = "";
        console.log(data);
      })
      .catch((err) => console.log(err));

    return 0;
  }

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
