import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/post/Post";
import PostForm from "../components/postForm/PostForm";
import { getPosts } from "../redux/features/post/PostSlice";

function HomePage() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  if (error) {
    return <div> Error !!!</div>;
  } else if (!loading) {
    return <div> Loading... </div>;
  }
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f5ff",
        }}
      >
        {localStorage.getItem("currentUser") == null ? (
          ""
        ) : (
          <PostForm
            userId={localStorage.getItem("currentUser")}
            userName={localStorage.getItem("userName")}
          />
        )}
        {posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            userName={post.userName}
            userId={post.userId}
            text={post.text}
            title={post.title}
            likes={post.postLikes}
          />
        ))}
      </div>
    </React.Fragment>
  );
}

export default HomePage;
