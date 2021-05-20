import classes from "./comment-list.module.css";
import Skeleton from "react-loading-skeleton";

function CommentList({ comments, isLoadingComments }) {
  if (isLoadingComments) {
    return (
      <ul className={classes.comments}>
        {[1, 2, 3, 4].map((cmtItem) => (
          <li key={cmtItem}>
            <p>
              <Skeleton width={200} height={25} />
            </p>
            <div>
              By{" "}
              <address>
                <Skeleton width={100} height={25} />
              </address>
            </div>
          </li>
        ))}
      </ul>
    );
  }
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
