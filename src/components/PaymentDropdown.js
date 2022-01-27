import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from "material-ui-popup-state/hooks";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  menu: {
    marginTop: "50px",
    "& .MuiPaper-root": {
      backgroundColor: "#695f55",
    },
  },
  buttonText: {
    color: "#695f55",
    fontFamily: "Times New Roman",
  },
  menuText: {
    color: "#f7f7f7",
    fontFamily: "Times New Roman",
  },
  dropDwnBtn: {
    backgroundColor: "#b5a596",
    "&:hover": {
      backgroundColor: "#ccbcad",
    },
  },
}));

const PaymentDropdown = (props) => {
  var propMethods = props.methods;
  const [methods, setMethods] = useState([]);
  const classes = useStyles();
  const [buttonText, setButtonText] = useState("Choose the payment method");

  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });

  useEffect(() => {
    setMethods(propMethods);
  }, [propMethods]);

  function handleButtonText(text) {
    setButtonText(text);
  }

  return (
    <div>
      <Button
        className={classes.dropDwnBtn}
        variant="contained"
        {...bindTrigger(popupState)}
      >
        <text className={classes.buttonText}>{buttonText}</text>
      </Button>
      <Menu
        className={classes.menu}
        {...bindMenu(popupState)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        {methods.map((method) => (
          <MenuItem
            onClick={() => {
              handleButtonText(method);

              if (method == "Cash") {
                props.cash(true);
                props.card(false);
              } else {
                props.card(true);
                props.cash(false);
              }
            }}
          >
            <text className={classes.menuText}>{method}</text>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default PaymentDropdown;
