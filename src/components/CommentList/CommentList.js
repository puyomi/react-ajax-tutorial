import React from "react";
import "./CommentList.css";
import { Comment } from "../";

const CommentList = ({ comments }) => {
  const commentList = comments.map(comment => (
    <Comment key={comment.id} name={comment.email.split("@")[0]} body={comment.body} />
  ));

  return <ul className="CommentList">{commentList}</ul>;
};

export default CommentList;
