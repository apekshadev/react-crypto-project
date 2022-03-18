import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

import { CryptoState } from "../../Context";
import { CoinList } from "../../config/api";
import {
  Container,
  createTheme,
  LinearProgress,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  Table,
  TableBody,
} from "@material-ui/core";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinTable = () => {
  const [coins, setCoints] = useState([]);
  const [loading, setLoding] = useState(false);
  const [search, setSerach] = useState("");
  const [page, setPage] = useState(1);
  const { currency, symbol } = CryptoState();
  const navigate = useNavigate();
  const fetchCoins = async () => {
    setLoding(false);
    const { data } = await axios.get(CoinList(currency));
    setLoding(false);
    setCoints(data);
  };
  console.log(coins);
  useEffect(() => {
    fetchCoins();
  }, [currency]);
  //   const darkTheme = createTheme({
  //     palette: {
  //       primary: { main: "#fff" },
  //       type: "dark",
  //     },
  //   });
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };
  const useStyles = makeStyles({
    row: {
      backgroundColor: "#fff",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#daedff",
      },
      fontFamily: "Montserrat",
    },
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "#0483ff",
      },
    },
  });
  const classes = useStyles();

  return (
    <>
      {/* <ThemeProvider theme={darkTheme}> */}
      <ThemeProvider>
        <Container style={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{
              margin: 18,
              fontFamily: "Montserrat",
              color: "#0483ff",
              fontWeight: " bold",
            }}
          >
            Cryptocurrency Prices by Market Cap
          </Typography>
        </Container>
        <TextField
          label="Search your currency here...!"
          variant="outlined"
          style={{
            width: "100%",
            marginBottom: 20,

            fontSize: 22,
            outline: "#0483ff",
          }}
          onChange={(e) => {
            setSerach(e.target.value);
          }}
        ></TextField>
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#0483ff" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#0483ff" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                        fontSize: 20,
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    let profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="80"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row?.symbol}
                            </span>
                            <span
                              style={{
                                color: "darkgrey",
                              }}
                            >
                              {row?.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <span
                            style={{
                              fontSize: 18,
                            }}
                          >
                            {symbol}
                            {numberWithCommas(row?.current_price.toFixed(2))}
                          </span>
                        </TableCell>
                        <TableCell align="right">
                          <span
                            style={{
                              color: profit > 0 ? "green" : "red",
                              fontSize: 18,
                              fontWeight: 500,
                            }}
                          >
                            {profit && "+"}
                            {row?.price_change_percentage_24h?.toFixed(2)}%
                          </span>
                        </TableCell>
                        <TableCell align="right">
                          <span
                            style={{
                              fontSize: 18,
                            }}
                          >
                            {numberWithCommas(row?.market_cap.toFixed(2))}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: 20,
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </ThemeProvider>
    </>
  );
};

export default CoinTable;
