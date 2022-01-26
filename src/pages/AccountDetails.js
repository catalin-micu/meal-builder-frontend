import React from "react";
import "../css/Register.css";
import { Grid, TextField, Typography } from "@material-ui/core";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import { green, red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
import logo from "../logo.jpeg";
import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import { Redirect } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: green,
    secondary: red,
  },
});

const AccountDetails = (props) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardHolder, setCardHolder] = React.useState("");
  const [cardCvv, setCardCvv] = React.useState("");
  const [cardExpiry, setCardExpiry] = React.useState("");

  const [nameHelper, setNameHelper] = React.useState("");
  const [emailHelper, setEmailHelper] = React.useState("");
  const [phoneHelper, setPhoneHelper] = React.useState("");
  const [cardNumberHelper, setCardNumberHelper] = React.useState("");
  const [cardHolderHelper, setCardHolderHelper] = React.useState("");
  const [cardCvvHelper, setCardCvvHelper] = React.useState("");
  const [cardExpiryHelper, setCardExpiryHelper] = React.useState("");
  const [secretCardNumber, setSecretCardNumber] = React.useState("");
  const [secretCvv, setSecretCvv] = React.useState("");

  const [successfulUpdate, setSuccessfulUpdate] = React.useState(false);
  const [updateError, setUpdateError] = React.useState("");
  const [disabledButton, setDisabledButton] = React.useState(true);
  const [authorized, setAuthorized] = React.useState(true);

  var token = props.match.params.token;

  const history = useHistory();

  React.useEffect(() => {
    const getUser = (email) => {
      fetch("http://127.0.0.1:5000/users/get-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ email: email }),
      }).then((response) =>
        response.json().then((json) => {
          setName(json.full_name);
          setEmail(json.email);
          setPhone(json.phone_number);
          setCardHolder(json.card_holder_name);
          setCardExpiry(json.card_expiry);
          setCardCvv(json.cvv);
          setCardNumber(json.card_nb);
          setSecretCvv("***");
          setSecretCardNumber("************" + json.card_nb.slice(-4));
        })
      );
    };

    fetch("http://127.0.0.1:5000/users/decode-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    }).then((response) => {
      if (response.status === 200) {
        authorize(true);
        response.json().then((json) => getUser(json.email));
      } else {
        authorize(false);
      }
    });
  }, []);

  function clearErrors() {
    setNameHelper("");
    setEmailHelper("");
    setPhoneHelper("");
    setCardNumberHelper("");
    setCardHolderHelper("");
    setCardCvvHelper("");
    setCardExpiryHelper("");
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

  function onCardNumberChange() {
    setCardNumber(document.getElementById("cnumber-field").value);
  }

  function onSecretCardNumberChange() {
    setSecretCardNumber(
      "************" + document.getElementById("cnumber-field").value.slice(-4)
    );
  }

  function onCardHolderChange() {
    setCardHolder(document.getElementById("cholder-field").value);
  }

  function onCardExpiryChange() {
    setCardExpiry(document.getElementById("cexpiry-field").value);
  }

  function onCardCvvChange() {
    setCardCvv(document.getElementById("cvv-field").value);
    setSecretCvv("***");
  }

  const authorize = (e) => {
    setAuthorized(e);
  };

  function onClickSignUp() {
    clearErrors();

    let reName = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    let reEmail = /^\S+@\S+\.\S+$/;
    let rePhone =
      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;
    let reCardExpiry = /^\d{2}\/\d{2}$|^\d{0}$/;
    let reCardNumber = /^\d{16}$|^\d{0}$/;
    let reCardCvv = /^\d{3}$|^\d{0}$/;

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

    if (reCardNumber.test(cardNumber) == false) {
      setCardNumberHelper("Invalid card number format");
      return;
    }

    clearErrors();

    if (reCardExpiry.test(cardExpiry) == false) {
      setCardExpiryHelper("Invalid card expiry format");
      return;
    }

    clearErrors();

    if (reCardCvv.test(cardCvv) == false) {
      setCardCvvHelper("Invalid card cvv format");
      return;
    }

    clearErrors();

    let data1 = {
      email: email,
      full_name: name,
      phone_number: phone,
      card_nb: cardNumber,
      card_holder_name: cardHolder,
      card_expiry: cardExpiry,
      cvv: cardCvv,
    };

    fetch("http://127.0.0.1:5000/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data1),
    }).then((response) => {
      if (response.status == "200") {
        setSuccessfulUpdate(true);
        setDisabledButton(true);
      } else {
        setUpdateError(true);
      }
    });
  }

  return (
    <>
      {authorized ? (
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
                {updateError ? (
                  <Alert
                    severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setUpdateError(false);
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
                    <strong>Error updating user</strong>
                  </Alert>
                ) : null}
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                <Typography
                  style={{
                    fontSize: "13px",
                    fontFamily: "Georgia",
                    color: "#695f55",
                  }}
                >
                  Full name
                </Typography>
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                <TextField
                  id="fullname-field"
                  color="secondary"
                  required="true"
                  variant="outlined"
                  defaultValue={name}
                  multiline="true"
                  disabled={disabledButton}
                  onChange={() => {
                    onNameChange();
                  }}
                  helperText={nameHelper}
                  error={updateError || (nameHelper.length == 0 ? false : true)}
                />
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                <Typography
                  style={{
                    fontSize: "13px",
                    fontFamily: "Georgia",
                    color: "#695f55",
                  }}
                >
                  E-mail
                </Typography>
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                <TextField
                  disabled={disabledButton}
                  id="email-field"
                  color="secondary"
                  required="true"
                  variant="outlined"
                  defaultValue={email}
                  multiline="true"
                  onChange={() => {
                    onEmailChange();
                  }}
                  helperText={emailHelper}
                  error={
                    updateError || (emailHelper.length == 0 ? false : true)
                  }
                />
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                <Typography
                  style={{
                    fontSize: "13px",
                    fontFamily: "Georgia",
                    color: "#695f55",
                  }}
                >
                  Phone number
                </Typography>
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                <TextField
                  id="phone-field"
                  color="secondary"
                  required="true"
                  variant="outlined"
                  defaultValue={phone}
                  multiline="true"
                  disabled={disabledButton}
                  onChange={() => {
                    onPhoneChange();
                  }}
                  helperText={phoneHelper}
                  error={
                    updateError || (phoneHelper.length == 0 ? false : true)
                  }
                />
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                <Typography
                  style={{
                    fontSize: "13px",
                    fontFamily: "Georgia",
                    color: "#695f55",
                  }}
                >
                  Card number
                </Typography>
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                {disabledButton ? (
                  <TextField
                    id="cnumber-field"
                    color="secondary"
                    required="true"
                    variant="outlined"
                    defaultValue={secretCardNumber}
                    multiline="true"
                    disabled={disabledButton}
                    onChange={() => {
                      onSecretCardNumberChange();
                    }}
                    helperText={cardNumberHelper}
                    error={
                      updateError ||
                      (cardNumberHelper.length == 0 ? false : true)
                    }
                  />
                ) : (
                  <TextField
                    id="cnumber-field"
                    color="secondary"
                    required="true"
                    variant="outlined"
                    defaultValue={cardNumber}
                    multiline="true"
                    disabled={disabledButton}
                    onChange={() => {
                      onCardNumberChange();
                    }}
                    helperText={cardNumberHelper}
                    error={
                      updateError ||
                      (cardNumberHelper.length == 0 ? false : true)
                    }
                  />
                )}
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                <Typography
                  style={{
                    fontSize: "13px",
                    fontFamily: "Georgia",
                    color: "#695f55",
                  }}
                >
                  Card holder
                </Typography>
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                <TextField
                  id="cholder-field"
                  color="secondary"
                  variant="outlined"
                  defaultValue={cardHolder}
                  multiline="true"
                  disabled={disabledButton}
                  onChange={() => {
                    onCardHolderChange();
                  }}
                  helperText={cardHolderHelper}
                  error={
                    updateError || (cardHolderHelper.length == 0 ? false : true)
                  }
                />
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                <Typography
                  style={{
                    fontSize: "13px",
                    fontFamily: "Georgia",
                    color: "#695f55",
                  }}
                >
                  Card expiry (mm/yy)
                </Typography>
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                <TextField
                  id="cexpiry-field"
                  color="secondary"
                  variant="outlined"
                  required="true"
                  defaultValue={cardExpiry}
                  multiline="true"
                  disabled={disabledButton}
                  onChange={() => {
                    onCardExpiryChange();
                  }}
                  helperText={cardExpiryHelper}
                  error={
                    updateError || (cardExpiryHelper.length == 0 ? false : true)
                  }
                />
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                <Typography
                  style={{
                    fontSize: "13px",
                    fontFamily: "Georgia",
                    color: "#695f55",
                  }}
                >
                  Card cvv
                </Typography>
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                <TextField
                  id="cvv-field"
                  color="secondary"
                  required="true"
                  variant="outlined"
                  defaultValue={disabledButton ? secretCvv : cardCvv}
                  multiline="true"
                  disabled={disabledButton}
                  onChange={() => {
                    onCardCvvChange();
                  }}
                  helperText={cardCvvHelper}
                  error={
                    updateError || (cardCvvHelper.length == 0 ? false : true)
                  }
                />
              </Grid>
              <Grid item xs={6} spacing={6} align="center">
                <CustomButton
                  text="Update"
                  color="primary"
                  theme={theme}
                  disabled={disabledButton}
                  onClick={() => {
                    onClickSignUp();
                  }}
                />
              </Grid>
              <Grid item xs={6} spacing={6} align="center">
                <CustomButton
                  text="Edit"
                  color="secondary"
                  theme={theme}
                  disabled={!disabledButton}
                  onClick={() => {
                    setDisabledButton(false);
                  }}
                />
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                {successfulUpdate && disabledButton ? (
                  <Alert
                    severity="success"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setSuccessfulUpdate(false);
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
                    <strong>Successfully updated!</strong>
                  </Alert>
                ) : null}
                <text style={{ fontSize: "12px", color: "#695f55" }}>
                  Return to {""}
                  <strong>
                    <a href={"/dashboard/" + token} style={{ color: "red" }}>
                      dashboard
                    </a>
                  </strong>{" "}
                  !
                </text>
              </Grid>
            </Grid>
          </div>
          <p style={{ lineHeight: "13vh" }}>
            <br />
            <Footer />
          </p>
        </div>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default AccountDetails;
