import "./App.css";
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage";

function App() {

  const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: 'Garamond',
        color: '#63be47'
    },
  }));

  const classes = useStyles();

  const errorMessage = () => {
    return <h1 className={classes.root}>IT LOOKS LIKE THIS PAGE DOESN'T EXIST!</h1>;
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route path='*'>
            {errorMessage}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
