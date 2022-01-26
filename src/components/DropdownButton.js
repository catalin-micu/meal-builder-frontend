import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { IconButton } from "@material-ui/core";
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

const DropdownButton = (props) => {
  var propAddresses = props.addresses;
  const [addresses, setAddresses] = useState([]);
  const classes = useStyles();
  const [buttonText, setButtonText] = useState("Choose your city");

  const popupState = usePopupState({ variant: "popover", popupId: "demoMenu" });

  useEffect(() => {
    setAddresses(propAddresses);
  }, [propAddresses]);

  function handleButtonText(text) {
    setButtonText(text);
    props.selectedCity(text);
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
        {addresses.map((address) => (
          <MenuItem
            onClick={() => {
              handleButtonText(address);
            }}
          >
            <text className={classes.menuText}>{address}</text>
          </MenuItem>
        ))}
        <MenuItem onClick={popupState.close}>
          <IconButton
            className={classes.menuText}
            size="small"
            onClick={() => props.openAddressField(true)}
          >
            <text>+ Add new city</text>
          </IconButton>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownButton;
