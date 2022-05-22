import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import { red, green } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
import logo from "../logo.jpeg";
import homepage_photo from "../homepage_photo.png";
import "../css/HomePage.css";
import { useHistory } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: green,
    secondary: red,
  },
});

const HomePage = () => {
  const history = useHistory();
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (token && token != "" && token != undefined) {
      history.push("/dashboard");
    }
  });

  return (
    <div style={{ minHeight: "100vh" }}>
      <div className="flexbox-container">
        <div className="flexbox-item flexbox-item-1">
          <img className="homeImage" src={homepage_photo} alt="homepage" />
        </div>
        <div className="flexbox-item flexbox-item-2">
          <div className="homepageButtonGroup">
            <img src={logo} className="App-logo" alt="logo" />
            <br />
            <Grid item xs={12} spacing={6} align="center">
              <CustomButton
                text="Sign up"
                color="primary"
                theme={theme}
                url="/register"
              />
              <CustomButton
                text="Log in"
                color="secondary"
                theme={theme}
                url="/login"
              />
            </Grid>
            <Grid item xs={12} spacing={6} align="center">
              <br />
              <br />
              <strong className="motivational-text">
                ...your daily healthy choice!
              </strong>
            </Grid>
          </div>
        </div>
      </div>
      <p style={{ lineHeight: "162px" }}>
        <br />
        <Footer />
      </p>
    </div>
  );
};

export default HomePage;
