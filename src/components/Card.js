import { withRouter } from "react-router-dom";
import { CardElement } from "@stripe/react-stripe-js";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Card = (props) => {
  var token = props.token;
  const history = useHistory();

  return (
    <div
      style={{
        width: "100%",
        height: "70px",
        padding: "5px",
        marginBottom: "30px",
        border: "1px solid #695f55",
        borderRadius: "10px",
      }}
    >
      <form id="payment-form">
        <CardElement id="card-element" />
        <br />
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            props.sent(true);
            props.display(false);
            setTimeout(() => {
              history.push("/dashboard/" + token);
            }, 2500);
          }}
        >
          Pay
        </Button>
      </form>
    </div>
  );
};

export default withRouter(Card);
