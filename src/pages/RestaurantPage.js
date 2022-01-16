import { Grid, Typography, Button } from "@material-ui/core";
import React, { useState } from "react";
import RecipeReviewCard from "../components/RecipeReviewCard";
import uJohn from "../uJohn.png";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import CMLabel from "../components/CMLabel";
import SDLabel from "../components/SDLabel";
import logo from "../logo2.png";
import { red } from "@material-ui/core/colors";

const theme = createTheme({
  palette: {
    primary: red,
  },
});

const useStyles = makeStyles({
  firstHalf: {
    marginBottom: "70px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "5px",
    marginTop: "15px",
    marginBottom: "25px",
  },
  restaurantNameText: {
    color: "#695f55",
    fontFamily: "Georgia",
    fontSize: "26px",
  },
  logo: {
    position: "absolute",
    top: "5px",
    left: "5px",
  },
  menuTitle: {
    fontSize: "30px",
    color: "#695f55",
    marginLeft: "50px",
    fontFamily: "Georgia",
    fontWeight: "bold",
  },
  cmButton: {
    fontSize: "12px",
  },
  buttonGroup: {
    marginTop: "50px",
  },
});

const RestaurantPage = () => {
  const [restaurantName, setRestaurantName] = useState("Uncle John");
  const classes = useStyles();

  return (
    <>
      <div className={classes.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={classes.firstHalf}>
        <Grid container spacing={3}>
          <Grid item xs={12} spacing={6} align="center">
            <div className={classes.avatar}>
              <img className={classes.avatar} src={uJohn} />
            </div>
            <strong className={classes.restaurantNameText}>Uncle John</strong>
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <CMLabel provides="true" />
            <SDLabel provides="false" />
          </Grid>
          <Grid
            item
            className={classes.buttonGroup}
            xs={12}
            spacing={6}
            align="center"
          >
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                className={classes.cmButton}
                onClick=""
              >
                <strong>Restaurant menu </strong>
              </Button>
            </ThemeProvider>
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="primary"
                className={classes.cmButton}
                onClick=""
              >
                <strong>Custom meal</strong>
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>
      </div>
      <div>
        <Typography className={classes.menuTitle} noWrap align="left">
          Menu
        </Typography>
        <Grid container spacing={1} justifyContent="flex-start">
          <Grid item xs={3} spacing={1}>
            <RecipeReviewCard />
          </Grid>
          <Grid item xs={3} spacing={1}>
            <RecipeReviewCard />
          </Grid>
          <Grid item xs={3} spacing={1}>
            <RecipeReviewCard />
          </Grid>
          <Grid item xs={3} spacing={1}>
            <RecipeReviewCard />
          </Grid>
          <Grid item xs={3} spacing={1}>
            <RecipeReviewCard />
          </Grid>
          <Grid item xs={3} spacing={1}>
            <RecipeReviewCard />
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default RestaurantPage;
