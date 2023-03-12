import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
function Avatar() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <React.Fragment>
      <Card sx={{ maxWidth: 275, margin: 5 }}>
        <CardMedia
          sx={{ height: 280 }}
          image="/avatars/avatar0.png"
          title="User Avatar"
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="div">
            Username: {localStorage.getItem("userName")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <Button
              onClick={() => logOut()}
              variant="contained"
              sx={{ backgroundColor: "red" }}
            >
              Remove Profile
            </Button>
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default Avatar;
