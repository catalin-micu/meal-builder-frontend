import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles({
  greenText: {
    color: "#58be36",
    textShadow: "1px 0 #000",
    fontFamily: "Times New Roman",
    fontSize: "13px",
  },
  redText: {
    color: "#cd4f52",
    textShadow: "1px 0 #000",
    fontFamily: "Times New Roman",
    fontSize: "13px",
  },
});

const SDLabel = (props) => {
  const [provides, setProvides] = useState(props.provides);

  const classes = useStyles();
  return (
    <>
      {provides ? (
        <Box
          component="span"
          sx={{
            p: 1,
            border: "1px solid grey",
            borderColor: "#58be36",
            backgroundColor: "rgba(0,255,0,0.2)",
            borderRadius: "25px",
            marginLeft: "5px",
          }}
        >
          <text className={classes.greenText}>provides scheduled delivery</text>
        </Box>
      ) : (
        <Box
          component="span"
          sx={{
            p: 1,
            border: "1px solid",
            borderColor: "#cd4f52",
            backgroundColor: "rgba(255,0,0,0.2)",
            borderRadius: "25px",
            marginLeft: "5px",
          }}
        >
          <text className={classes.redText}>
            doesn't provide scheduled delivery
          </text>
        </Box>
      )}
    </>
  );
};

export default SDLabel;
