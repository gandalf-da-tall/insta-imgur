import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import FormContainer from "../../components/formContainer/FormContainer";
import { createPost, listPosts } from "../../actions/postActions";
import { POST_CREATE_RESET } from "../../constants/postConstants";
import { Image, Button, Form } from "react-bootstrap";

function UploadScreen() {
  // navigation params from router
  const navigate = useNavigate();

  //getting global state
  const dispatch = useDispatch();

  //setting up local state
  const [image, setImage] = useState("");
  const [imgPreview, setImgPreivew] = useState("");
  const [title, setTitle] = useState("");

  // loads global sate
  const postCreate = useSelector((state) => state.postCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    post: createdPost,
    success: successCreate,
  } = postCreate;

  //nagigates to post page and resets global state for upload
  useEffect(() => {
    dispatch({ type: POST_CREATE_RESET });

    if (successCreate) {
      navigate(`/post/${createdPost._id}`);
    } else {
      dispatch(listPosts());
    }
  }, [dispatch, navigate, successCreate, createdPost]);

  // handler for creating post
  const createPostHandler = (e) => {
    e.preventDefault();
    image.append("title", title);
    dispatch(createPost(image));
  };

  //handler for setting image state
  const uploadFileHandler = async (e) => {
    // get files and create form data
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    // set image and image preview state
    setImage(formData);
    const previewFile = URL.createObjectURL(e.target.files[0]);
    setImgPreivew(previewFile);
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      <FormContainer>
        <h1>Create Post</h1>

        <Form onSubmit={createPostHandler}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="title"
              placeholder="Enter title"
              maxLength="200"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>

            <Form.Control
              type="file"
              id="image-file"
              label="Choose File"
              custom
              onChange={uploadFileHandler}
              required
              accept=".jpg,.jpeg,.png,.gif"
            ></Form.Control>
          </Form.Group>
          <div style={{ margin: "20px" }}>
            <Image src={imgPreview} fluid />{" "}
          </div>
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default UploadScreen;
