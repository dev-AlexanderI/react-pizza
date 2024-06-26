import React, { useEffect } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import SkeletonPizzas from "../components/SkeletonPizzas";

function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://666714afa2f8516ff7a6383f.mockapi.io/pizzaList?category=${
        categoryId > 0 ? `${categoryId}` : ""
      }&sortBy=${sortType.sortProperty.replace("-", "")}&order=${
        sortType.sortProperty.includes("-") ? "ASC" : "DESC"
      }`
    )
      .then((promise) => {
        return promise.json();
      })
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onClickSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((item) => {
              return <SkeletonPizzas />;
            })
          : pizzas.map((pizza) => {
              return <PizzaBlock key={pizza.id} {...pizza} />;
            })}
      </div>
    </div>
  );
}

export default Home;
