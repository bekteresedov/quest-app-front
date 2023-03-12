import React, { useEffect, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useDispatch, useSelector } from "react-redux";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";
import Comment from "../comment/Comment";
import {
  DeleteWithAuth,
  GetWithoutAuth,
  PostWithAuth,
} from "../../services/HttpService";
import CommentForm from "../commentForm/CommentForm";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Post(props) {
  const { title, text, userName, userId, postId, likes } = props;

  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const isInitialMount = useRef(true);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(null);

  const { loading, error } = useSelector((state) => state.comments);
  let disabled = localStorage.getItem("currentUser") == null ? true : false;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      getComments();
    }
  }, [loading]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    getComments();
  };

  const getComments = async () => {
    const { data } = await GetWithoutAuth("/comments?postId=" + postId);
    setComments(data);
  };

  //Like

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      saveLike();
      setLikeCount(likeCount + 1);
    } else {
      deleteLike();
      setLikeCount(likeCount - 1);
    }
  };

  const saveLike = () => {
    PostWithAuth("/likes/new", {
      postId: postId,
      userId: localStorage.getItem("currentUser"),
    });
  };

  const deleteLike = () => {
    DeleteWithAuth("/likes/delete/" + likeId);
  };

  const checkLikes = () => {
    let result = likes.find(
      (like) => "" + like.userId === localStorage.getItem("currentUser")
    );
    if (result != null) {
      setLikeId(result.id);
      setLiked(true);
    }
  };

  useEffect(() => {
    checkLikes();
  }, []);

  //Like
  return (
    <React.Fragment>
      <Card sx={{ width: 800, marginTop: 5 }}>
        <CardHeader
          avatar={
            <Link
              style={{ textDecoration: "none" }}
              to={{ pathname: `/users/get/${userId}` }}
            >
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {userName.charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          title={title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {disabled ? (
            <IconButton
              disabled
              onClick={() => handleLike()}
              aria-label="add to favorites"
            >
              <FavoriteIcon style={liked ? { color: "red" } : null} />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => handleLike()}
              aria-label="add to favorites"
            >
              <FavoriteIcon style={liked ? { color: "red" } : null} />
            </IconButton>
          )}
          {likeCount}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <CommentIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {comments.map((comment) => (
            <Comment
              userName={comment.userName}
              userId={comment.userId}
              text={comment.text}
            />
          ))}
          {disabled ? (
            ""
          ) : (
            <CommentForm
              userId={localStorage.getItem("currentUser")}
              userName={localStorage.getItem("userName")}
              postId={postId}
              getComments={getComments}
            ></CommentForm>
          )}
        </Collapse>
      </Card>
    </React.Fragment>
  );
}

export default Post;
