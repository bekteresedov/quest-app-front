import React from "react";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  FormHelperText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/features/auth/AuthSlice";
function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const handleUsername = (value) => {
    setUserName(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleButton = () => {
    dispatch(
      loginUser({
        userName,
        password,
      })
    );
    setUserName("");
    setPassword("");
    navigate("/");
  };
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          marginTop: 70,
        }}
      >
        <FormControl>
          <InputLabel>Username</InputLabel>
          <Input onChange={(i) => handleUsername(i.target.value)} />
          <InputLabel style={{ top: 80 }}>Password</InputLabel>
          <Input
            style={{ top: 40 }}
            onChange={(i) => handlePassword(i.target.value)}
          />
          <Button
            variant="contained"
            style={{
              marginTop: 60,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              color: "white",
            }}
            onClick={() => handleButton()}
          >
            Login
          </Button>
        </FormControl>
      </div>
    </React.Fragment>
  );
}

export default LoginPage;
