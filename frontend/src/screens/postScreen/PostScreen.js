import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  Container,
} from "react-bootstrap";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import { listPostDetails, createPostComment } from "../../actions/postActions";
import { POST_CREATE_COMMENT_RESET } from "../../constants/postConstants";
import "./PostScreen.styles.css";

function PostScreen() {
  // param to match to post
  const match = useParams();

  // state for comments
  const [comment, setComment] = useState("");

  // accessing state
  const dispatch = useDispatch();
  // gets the post
  const postDetails = useSelector((state) => state.postDetails);
  const { loading, error, post } = postDetails;
  //creates the new comment
  const postCommentCreate = useSelector((state) => state.postCommentCreate);
  const {
    loading: loadingPostComment,
    error: errorPostComment,
    success: successPostComment,
  } = postCommentCreate;

  //resets the comment state
  useEffect(() => {
    if (successPostComment) {
      setComment("");
      dispatch({ type: POST_CREATE_COMMENT_RESET });
    }

    dispatch(listPostDetails(match.id));
  }, [match, dispatch, successPostComment]);

  //handles the comment subit
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPostComment(match.id, { comment }));
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          {" "}
          <Container>
            <Row>
              <Card className="pcContainer">
                <Card.Header className="titleHeader">
                  <Card.Title>
                    <h3>{post.title}</h3>
                  </Card.Title>
                </Card.Header>{" "}
              </Card>
            </Row>
            <Row className="pcContainer">
              <Col md={6} className="sideA">
                <Image src={post.image} alt={post.title} className="fullSize" />
              </Col>
              <Col md={6} className="sideB">
                <Card>
                  <Card.Header>
                    <Card.Title>
                      <h4>Comments</h4>
                    </Card.Title>
                  </Card.Header>

                  <Card.Body className="scroll">
                    {post.comments.length === 0 && (
                      <Message variant="info">No Comments </Message>
                    )}
                    <ListGroup variant="flush">
                      {post.comments.map((comment) => (
                        <ListGroup.Item key={comment._id}>
                          <div className="commentGroup">
                            <div className="commentItem">
                              {" "}
                              <i class="fas fa-user"></i>
                            </div>
                            <div className="commentItem">
                              {comment.comment}{" "}
                            </div>{" "}
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                  <Card.Footer className="compFooter">
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <h4>Write a Comment</h4>
                        {loadingPostComment && <Loader />}
                        {successPostComment && (
                          <Message variant="success">Comment Submitted</Message>
                        )}
                        {errorPostComment && (
                          <Message variant="danger">{errorPostComment}</Message>
                        )}
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as="textarea"
                              row="5"
                              maxLength="200"
                              value={comment}
                              required
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Join the Conversation"
                            ></Form.Control>
                          </Form.Group>

                          <Button
                            disable={loadingPostComment}
                            type="submit"
                            variant="primary"
                          >
                            Submit
                          </Button>
                        </Form>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}

export default PostScreen;
