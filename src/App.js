import React from "react";
import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";
import Header from "./components/Header";
import Cart from "./components/Cart";
import Home from "./Pages/Home";
import NotFound from "./components/NotFound";

import { RootState } from "./Redux/Store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./Redux/counterSlice";

export const SearchContext = React.createContext();

function App() {
  const [inputValue, setInputValue] = React.useState("");

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    // <SearchContext.Provider value={{ inputValue, setInputValue }}>
    //   <div className="wrapper">
    //     <Header />
    //     <div className="content">
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/cart" element={<Cart />} />

    //         <Route path="*" element={<NotFound />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </SearchContext.Provider>
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}

export default App;
