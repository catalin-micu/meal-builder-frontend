import React, { useState, useEffect } from "react";

import "./Login.css";

import styled from "styled-components";

import { Button, TextField } from "@material-ui/core";

const MarginX = styled.div`
  margin-top: ${(props) => props.value};
  margin-right: auto;
  margin-left: auto;
`;

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
                <Button variant="contained" onClick={consoleLogInfo}>
                  Login
                </Button>
              </MarginX>
              <MarginX value="30px">
                <Button variant="contained">Register</Button>
              </MarginX>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
