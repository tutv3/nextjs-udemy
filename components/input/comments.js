import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import { NotificationContext } from "../../context/notification-context";

function Comments(props) {
  const { eventId } = props;
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const { showNotification, hideNotification } = useContext(
    NotificationContext
  );

  useEffect(() => {
    if (showComments) {
      setIsLoadingComments(true);
      axios
        .get(`/api/comments/${eventId}`)
        .then(({ data }) => {
          setComments(data.cmts || []);
          setIsLoadingComments(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoadingComments(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    showNotification({
      title: "Submitting comment",
      status: "pending",
      message: "Adding comment to event"
    });
    axios
      .post(`/api/comments/${eventId}`, {
        eventId,
        ...commentData
      })
      .then(({ data }) => {
        if (data.cmt && data.cmt._id) {
          setComments((prevState) => [data.cmt, ...prevState]);
          showNotification({
            title: "Submitted comment",
            status: "success",
            message: "Added comment successfully"
          });
          clearNotiTimeout();
        }
      })
      .catch((error) => {
        showNotification({
          title: "Submit failed with " + email,
          status: "error",
          message: error.msg
        });
        clearNotiTimeout();
      });
  }

  const clearNotiTimeout = () => {
    setTimeout(() => {
      hideNotification();
    }, 5000);
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && (
        <CommentList
          comments={comments}
          isLoadingComments={isLoadingComments}
        />
      )}
    </section>
  );
}

export default Comments;
