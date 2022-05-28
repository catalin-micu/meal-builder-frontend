import { withRouter } from "react-router-dom";
import React, { useEffect } from "react";
import "../css/CaloriesCalculator.css";
import { Grid, TextField, Typography } from "@material-ui/core";
import CustomButton from "../components/CustomButton";
import Footer from "../components/Footer";
import { green } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
import logo from "../logo.jpeg";
import SimpleLineChart from "../components/SimpleLineChart";
import CustomDotLineChart from "../components/CustomDotLineChart";

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const CaloriesCalculatorPage = () => {
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [activity, setActivity] = React.useState("");
  const [goal, setGoal] = React.useState("");
  const [calories, setCalories] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [progress, setProgress] = React.useState([]);

  var token = sessionStorage.getItem("token");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/users/decode-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => getProgress(json.email));
      }
    });
  }, [token]);

  function onWeightChange() {
    setWeight(document.getElementById("weight-field").value);
  }

  function onHeightChange() {
    setHeight(document.getElementById("height-field").value);
  }

  function onAgeChange() {
    setAge(document.getElementById("age-field").value);
  }

  function onGenderChange() {
    setGender(document.getElementById("gender-field").value);
  }

  function onActivityChange() {
    setActivity(document.getElementById("activity-field").value);
  }

  function onGoalChange() {
    setGoal(document.getElementById("goal-field").value);
  }

  function getProgress(email) {
    fetch("http://127.0.0.1:5000/calories-calculator/get-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((json) => {
          setProgress(json);
          setEmail(email);
        });
      }
    });
  }

  function calculate() {
    let data = {
      weight: weight,
      height: height,
      age: age,
      gender: gender,
      activity: activity,
      goal: goal,
      email: email,
    };

    fetch(
      "http://127.0.0.1:5000/calories-calculator/calculate-caloric-needs-per-day",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    ).then((response) => {
      if (response.status == "200") {
        response.json().then((json) => setCalories(json.daily_calories));
      } else {
        setCalories(0);
      }
    });
  }

  return (
    <div className="calculator">
      <div className="calculatorFieldGroup">
        <Grid
          container
          spacing={2}
          style={{
            width: "100%",
            borderStyle: "dashed",
            borderColor: "#695f55",
            borderWidth: "2px",
            borderRadius: "1px",
          }}
        >
          <Grid item xs={12} spacing={6} align="center">
            <a href="/">
              <img src={logo} className="App-logo" alt="logo" />
            </a>
            <br />
          </Grid>

          <Grid item xs={12} spacing={6} align="center">
            <Typography
              variant="h6"
              style={{
                color: "#695f55",
                fontFamily: "Georgia",
                fontSize: "26px",
              }}
            >
              Calories calculator
            </Typography>
            <br />
          </Grid>

          <Grid item xs={12} spacing={6} align="center">
            <TextField
              id="weight-field"
              color="secondary"
              label="Weight (kg)"
              variant="outlined"
              required="true"
              onChange={() => {
                onWeightChange();
              }}
            />
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <TextField
              id="height-field"
              color="secondary"
              label="Height (cm)"
              variant="outlined"
              required="true"
              onChange={() => {
                onHeightChange();
              }}
            />
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <TextField
              id="age-field"
              color="secondary"
              label="Age"
              variant="outlined"
              required="true"
              onChange={() => {
                onAgeChange();
              }}
            />
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <TextField
              id="gender-field"
              color="secondary"
              label="Gender"
              variant="outlined"
              required="true"
              helperText="[male, female]"
              onChange={() => {
                onGenderChange();
              }}
            />
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <TextField
              id="goal-field"
              color="secondary"
              label="Goal"
              variant="outlined"
              required="true"
              helperText="[maintenance, lose, gain]"
              onChange={() => {
                onGoalChange();
              }}
            />
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <TextField
              id="activity-field"
              color="secondary"
              label="Activity"
              variant="outlined"
              required="true"
              helperText="[sedentary, light, moderate, very, extra]"
              onChange={() => {
                onActivityChange();
              }}
            />
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <CustomButton
              text="Calculate"
              color="primary"
              theme={theme}
              onClick={() => {
                calculate();
              }}
            />
          </Grid>
          {calories > 0 ? (
            <Grid item xs={12} spacing={6} align="center">
              <Typography
                variant="h3"
                style={{
                  color: "#695f55",
                  fontFamily: "Georgia",
                  fontSize: "20px",
                }}
              >
                Recommendation: <br />
                <text
                  style={{
                    color: "#cd4f52",
                  }}
                >
                  {calories} calories
                </text>
              </Typography>
              <br />
            </Grid>
          ) : null}
        </Grid>
      </div>
      <div
        style={{
          marginTop: "130px",
        }}
      >
        <h1>Recommended calories - History</h1>
        <Grid>
          <Grid
            item
            xs={12}
            spacing={6}
            align="center"
            style={{ height: "300px", width: "1200px" }}
          >
            <SimpleLineChart data={progress} />
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          marginTop: "130px",
        }}
      >
        <h1>Weight - History</h1>
        <Grid>
          <Grid
            item
            xs={12}
            spacing={6}
            align="center"
            style={{ height: "300px", width: "1200px" }}
          >
            <CustomDotLineChart data={progress} />
          </Grid>
        </Grid>
      </div>
      <p style={{ lineHeight: "13vh" }}>
        <br />
        <Footer />
      </p>
    </div>
  );
};

export default withRouter(CaloriesCalculatorPage);
