import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";
import { useDispatch } from "react-redux";
import { getPosts, savePost } from "../../redux/features/post/PostSlice";

function PostForm(props) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      savePost({
        title,
        userId,
        text,
      })
    );
    setTitle("");
    setText("");
    dispatch(getPosts());
  };

  const handleTitle = (value) => {
    setTitle(value);
  };

  const handleText = (value) => {
    setText(value);
  };

  const { userName, userId } = props;
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
                {localStorage.getItem("userName").charAt(0).toUpperCase()}
              </Avatar>
            </Link>
          }
          title={
            <TextField
              id="outlined-adornment-amount"
              multiline
              placeholder="Title"
              inputProps={{ maxLength: 25 }}
              fullWidth
              value={title}
              onChange={(i) => handleTitle(i.target.value)}
            ></TextField>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <OutlinedInput
              id="outlined-adornment-amount"
              multiline
              placeholder="Text"
              inputProps={{ maxLength: 250 }}
              fullWidth
              value={text}
              onChange={(i) => handleText(i.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    style={{
                      background:
                        "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                      color: "white",
                    }}
                    onClick={handleSubmit}
                  >
                    Post
                  </Button>
                </InputAdornment>
              }
            ></OutlinedInput>
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default PostForm;
