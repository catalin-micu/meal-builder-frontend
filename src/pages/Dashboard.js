import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles, useTheme, createTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Grid,
  TextField,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import logo from "../logo2.png";
import DropdownButton from "../components/DropdownButton";
import BasicTable from "../components/BasicTable";
import OnProfileButton from "../components/OnProfileButton";
import { green } from "@material-ui/core/colors";
import Footer from "../components/Footer";
import { Redirect } from "react-router-dom";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "transparent",
    boxShadow: "none",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
    fontSize: "14px",
    fontFamily: "Ubuntu",
  },
  titleWithoutGlow: {
    fontSize: "14px",
    fontFamily: "Ubuntu",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#f7f7f7",
    boxShadow: "none",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
  chevron: {
    color: "#695f55",
  },
  chart: {
    height: "500px",
    width: "97%",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  headerBox: {
    display: "flex",
    justifyContent: "space-around",
    paddingTop: "20px",
    paddingBottom: "50px",
  },
  dropDwnDiv: {
    textAlign: "center",
  },
  title2: {
    color: "#695f55",
    fontFamily: "Times New Roman",
    fontSize: "26px",
  },
  fName: {
    color: "#eea42b",
  },
  cAddress: {
    color: "#695f55",
    fontFamily: "Times New Roman",
    fontSize: "14px",
  },
  footer: {
    marginTop: "160px",
  },
}));

const cTheme = createTheme({
  palette: {
    primary: green,
  },
});

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userAddresses, setUserAddresses] = useState([]);
  const [nearbyRestaurants, setNearbyRestaurants] = useState([]);
  const [authorized, setAuthorized] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  const [validToken, setValidToken] = useState("");
  const [openAddressField, setOpenAddressField] = useState(false);
  const [addresses, setAddresses] = useState("");
  const [email, setEmail] = useState("");
  const [newCity, setNewCity] = useState("");

  const token = sessionStorage.getItem("token");

  const authorize = (e) => {
    setAuthorized(e);
  };

  useEffect(() => {
    const fetchAll = (email, city) => {
      fetch("http://127.0.0.1:5000/dashboard/cities-for-logged-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ email: email }),
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((json) => setUserAddresses(json));
        } else if (response.status === 401) {
          authorize(false);
        }
      });

      fetch("http://127.0.0.1:5000/dashboard/nearby-restaurants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ city: city }),
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((json) => setNearbyRestaurants(json));
        } else if (response.status === 401) {
          authorize(false);
        }
      });

      fetch("http://127.0.0.1:5000/users/get-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ email: email }),
      }).then((response) => {
        if (response.status === 200) {
          response.json().then((json) => {
            setFullName(json.full_name);
            setAddresses(json.preferred_addresses);
            setEmail(json.email);
          });
        } else {
          authorize(false);
        }
      });
    };

    fetch("http://127.0.0.1:5000/users/decode-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    }).then((response) => {
      if (response.status === 200) {
        setValidToken(token);
        authorize(true);
        response.json().then((json) => fetchAll(json.email, selectedCity));
      } else if (response.status === 401) {
        authorize(false);
      }
    });
  }, [token, selectedCity]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function onCityChange() {
    setNewCity(document.getElementById("address-field").value);
  }

  function saveNewCity() {
    let addr = addresses + "//" + newCity;
    let data = {
      email: email,
      preferred_addresses: addr,
    };

    setAddresses(addr);

    fetch("http://127.0.0.1:5000/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status == "200") {
        setOpenAddressField(false);
      }
    });
  }

  function logout() {
    let data = {
      email: email,
    };

    fetch("http://127.0.0.1:5000/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.status == "200") {
        sessionStorage.removeItem("token");
        <Redirect to="/login" />;
      }
    });
  }

  return (
    <>
      {authorized ? (
        <Box className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <div>
                <Typography noWrap align="left">
                  <a href="/">
                    <img src={logo} className={classes.logo} alt="logo" />
                  </a>
                </Typography>
              </div>
              <Typography noWrap className={classes.title} align="top" />
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                className={clsx(open && classes.hide)}
              >
                <AccountCircleIcon style={{ color: "#cd4f52" }} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <div className={classes.headerBox}>
              <div>
                <text className={classes.title2}>
                  Welcome, <text className={classes.fName}>{fullName}</text> !
                </text>
              </div>
              <div className={classes.dropDwnDiv}>
                <text className={classes.cAddress}>Current address:</text>
                <DropdownButton
                  addresses={userAddresses}
                  selectedCity={setSelectedCity}
                  openAddressField={setOpenAddressField}
                />
                <br />
                {openAddressField ? (
                  <div>
                    <TextField
                      id="address-field"
                      color="secondary"
                      label="New address"
                      size="small"
                      variant="outlined"
                      required="true"
                      onChange={() => {
                        onCityChange();
                      }}
                    />
                    <IconButton
                      onClick={() => {
                        setOpenAddressField(false);
                        saveNewCity();
                      }}
                    >
                      <CheckIcon style={{ color: "#5dbe3e" }} />
                    </IconButton>
                    <IconButton onClick={() => setOpenAddressField(false)}>
                      <CancelIcon style={{ color: "#cd4f52" }} />
                    </IconButton>
                  </div>
                ) : null}
              </div>
            </div>
            <BasicTable data={nearbyRestaurants} token={validToken} />
            <div className={classes.footer}>
              <Footer />
            </div>
          </main>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronLeftIcon className={classes.chevron} />
                ) : (
                  <ChevronRightIcon className={classes.chevron} />
                )}
              </IconButton>
              <text
                style={{
                  fontFamily: "Georgia",
                  fontSize: "16px",
                  color: "#695f55",
                }}
              >
                &emsp;&emsp;&ensp;Profile{" "}
              </text>
            </div>
            <Divider />
            <Grid container spacing={3}>
              <Grid item xs={12} spacing={6} align="center" />
              <Grid item xs={12} spacing={6} align="center">
                <text className={classes.cAddress}>Hello,</text>
                <Typography className={classes.fName}>{fullName}</Typography>
              </Grid>
              <Grid item xs={12} spacing={6} align="center">
                <OnProfileButton
                  text="Account details"
                  color="primary"
                  theme={cTheme}
                  url={`/account-details`}
                />
                <OnProfileButton
                  text="Calories calculator"
                  color="primary"
                  theme={cTheme}
                  url="/calories-calculator"
                />
                <OnProfileButton
                  text="Logout"
                  color="secondary"
                  theme={cTheme}
                  url="/login"
                  onClick={() => logout()}
                />
              </Grid>
            </Grid>
          </Drawer>
        </Box>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}
