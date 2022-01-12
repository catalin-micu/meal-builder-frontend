import React from "react";
import "../css/HomePage.css";
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

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConf, setPasswordConf] = React.useState("");

  const [nameHelper, setNameHelper] = React.useState("");
  const [emailHelper, setEmailHelper] = React.useState("");
  const [phoneHelper, setPhoneHelper] = React.useState("");
  const [passwordHelper, setPasswordHelper] = React.useState("");
  const [passwordConfHelper, setPasswordConfHelper] = React.useState("");

  function clearErrors() {
    setNameHelper("");
    setEmailHelper("");
    setPhoneHelper("");
    setPasswordHelper("");
    setPasswordConfHelper("");
  }

  function onNameChange() {
    setName(document.getElementById("fullname-field").value);
  }

  function onEmailChange() {
    setEmail(document.getElementById("email-field").value);
  }

  function onPhoneChange() {
    setPhone(document.getElementById("phone-field").value);
  }

  function onPasswordChange() {
    setPassword(document.getElementById("password-field").value);
  }

  function onPasswordConfChange() {
    setPasswordConf(document.getElementById("cpassword-field").value);
  }

  function onClickSignUp() {
    let reName = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    let reEmail = /\S+@\S+\.\S+/;
    let rePhone =
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

    if (name.length == 0) {
      setNameHelper("Name cannot be empty");
      return;
    }

    if (reName.test(name) == false) {
      setNameHelper("Invalid name format");
      return;
    }

    clearErrors();

    if (email.length == 0) {
      setEmailHelper("Email cannot be empty");
      return;
    }

    if (reEmail.test(email) == false) {
      setEmailHelper("Invalid email format");
      return;
    }

    clearErrors();

    if (phone.length == 0) {
      setPhoneHelper("Phone number cannot be empty");
      return;
    }

    console.log(phone);

    if (rePhone.test(phone) == false) {
      setPhoneHelper("Invalid phone number");
      return;
    }

    clearErrors();

    if (password.length == 0) {
      setPasswordHelper("Password cannot be empty");
      return;
    }

    clearErrors();

    if (passwordConf.length == 0) {
      setPasswordConfHelper("Password cannot be empty");
      return;
    }

    if (password != passwordConf) {
      setPasswordConfHelper("Passwords do not match");
    }
  }

  return (
    <div className="register" style={{ marginTop: "3%", width: "300px" }}>
      <div className="registerFieldGroup">
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
              id="fullname-field"
              color="secondary"
              label="Full name"
              variant="outlined"
              required="true"
              onChange={() => {
                onNameChange();
              }}
              helperText={nameHelper}
              error={nameHelper.length == 0 ? false : true}
            />
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <TextField
              id="email-field"
              color="secondary"
              label="E-mail"
              variant="outlined"
              required="true"
              onChange={() => {
                onEmailChange();
              }}
              helperText={emailHelper}
              error={emailHelper.length == 0 ? false : true}
            />
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <TextField
              id="phone-field"
              color="secondary"
              label="Phone number"
              variant="outlined"
              required="true"
              onChange={() => {
                onPhoneChange();
              }}
              helperText={phoneHelper}
              error={phoneHelper.length == 0 ? false : true}
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
                passwordConfHelper == "Passwords do not match" ||
                (passwordHelper.length == 0 ? false : true)
              }
            />
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <TextField
              id="cpassword-field"
              color="secondary"
              label="Password confirmation"
              variant="outlined"
              type="password"
              required="true"
              onChange={() => {
                onPasswordConfChange();
              }}
              helperText={passwordConfHelper}
              error={passwordConfHelper.length == 0 ? false : true}
            />
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <CustomButton
              text="Sign up"
              color="primary"
              theme={theme}
              onClick={() => {
                onClickSignUp();
              }}
            />
            <text style={{ fontSize: "12px", color: "#695f55" }}>
              If you already have an account, go to {""}
              <strong>
                <a href="/login" style={{ color: "red" }}>
                  login
                </a>
              </strong>{" "}
              page!
            </text>
          </Grid>
        </Grid>
      </div>
      <p style={{ lineHeight: "13vh" }}>
        <br />
        <Footer />
      </p>
    </div>
  );
};

export default Register;
