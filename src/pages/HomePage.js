import React from "react";
import "../css/HomePage.css"
import { Grid } from "@material-ui/core"
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import { green } from "@material-ui/core/colors";
import { createTheme } from '@material-ui/core/styles';
import logo from '../logo.jpeg';

const theme = createTheme({
    palette: {
      primary: green,
    },
  });

const HomePage = () => {
  
        return (
            <div className="homepage">
              <div className="homepageButtonGroup">
                <img src={logo} className="App-logo" alt="logo" />
                <br />
                <Grid item xs={12} spacing={6} align="center">
                    <CustomButton text='Sign up' color="primary" theme={theme} url="/register" />
                    <CustomButton text='Log in' color="secondary" theme={theme} url="/login" />
                </Grid>
              </div>
              <p style={{ lineHeight: "250px" }}>
                <br/>
                <Footer />
              </p>
            </div>
        );
}

export default HomePage;