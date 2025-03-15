import { Button, Input, message } from "antd";
import classes from "./Login.module.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

export const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    uname: "",
    passwd: "",
  });

  const onLogin = () => {
    axios.post("/api/login", login).then(() => {
      navigate("/dashboard");
    });
  };

  const handleLoginChange = (key) => (e) => {
    setLogin({
      ...login,
      [key]: e.target.value,
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.loginForm}>
        <Input
          value={login.uname}
          onChange={handleLoginChange("uname")}
          placeholder="Enter Username"
        />
        <Input
          type="password"
          value={login.passwd}
          onChange={handleLoginChange("passwd")}
          placeholder="Enter Password"
        />
        <Button onClick={onLogin} type="primary">
          Login
        </Button>
      </div>
    </div>
  );
};
