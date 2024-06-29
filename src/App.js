import React from "react";
import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Home from "./Pages/Home";
import NotFound from "./components/NotFound";

export const SearchContext = React.createContext();

function App() {
  const [inputValue, setInputValue] = React.useState("");

  return (
    <SearchContext.Provider value={{ inputValue, setInputValue }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
