import React from "react";
import "../css/Login.css";
import { Grid, TextField } from "@material-ui/core";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import { green } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
import logo from "../logo.jpeg";

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  function consoleLogInfo() {
    setUsername(document.getElementById("email-field").value);
    setPassword(document.getElementById("password-field").value);

    console.log(username);
    console.log(password);
  }

  return (
    <div className="login">
      <div className="loginFieldGroup">
        <Grid
          container
          spacing={2}
          style={{
            width: "100%",
            boxShadow: "-5px 5px 6px 6px #695f55",
            borderRadius: "10px",
          }}
        >
          <Grid item xs={12} spacing={6} align="center">
            <a href="/">
              <img src={logo} className="App-logo" alt="logo" />
            </a>
            <br />
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <TextField
              id="email-field"
              color="secondary"
              label="E-mail"
              variant="outlined"
              required="true"
            />
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <TextField
              id="password-field"
              color="secondary"
              label="Password"
              variant="outlined"
              type="password"
              required="true"
            />
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <CustomButton
              text="Log in"
              color="primary"
              theme={theme}
              url="/dashboard"
              onClick={() => {
                consoleLogInfo();
              }}
            />
            <text style={{ fontSize: "12px", color: "#695f55" }}>
              If you don't have an account, go to{" "}
              <strong>
                <a href="/register" style={{ color: "red" }}>
                  register
                </a>
              </strong>{" "}
              page !
            </text>
          </Grid>
        </Grid>
      </div>
      <p style={{ lineHeight: "30vh" }}>
        <br />
        <Footer />
      </p>
    </div>
  );
};

export default Login;
