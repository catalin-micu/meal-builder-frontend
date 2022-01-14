import { makeStyles } from "@material-ui/core/styles";

const ErrorMessage = () => {
  const useStyles = makeStyles(() => ({
    root: {
      fontFamily: "Georgia",
      color: "#63be47",
      textAlign: "center",
      margin: "0px auto",
      paddingTop: "20%",
    },
  }));

  const classes = useStyles();

  return (
    <h1 className={classes.root}>IT LOOKS LIKE THIS PAGE DOESN'T EXIST!</h1>
  );
};

export default ErrorMessage;
