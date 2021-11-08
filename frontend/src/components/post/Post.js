import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Post.styles.css";

//creats the post cards for the home screen
function Post({ post }) {
  return (
    <Card className="rounded">
      <Link to={`/post/${post._id}`} className="link-styles">
        {" "}
        <Card.Img src={post.image} />{" "}
      </Link>
      <Link to={`/post/${post._id}`} className="link-styles">
        <Card.Footer className="footStyles">
          {" "}
          <Card.Title as="div">
            <h5>{post.title}</h5>
          </Card.Title>
        </Card.Footer>
      </Link>
    </Card>
  );
}

export default Post;
