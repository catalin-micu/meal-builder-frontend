import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomButton(props) {
  var text = props.text;
  var color = props.color;
  var url = props.url;
  var action = props.onClick;
  var theme = props.theme;
  const classes = useStyles();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button variant="outlined" color={ color } className={classes.margin} component={ Link } to={ url } onClick={ action }>
          { text }
        </Button>
      </ThemeProvider>
    </div>
  );
}