import React from "react";
import AppBar from "@material-ui/core/AppBar";
import {
  createTheme,
  makeStyles,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  ThemeProvider,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../Context";
const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "#0483ff",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: 22,
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();
  // const darkTheme = createTheme({
  //   palette: {
  //     primary: { main: "#fff" },
  //     type: "dark",
  //   },
  // });
  return (
    <>
      <ThemeProvider>
        {/* <ThemeProvider theme={darkTheme}> */}
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              <Typography
                onClick={() => navigate(`/`)}
                className={classes.title}
                variant="h6 "
              >
                Crypto-Curr
              </Typography>
              <Select
                variant="outlined"
                style={{
                  width: 100,
                  height: 40,
                  marginRight: 15,
                  outlineStyle: "solid",
                  outlineColor: "#0483ff",
                  color: "#0483ff",
                }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem
                  value={"USD"}
                  style={{
                    color: "#0483ff",
                  }}
                >
                  USD
                </MenuItem>
                <MenuItem
                  value={"INR"}
                  style={{
                    color: "#0483ff",
                  }}
                >
                  INR
                </MenuItem>
              </Select>
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    </>
  );
};

export default Header;
