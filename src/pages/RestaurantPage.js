import { Grid, Typography, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
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
import ProductsTable from "../components/ProductsTable";

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

const RestaurantPage = (props) => {
  const [meals, setMeals] = useState([]);
  const [products, setProducts] = useState([]);
  const [openMenu, setOpenMenu] = useState(true);
  const classes = useStyles();

  var restaurantName = props.match.params.restaurantName;

  let restaurant_name = {
    restaurant_name: restaurantName,
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5000/restaurants/get-menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(restaurant_name),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setMeals(data);
      });

    fetch("http://127.0.0.1:5000/restaurants/get-products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(restaurant_name),
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((json) => setProducts(json));
      } else {
        console.log("This restaurant doesn't have any products.");
      }
    });
  }, []);

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
            <strong className={classes.restaurantNameText}>
              {restaurantName}
            </strong>
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
                onClick={() => {
                  setOpenMenu(true);
                }}
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
                onClick={() => {
                  setOpenMenu(false);
                  // getProducts();
                }}
              >
                <strong>Custom meal</strong>
              </Button>
            </ThemeProvider>
          </Grid>
        </Grid>
      </div>
      {openMenu ? (
        <div>
          <Typography className={classes.menuTitle} noWrap align="left">
            Menu
          </Typography>
          <Grid container spacing={1} justifyContent="flex-start">
            {meals.map((meal) => (
              <Grid item xs={3} spacing={1}>
                <RecipeReviewCard
                  mealName={meal.name}
                  protein={meal.protein}
                  carbs={meal.carbs}
                  fat={meal.fat}
                  calories={meal.calories}
                  details={meal.cooking_details}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <ProductsTable data={products} />
      )}
    </>
  );
};
export default RestaurantPage;
