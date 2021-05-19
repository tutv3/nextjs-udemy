import { useEffect, useState } from "react";
import axios from "axios";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";

function Comments(props) {
  const { eventId } = props;
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      axios
        .get(`/api/comments/${eventId}`)
        .then(({ data }) => {
          setComments(data.cmts || []);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    axios
      .post(`/api/comments/${eventId}`, {
        eventId,
        ...commentData
      })
      .then(({ data }) => {
        if (data.cmt && data.cmt._id) {
          setComments((prevState) => [data.cmt, ...prevState]);
        }
      })
      .catch((error) => console.log(error));
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
