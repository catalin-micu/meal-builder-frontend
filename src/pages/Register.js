import React from "react";
import "../css/HomePage.css"
import { Grid, TextField } from "@material-ui/core"
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

const Register = () => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    function consoleLogInfo() {
        setUsername(document.getElementById("email-field").value);
        setPassword(document.getElementById("password-field").value);

        console.log(username);
        console.log(password);
    }
  
    return (
        <div className="register" style={{ marginTop: '3%', width: '300px' }}>
            <div className="registerFieldGroup">
                <Grid container spacing={2} style={{ width: '100%', boxShadow: '-5px 5px 6px 6px #695f55', borderRadius: '10px' }}>
                    <Grid item xs={12} spacing={6} align="center"> 
                        <a href='/'><img src={logo} className="App-logo" alt="logo" /></a>
                        <br />
                    </Grid>
                    <Grid item xs={12} spacing={6} align="center">
                        <TextField
                            id="fullname-field"
                            color="secondary"
                            label="Full name"
                            variant="outlined"
                            required="true"
                        />
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
                            id="phone-field"
                            color="secondary"
                            label="Phone number"
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
                        <TextField
                            id="cpassword-field"
                            color="secondary"
                            label="Password confirmation"
                            variant="outlined"
                            type="password"
                            required="true"
                        />
                    </Grid>
                    <Grid item xs={12} spacing={6} align="center">
                        <CustomButton text='Sign up' color="primary" theme={theme} onClick={() => { consoleLogInfo() }} />
                        <text style={{ fontSize: '12px', color: '#695f55'}}>If you already have an account, go to <strong><a href='/login' style={{ color: 'red' }}>login</a></strong> page !</text>
                    </Grid>
                </Grid>
            </div>
            <p style={{ lineHeight: "13vh" }}>
                <br/>
                <Footer />
            </p>
        </div>
    );
}

export default Register;