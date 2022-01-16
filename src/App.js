import "./App.css";
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a242b1ef029c7f31fc2c2364b7ee99ed4389a9f0
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ErrorMessage from "./pages/ErrorMessage";

function App() {
<<<<<<< HEAD
=======
import { makeStyles } from "@material-ui/core/styles";
=======
>>>>>>> 78459ed (fixed the error message for invalid pages)
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import ErrorMessage from "./pages/ErrorMessage";

function App() {
<<<<<<< HEAD
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
=======
>>>>>>> 78459ed (fixed the error message for invalid pages)
=======
>>>>>>> a242b1ef029c7f31fc2c2364b7ee99ed4389a9f0
  return (
    <Router>
      <div className="App">
        <Switch>
<<<<<<< HEAD
<<<<<<< HEAD
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*" component={ErrorMessage} />
=======
          <Route path="/home" component={HomePage} />
          <Route path="/dashboard" component={Dashboard} />
<<<<<<< HEAD
          <Route path="*">{errorMessage}</Route>
>>>>>>> 4a3d4c8 (modified homepage and started working on dashboard)
=======
          <Route path="*" component={ErrorMessage} />
>>>>>>> 78459ed (fixed the error message for invalid pages)
=======
          <Route exact path="/" component={HomePage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/home" component={HomePage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*" component={ErrorMessage} />
>>>>>>> a242b1ef029c7f31fc2c2364b7ee99ed4389a9f0
        </Switch>
      </div>
    </Router>
  );
}

export default App;
