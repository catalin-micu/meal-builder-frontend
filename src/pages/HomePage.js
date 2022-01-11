import React from "react";
import "../css/HomePage.css"
import { Grid, ButtonGroup } from "@material-ui/core"
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import { red, green } from "@material-ui/core/colors";
import { createTheme } from '@material-ui/core/styles';
import logo from '../logo.jpeg';

const theme = createTheme({
    palette: {
      primary: green,
      secondary: red
    },
  });

const HomePage = () => {
  
        return (
            <div className="homepage">
              <div className="homepageButtonGroup">
                <img src={logo} className="App-logo" alt="logo" />
                <Grid item xs={12} spacing={6} align="center">
                    <ButtonGroup disableElevation>
                        <CustomButton text='Sign up' color="primary" theme={theme} path="/register" />
                        <CustomButton text='Log in' color="secondary" theme={theme} path="/login" />
                    </ButtonGroup>
                </Grid>
              </div>
              <p style={{ lineHeight: "300px"}}>
                <br/>
                <Footer />
              </p>
            </div>
        );
}

export default HomePage;