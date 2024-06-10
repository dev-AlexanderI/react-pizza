import React, { useEffect } from "react";
import "./scss/app.scss";
import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock";
// import pizzas from "../src/assets/pizzas.json";

function App() {
  const [pizzas, setPizzas] = React.useState([]);

  useEffect(() => {
    fetch("https://666714afa2f8516ff7a6383f.mockapi.io/pizzaList")
      .then((promise) => {
        return promise.json();
      })
      .then((data) => {
        setPizzas(data);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza) => {
              return <PizzaBlock key={pizza.id} {...pizza} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
