import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    border: "1.5px solid",
  },
}));

export default function CustomButton(props) {
  var text = props.text;
  var color = props.color;
  var url = props.url;
  var action = props.onClick;
  var theme = props.theme;
  var disabled = props.disabled;
  const classes = useStyles();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          variant="outlined"
          color={color}
          className={classes.root}
          component={Link}
          to={url}
          disabled={disabled}
          onClick={action}
        >
          <strong> {text} </strong>
        </Button>
      </ThemeProvider>
    </div>
  );
}
