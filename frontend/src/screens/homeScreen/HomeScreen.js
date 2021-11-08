import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/post/Post";
import Loader from "../../components/loader/Loader";
import Message from "../../components/message/Message";
import { listPosts } from "../../actions/postActions";
import Masonry from "react-masonry-css";
import "./HomeScreen.styles.css";

function HomeScreen() {
  //grabs state and lists post cards
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.postList);
  const { error, loading, posts } = postList;

  useEffect(() => {
    dispatch(listPosts());
  }, [dispatch]);

  // breakpoints for the staggered post hieghts
  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="home">
      <h1 className="titleStyles">Latest Posts</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts.map((post) => (
            <div key={post._id}>
              <Post post={post} />
            </div>
          ))}
        </Masonry>
      )}
    </div>
  );
}

export default HomeScreen;
