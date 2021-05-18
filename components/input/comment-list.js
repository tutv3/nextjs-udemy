import classes from "./comment-list.module.css";

function CommentList({ comments }) {
  return (
    <ul className={classes.comments}>
      {comments.map((cmtItem) => (
        <li key={cmtItem._id}>
          <p> {cmtItem.text} </p>
          <div>
            By <address> {cmtItem.name} </address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
