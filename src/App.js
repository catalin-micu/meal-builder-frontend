import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import ErrorMessage from "./pages/ErrorMessage";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="*" component={ErrorMessage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
