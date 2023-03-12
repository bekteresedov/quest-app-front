import {
  Avatar,
  CardContent,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Comment(props) {
  const { text, userId, userName } = props;
  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <OutlinedInput
            id="outlined-adornment-amount"
            disabled
            multiline
            inputProps={{ maxLength: 250 }}
            fullWidth
            value={text}
            startAdornment={
              <InputAdornment position="start">
                <Link
                  style={{ textDecoration: "none" }}
                  to={{ pathname: `/users/get/${userId}` }}
                >
                  <Avatar aria-label="recipe">
                    {userName.charAt(0).toUpperCase()}
                  </Avatar>
                </Link>
              </InputAdornment>
            }
            style={{ color: "black", backgroundColor: "white" }}
          ></OutlinedInput>
        </Typography>
      </CardContent>
    </React.Fragment>
  );
}

export default Comment;
