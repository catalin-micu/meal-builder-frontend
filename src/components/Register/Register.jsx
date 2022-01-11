import "./Register.css";

import styled from "styled-components";

import { Button, TextField } from "@material-ui/core";

const MarginX = styled.div`
  margin-top: ${(props) => props.value};
  margin-right: auto;
  margin-left: auto;
`;

function Login(props) {
  return (
    <div class="background">
      <div class="center">
        <div class="wrapper">
          <div class="column">
            <div class="header">Meal Builder</div>
            <MarginX value="10px">
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
              />
            </MarginX>
            <MarginX value="10px">
              <TextField id="outlined-basic" label="Email" variant="outlined" />
            </MarginX>
            <MarginX value="10px">
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
              />
            </MarginX>
            <div class="row">
              <MarginX value="30px">
                <Button variant="contained">Register</Button>
              </MarginX>
              <MarginX value="30px">
                <Button variant="contained">Login</Button>
              </MarginX>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
