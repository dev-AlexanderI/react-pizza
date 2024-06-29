import React from "react";
import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Home from "./Pages/Home";
import NotFound from "./components/NotFound";
// import pizzas from "../src/assets/pizzas.json";

function App() {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <div className="wrapper">
      <Header inputValue={inputValue} setInputValue={setInputValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home inputValue={inputValue} />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
