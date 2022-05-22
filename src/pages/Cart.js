import {
  Dialog,
  DialogContent,
  Typography,
  Grid,
  Button,
  IconButton,
} from "@material-ui/core";
import React from "react";
import PaymentDropdown from "../components/PaymentDropdown";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import StripeContainer from "../components/StripeContainer";
import RemoveIcon from "@material-ui/icons/Remove";

export default function Cart(props) {
  const { openPopup, setOpenPopup } = props;
  const [cashPayment, setCashPayment] = React.useState(false);
  const [cardPayment, setCardPayment] = React.useState(false);
  const [successfullySent, setSuccessfullySent] = React.useState(false);

  var cart_list = [];
  if (JSON.parse(localStorage.getItem("cart"))) {
    cart_list = JSON.parse(localStorage.getItem("cart"));
  }

  const history = useHistory();

  const handleClose = () => {
    setOpenPopup(false);
  };

  function arrayRemove(arr, value) {
    return arr.filter(function (geeks) {
      return geeks != value;
    });
  }

  return (
    <Dialog open={openPopup} onClose={handleClose}>
      <DialogContent>
        <Grid
          xs={12}
          spacing={6}
          align="center"
          style={{ marginBottom: "20px" }}
        >
          {successfullySent ? (
            <Alert
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setSuccessfullySent(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              style={{
                borderRadius: "10px",
              }}
            >
              <strong>Your order has been sent successfully!</strong>
            </Alert>
          ) : null}
        </Grid>
        <Typography
          align="center"
          variant="h4"
          style={{
            fontWeight: 600,
            marginBottom: "150px",
            fontFamily: "Georgia",
            color: "#695f55",
          }}
        >
          Cart
        </Typography>
        {cart_list.map((txt) => (
          <text>
            {txt}
            <IconButton
              onClick={() => {
                cart_list = arrayRemove(cart_list, txt);
                localStorage.setItem("cart", JSON.stringify(cart_list));
                setTimeout(() => {
                  setOpenPopup(false);
                }, 250);
                setTimeout(() => {
                  setOpenPopup(true);
                }, 250);
              }}
            >
              <RemoveIcon color="secondary" />
            </IconButton>
            <br></br>
          </text>
        ))}
        <Grid container spacing={2}>
          <Grid item xs={12} spacing={6} align="center">
            <text
              style={{
                fontFamily: "Georgia",
                color: "#695f55",
              }}
            >
              Current payment method:
            </text>
          </Grid>
          <Grid item xs={12} spacing={6} align="center">
            <PaymentDropdown
              methods={["Cash", "Card"]}
              cash={setCashPayment}
              card={setCardPayment}
            />
          </Grid>
          {cashPayment ? (
            <Grid item xs={12} spacing={6} align="center">
              <Button
                color="secondary"
                onClick={() => {
                  setSuccessfullySent(true);
                  setTimeout(() => {
                    history.push("/dashboard");
                  }, 2500);
                }}
              >
                Send
              </Button>
            </Grid>
          ) : null}
          {cardPayment ? (
            <Grid item xs={12} spacing={6} align="center">
              <StripeContainer
                sent={setSuccessfullySent}
                token={props.token}
                display={setCardPayment}
              />
            </Grid>
          ) : null}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
