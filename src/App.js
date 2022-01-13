import "./App.css";
<<<<<<< HEAD
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ErrorMessage from "./pages/ErrorMessage";

function App() {
=======
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";

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

>>>>>>> 4a3d4c8 (modified homepage and started working on dashboard)
  return (
    <Router>
      <div className="App">
        <Switch>
<<<<<<< HEAD
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*" component={ErrorMessage} />
=======
          <Route path="/home" component={HomePage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*">{errorMessage}</Route>
>>>>>>> 4a3d4c8 (modified homepage and started working on dashboard)
        </Switch>
      </div>
    </Router>
  );
}

export default App;
