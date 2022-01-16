import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import RestaurantPage from "./pages/RestaurantPage";

function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      fontFamily: "Garamond",
      color: "#63be47",
    },
  }));

  const classes = useStyles();

  const errorMessage = () => {
    return (
      <h1 className={classes.root}>IT LOOKS LIKE THIS PAGE DOESN'T EXIST!</h1>
    );
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
<<<<<<< HEAD
          <Route path="*">{errorMessage}</Route>
=======
          <Route
            path="/restaurant/:restaurantName"
            component={RestaurantPage}
          />
          <Route path="/*">{errorMessage}</Route>
>>>>>>> 9355f53 (added restaurant page)
        </Switch>
      </div>
    </Router>
  );
}

export default App;
