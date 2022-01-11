import React, { useState } from "react";
import "../css/Login.css";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import CustomButton from "../components/CustomButton";
import { green } from "@material-ui/core/colors";
import { createTheme } from '@material-ui/core/styles';

const MarginX = styled.div`
  margin-top: ${(props) => props.value};
  margin-right: auto;
  margin-left: auto;
`;

const theme = createTheme({
  palette: {
    primary: green
  },
});

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function consoleLogInfo() {
    setUsername(document.getElementById("username-field").value);
    setPassword(document.getElementById("password-field").value);

    console.log(username);
    console.log(password);
  }

  return (
    <div class="background">
      <div class="center">
        <div class="wrapper">
          <div class="column">
            <div class="header">Meal Builder</div>
            <MarginX value="10px">
              <TextField
                id="username-field"
                label="Username"
                variant="outlined"
              />
            </MarginX>
            <MarginX value="10px">
              <TextField
                id="password-field"
                label="Password"
                variant="outlined"
                password
              />
            </MarginX>
            <div class="row">
              <MarginX value="30px">
              <CustomButton text='Log in' color="secondary" theme={theme} url="/login" />
              </MarginX>
              <MarginX value="30px">
              <CustomButton text='Sign up' color="primary" theme={theme} url="/register" />
              </MarginX>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
