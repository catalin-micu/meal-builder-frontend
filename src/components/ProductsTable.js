import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import SearchIcon from "@material-ui/icons/Search";
import { IconButton, Box } from "@material-ui/core";
import LocationCityRoundedIcon from "@material-ui/icons/LocationCityRounded";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  rowText: {
    color: "#695f55",
    fontFamily: "Times New Roman",
    fontSize: "18px",
  },
  rowText2: {
    color: "#695f55",
    fontFamily: "Times New Roman",
    fontSize: "13px",
    display: "flex",
    alignItems: "end",
    flexWrap: "wrap",
  },
  rowText3: {
    color: "#58be36",
    textShadow: "1px 0 #000",
    fontFamily: "Times New Roman",
    fontSize: "13px",
  },
  rowText4: {
    color: "#cd4f52",
    textShadow: "1px 0 #000",
    fontFamily: "Times New Roman",
    fontSize: "13px",
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

export default function ProductsTable() {
  var food = [];
  const [rows, setRows] = useState(food);
  const [searched, setSearched] = useState("");
  const classes = useStyles();

  const requestSearch = (searchedVal) => {
    const filteredRows = food.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  return (
    <>
      <br />
      <SearchBar
        placeholder="Search a restaurant..."
        searchIcon={<SearchIcon style={{ color: "#eea42b" }} />}
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
      <br />
      <Paper>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell>
                    <IconButton className={classes.iconAvatar}>
                      <div className={classes.avatar}>
                        <img
                          className={classes.avatar}
                          src={process.env.PUBLIC_URL + row.avatar}
                        />
                      </div>
                    </IconButton>
                  </TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell component="th" scope="row" align="center">
                    <text className={classes.rowText}>{row.name}</text>
                  </TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell align="center">
                    <text className={classes.rowText2}>
                      <LocationCityRoundedIcon />
                      &ensp;{row.city}
                    </text>
                  </TableCell>
                  <TableCell align="center">
                    {row.provides_cm ? (
                      <Box
                        component="span"
                        sx={{
                          p: 1,
                          border: "1px solid grey",
                          borderColor: "#58be36",
                          backgroundColor: "rgba(0,255,0,0.2)",
                          borderRadius: "25px",
                        }}
                      >
                        <text className={classes.rowText3}>
                          provides custom meals
                        </text>
                      </Box>
                    ) : (
                      <Box
                        component="span"
                        sx={{
                          p: 1,
                          border: "1px solid grey",
                          borderColor: "#cd4f52",
                          backgroundColor: "rgba(255,0,0,0.2)",
                          borderRadius: "25px",
                        }}
                      >
                        <text className={classes.rowText4}>
                          doesn't provide custom meals
                        </text>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    {/* TODO MODULARISATION*/}
                    {row.provides_sd ? (
                      <Box
                        component="span"
                        sx={{
                          p: 1,
                          border: "1px solid grey",
                          borderColor: "#58be36",
                          backgroundColor: "rgba(0,255,0,0.2)",
                          borderRadius: "25px",
                        }}
                      >
                        <text className={classes.rowText3}>
                          provides scheduled delivery
                        </text>
                      </Box>
                    ) : (
                      <Box
                        component="span"
                        sx={{
                          p: 1,
                          border: "1px solid grey",
                          borderColor: "#cd4f52",
                          backgroundColor: "rgba(255,0,0,0.2)",
                          borderRadius: "25px",
                        }}
                      >
                        <text className={classes.rowText4}>
                          doesn't provide scheduled delivery
                        </text>
                      </Box>
                    )}
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
