import React, { useState } from "react";
import { useDispatch } from "react-redux";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { InputAdornment } from "@mui/material";
import { saveComment } from "../../redux/features/comment/CommentSlice";
function CommentForm(props) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { userId, userName, postId, getComments } = props;

  const handleSubmit = () => {
    dispatch(
      saveComment({
        userId,
        postId,
        text,
      })
    );
    setText("");
    getComments();
  };

  const handleChange = (value) => {
    setText(value);
  };
  return (
    <React.Fragment>
      <CardContent>
        <OutlinedInput
          id="outlined-adornment-amount"
          multiline
          inputProps={{ maxLength: 250 }}
          fullWidth
          onChange={(i) => handleChange(i.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <Link
                style={{ textDecoration: "none" }}
                to={{ pathname: `/users/get/${userId}` }}
              >
                <Avatar aria-label="recipe" sx={{ width: 30, height: 30 }}>
                  {localStorage.getItem("userName").charAt(0).toUpperCase()}
                </Avatar>
              </Link>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <Button
                variant="contained"
                style={{
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  color: "white",
                }}
                onClick={() => handleSubmit()}
              >
                Comment
              </Button>
            </InputAdornment>
          }
          value={text}
          style={{ color: "black", backgroundColor: "white" }}
        ></OutlinedInput>
      </CardContent>
    </React.Fragment>
  );
}

export default CommentForm;
