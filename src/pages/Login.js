import React, { useEffect } from "react";
import "../css/Login.css";
import { Grid, TextField } from "@material-ui/core";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import { green } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
import logo from "../logo.jpeg";
import { useHistory, withRouter } from "react-router-dom";

import { IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [usernameHelper, setUsernameHelper] = React.useState("");
  const [passwordHelper, setPasswordHelper] = React.useState("");

  const [buttonText, setButtonText] = React.useState("Log in");

  const [invalidCredentials, setInvalidCredentials] = React.useState(false);

  const history = useHistory();

  function onUsernameChange() {
    setUsername(document.getElementById("email-field").value);
  }

  function onPasswordChange() {
    setPassword(document.getElementById("password-field").value);
  }

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token && token != "" && token != undefined) {
      history.push("/dashboard");
    }
  });

  function onClickLogin() {
    let reUsername = /\S+@\S+\.\S+/;

    if (username.length == 0) {
      setUsernameHelper("Email cannot be empty");
      return;
    }

    if (reUsername.test(username) == false) {
      setUsernameHelper("Invalid Email");
      return;
    }

    setUsernameHelper("");

    if (password.length == 0) {
      setPasswordHelper("Password cannot be empty");
      return;
    }

    setPasswordHelper("");

    let data1 = {
      email: username,
      passwd: password,
    };

    var a = {};
    fetch("http://127.0.0.1:5000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data1),
    }).then((response) => {
      if (response.status == "200") {
        response.json().then((json) => {
          a = json;
        });
        setButtonText("Hello there");
        setTimeout(() => {
          sessionStorage.setItem("token", a.token);
          history.push("/dashboard");
        }, 2500);
      } else {
        setInvalidCredentials(true);
      }
    });
  }

  return (
    <div className="login">
      <div className="loginFieldGroup">
        <Grid
          container
          spacing={3}
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
            {invalidCredentials ? (
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setInvalidCredentials(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
                style={{
                  borderRadius: "10px",
                }}
              >
                <strong>Invalid credentials!</strong>
              </Alert>
            ) : null}
          </Grid>

          <Grid item xs={12} spacing={6} align="center">
            <TextField
              id="email-field"
              color="secondary"
              label="E-mail"
              variant="outlined"
              required="true"
              onChange={() => {
                onUsernameChange();
              }}
              helperText={usernameHelper}
              error={
                invalidCredentials ||
                (usernameHelper.length == 0 ? false : true)
              }
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
              onChange={() => {
                onPasswordChange();
              }}
              helperText={passwordHelper}
              error={
                invalidCredentials ||
                (passwordHelper.length == 0 ? false : true)
              }
            />
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <CustomButton
              text={buttonText}
              color="primary"
              theme={theme}
              url="/login"
              onClick={() => {
                onClickLogin();
              }}
            />
            <text style={{ fontSize: "12px", color: "#695f55" }}>
              If you don't have an account, go to{" "}
              <strong>
                <a href="/register" style={{ color: "red" }}>
                  register
                </a>
              </strong>{" "}
              page!
            </text>
          </Grid>
        </Grid>
      </div>
      <p style={{ lineHeight: "22vh" }}>
        <br />
        <Footer />
      </p>
    </div>
  );
};

export default withRouter(Login);
