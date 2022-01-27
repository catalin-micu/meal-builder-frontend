import { Grid, Typography, Button, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import RecipeReviewCard from "../components/RecipeReviewCard";
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
import { Redirect } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Cart from "./Cart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import cheeseburger from "../cheeseburger.jpg";
import bigsh from "../bigsh.jpg";
import crispy from "../crispy.jpg";
import pizzat from "../pizzat.jpg";
import pizzad from "../pizzad.jpg";
import paste from "../paste.jpg";

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
  prodTbl: {
    marginLeft: "20px",
    marginRight: "20px",
  },
  arrow: {
    marginLeft: "20px",
    marginTop: "20px",
  },
});

const RestaurantPage = (props) => {
  const [meals, setMeals] = useState([]);
  const [products, setProducts] = useState([]);
  const [openMenu, setOpenMenu] = useState(true);
  const [authorized, setAuthorized] = useState(true);
  const [customMeals, setCustomMeals] = useState(true);
  const [scheduledDelivery, setScheduledDelivery] = useState(true);
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);

  var restaurantName = props.match.params.restaurantName;
  var token = props.match.params.token;

  let restaurant_name = {
    restaurant_name: restaurantName,
  };

  let restaurant = {
    name: restaurantName,
  };

  const authorize = (e) => {
    setAuthorized(e);
  };

  useEffect(() => {
    const fetchAll = () => {
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

      fetch("http://127.0.0.1:5000/dashboard/search-restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(restaurant),
      }).then((response) =>
        response.json().then((json) => {
          setScheduledDelivery(json.provides_scheduled_delivery);
          setCustomMeals(json.provides_custom_meals);
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
        response.json().then(() => fetchAll());
      } else {
        authorize(false);
      }
    });
  }, [token]);

  function changeAvatar(restaurant) {
    if (restaurant === "Uncle John") {
      return (
        <img className={classes.avatar} src="/images/ujohn.png" alt="ujohn" />
      );
    } else if (restaurant === "Pizza Bonita") {
      return (
        <img
          className={classes.avatar}
          src="/images/pbonita.png"
          alt="pbonita"
        />
      );
    } else {
      return (
        <img className={classes.avatar} src="/images/nologo.png" alt="nologo" />
      );
    }
  }

  function mealImage(name) {
    if (name == "Cheeseburger Menu") {
      return cheeseburger;
    } else if (name == "BIG SHAORMA") {
      return bigsh;
    } else if (name == "Crispy Menu") {
      return crispy;
    } else if (name == "Pizza Taraneasca") {
      return pizzat;
    } else if (name == "Pizza Diavollo") {
      return pizzad;
    } else {
      return paste;
    }
  }

  return (
    <>
      {authorized ? (
        <>
          <div className={classes.logo}>
            <img src={logo} alt="logo" />
            <br />
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                size="small"
                className={classes.arrow}
                href={`/dashboard/${token}`}
                color="primary"
                startIcon={<ArrowBackIosIcon />}
              >
                Back
              </Button>
            </ThemeProvider>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "20px",
            }}
          >
            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setOpenPopup(true)}
            >
              <ShoppingCartIcon style={{ color: "#cd4f52" }} />
            </IconButton>
          </div>
          <div className={classes.firstHalf}>
            <Grid container spacing={3}>
              <Grid item xs={12} spacing={6} align="center">
                <div className={classes.avatar}>
                  {changeAvatar(restaurantName)}
                </div>
                <strong className={classes.restaurantNameText}>
                  {restaurantName}
                </strong>
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                <CMLabel provides={customMeals} />
                <SDLabel provides={scheduledDelivery} />
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
                      price={meal.price}
                      currency={meal.currency}
                      image={mealImage(meal.name)}
                    />
                  </Grid>
                ))}
              </Grid>
            </div>
          ) : (
            <div className={classes.prodTbl}>
              <ProductsTable data={products} />
            </div>
          )}
          <Cart
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            token={token}
          />
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};
export default RestaurantPage;
