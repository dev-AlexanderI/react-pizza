import React, { useEffect } from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import SkeletonPizzas from "../components/SkeletonPizzas";
import Pagination from "../components/Pagination";

function Home({ inputValue }) {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });

  const search = inputValue ? `&search=${inputValue}` : "";
  const sortBy = sortType.sortProperty.replace("-", "");
  const order = sortType.sortProperty.includes("-") ? "ASC" : "DESC";
  const category = categoryId > 0 ? `category=${categoryId}` : "";

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://666714afa2f8516ff7a6383f.mockapi.io/pizzaList?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((promise) => {
        return promise.json();
      })
      .then((data) => {
        setPizzas(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, inputValue, currentPage]);

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
      <Pagination onChangePage={setCurrentPage} />
    </div>
  );
}

export default Home;
