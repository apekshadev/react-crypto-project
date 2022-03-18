import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Coin from "./Pages/Coin";
import HomePage from "./Pages/HomePage";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "##f8f8f9",
    color: "white",
    minHeight: "100vh",
    padding: 2,
    marginLeft: 50,
    marginRight: 50,
  },
}));
function App() {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/coins/:id" element={<Coin />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
