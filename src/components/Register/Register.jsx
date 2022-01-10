import "./Register.css";

import styled from "styled-components";

import { Button, TextField } from "@material-ui/core";

function Login(props) {
  return (
    <div class="background">
      <div class="center">
        <div class="wrapper">
          <div class="column">
            <div class="margin">
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
              />
            </div>

            <div class="margin">
              <TextField id="outlined-basic" label="Email" variant="outlined" />
            </div>

            <div class="margin">
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
            </div>
            <div class="row">
              <div class="margin">
                <Button variant="contained">Register</Button>
              </div>
              <div class="margin">
                <Button variant="contained">Login</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
