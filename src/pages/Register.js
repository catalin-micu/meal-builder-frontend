import React from "react";
import "../css/Register.css";
import { Grid, TextField } from "@material-ui/core";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import { green } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
import logo from "../logo.jpeg";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

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

  const [signupError, setSignupError] = React.useState("");

  const history = useHistory();

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
    clearErrors();

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
      return;
    }

    let data1 = {
      email: email,
      passwd: password,
      full_name: name,
      phone_number: phone,
    };

    fetch("http://127.0.0.1:5000/users/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data1),
    }).then((response) => {
      if (response.status == "200") {
        history.push("/");
      } else {
        setSignupError(true);
      }
    });
  }

  return (
    <div className="register">
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
            {signupError ? (
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setSignupError(false);
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
                <strong>Error creating user</strong>
              </Alert>
            ) : null}
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
              error={signupError || (nameHelper.length == 0 ? false : true)}
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
              error={signupError || (emailHelper.length == 0 ? false : true)}
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
              error={signupError || (phoneHelper.length == 0 ? false : true)}
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
                signupError ||
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
              error={
                signupError || (passwordConfHelper.length == 0 ? false : true)
              }
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
