import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  rowText: {
    color: "#695f55",
    fontFamily: "Times New Roman",
    fontSize: "18px",
    fontWeight: "bold",
  },
  rowText2: {
    color: "#695f55",
    fontFamily: "Times New Roman",
    fontSize: "14px",
  },
  searchB: {
    paddingTop: "50px",
  },
  iconAvatar: {
    padding: "0px",
    margin: "0px",
  },
  avatar: {
    width: "60px",
    height: "60px",
    borderRadius: "5px",
  },
});

export default function ProductsTable(props) {
  var food = props.data;
  const [rows, setRows] = useState(food);
  const [searched, setSearched] = useState("");
  const classes = useStyles();

  const requestSearch = (searchedVal) => {
    const filteredRows = food.filter((row) => {
      return row.food_type.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  var cart_list = [];
  if (JSON.parse(localStorage.getItem("cart"))) {
    cart_list = JSON.parse(localStorage.getItem("cart"));
  }

  return (
    <>
      <br />
      <SearchBar
        placeholder="Search by food type..."
        searchIcon={<SearchIcon style={{ color: "#eea42b" }} />}
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
      <br />
      <Paper>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">Product</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Protein</TableCell>
                <TableCell align="center">Carbs</TableCell>
                <TableCell align="center">Fat</TableCell>
                <TableCell align="center">Calories</TableCell>
                <TableCell align="center">Details</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell />
                  <TableCell component="th" scope="row" align="center">
                    <text className={classes.rowText}>{row.name}</text>
                  </TableCell>
                  <TableCell align="center">
                    <text className={classes.rowText2}>{row.food_type}</text>
                  </TableCell>
                  <TableCell align="center">
                    <text className={classes.rowText2}>{row.protein}</text>
                  </TableCell>
                  <TableCell align="center">
                    <text className={classes.rowText2}>{row.carbs}</text>
                  </TableCell>
                  <TableCell align="center">
                    <text className={classes.rowText2}>{row.fat}</text>
                  </TableCell>
                  <TableCell align="center">
                    <text className={classes.rowText2}>{row.calories}</text>
                  </TableCell>
                  <TableCell align="center">
                    <text className={classes.rowText2}>
                      {row.cooking_details}
                    </text>
                  </TableCell>
                  <TableCell align="center">
                    <text className={classes.rowText2}>
                      {row.price} {row.currency}
                    </text>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => {
                        cart_list.push(
                          row.name + " - " + row.price + " " + row.currency
                        );
                        localStorage.setItem(
                          "total",
                          parseInt(localStorage.getItem("total") || 0) +
                            parseInt(row.price)
                        );
                        localStorage.setItem("cart", JSON.stringify(cart_list));
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
