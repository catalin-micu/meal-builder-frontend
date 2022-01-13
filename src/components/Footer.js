import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import {
  Typography,
  IconButton,
  BottomNavigation,
  Collapse,
  Box,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";

const Footer = () => {
  const [open, setOpen] = React.useState(false);

  function warning() {
    return (
      <Box sx={{ width: "200px" }}>
        <Collapse in={open}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            <strong>Coming soon!</strong>
          </Alert>
        </Collapse>
      </Box>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      {warning()}
      <BottomNavigation
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <IconButton style={{ color: "#695f55" }} disabled="true">
          <Typography style={{ fontSize: "15px", fontFamily: "Georgia" }}>
            © MBDed
          </Typography>
        </IconButton>
        <IconButton
          href=""
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#695f55" }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          href=""
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#695f55" }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <InstagramIcon />
        </IconButton>
      </BottomNavigation>
    </div>
  );
};

export default Footer;
