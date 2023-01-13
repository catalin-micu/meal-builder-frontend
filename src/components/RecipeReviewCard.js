import React from "react";
import { styled } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  var mealName = props.mealName;
  var protein = props.protein;
  var carbs = props.carbs;
  var fat = props.fat;
  var calories = props.calories;
  var details = props.details;
  var price = props.price;
  var currency = props.currency;

  var cart_list = [];
  if (JSON.parse(localStorage.getItem("cart"))) {
    cart_list = JSON.parse(localStorage.getItem("cart"));
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{ maxWidth: 345 }}
      style={{ margin: "25px", borderRadius: "40px" }}
    >
      <CardHeader
        title={mealName}
        titleTypographyProps={{
          variant: "h6",
          align: "center",
        }}
      />
      <CardMedia component="img" height="194" image={props.image} />
      <CardContent>
        <Typography variant="body2" color="text.secondary" align="center">
          Total calories : {calories}
          <br /> <br />
          protein: {protein}
          <br />
          carbs: {carbs}
          <br />
          fat: {fat}
          <br />
          <br />
          <strong>
            Price: {price} {currency}
          </strong>
          <div>
            <IconButton
              onClick={() => {
                cart_list.push(mealName + " - " + price + " " + currency);
                localStorage.setItem(
                  "total",
                  parseInt(localStorage.getItem("total") || 0) + parseInt(price)
                );
                localStorage.setItem("cart", JSON.stringify(cart_list));
              }}
            >
              <AddIcon />
            </IconButton>
          </div>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Details:</Typography>
          <Typography paragraph>{details}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
