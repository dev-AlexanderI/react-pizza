import React from "react";
import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";
import Header from "./components/Header";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
// import pizzas from "../src/assets/pizzas.json";

function App() {
  

  

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
         <Routes>
          <Route path="/" element = {<Home />}/>
          <Route path="/cart" element = {<Cart />}/>

          <Route path="*" element = {<NotFound />}/>

          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
