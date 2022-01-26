import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  Grid,
  Box,
} from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import ErrorIcon from "@material-ui/icons/Error";

export default function Cart(props) {
  const { openPopup, setOpenPopup } = props;

  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <Dialog open={openPopup} onClose={handleClose}>
      <DialogContent>
        <Box m={1}>
          <Grid item xs={12} spacing={3} align="center">
            <ErrorIcon color="secondary" />
          </Grid>
        </Box>
        <Typography
          color="secondary"
          align="center"
          style={{
            fontFamily: "Garamond",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Invalid credentials! Please try again!
        </Typography>
        <Typography
          align="center"
          style={{ fontFamily: "Garamond", fontSize: "16px" }}
        >
          Sign up your company if you don't already have an account!
        </Typography>
        <Box m={1}>
          <Grid item xs={12} spacing={3} align="center">
            <Button
              size="small"
              color="secondary"
              style={{
                fontFamily: "Garamond",
                fontSize: "12px",
                fontWeight: "bold",
              }}
              onClick={() => {
                setOpenPopup(false);
              }}
            >
              Try again
            </Button>
          </Grid>
          <Grid item xs={12} spacing={3} align="center">
            <Button
              size="small"
              component={Link}
              to={"/register"}
              style={{ fontFamily: "Garamond", fontSize: "12px" }}
            >
              Register your company
            </Button>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
