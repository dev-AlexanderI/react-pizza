import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import SkeletonPizzas from "../components/SkeletonPizzas";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import axios from "axios";

import { setCategoryId, setCurrentPage } from "../Redux/slices/filterSlice";

function Home() {
  const dispatch = useDispatch();

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { inputValue } = React.useContext(SearchContext);

  function changeCategoryId(id) {
    dispatch(setCategoryId(id));
  }

  const changeCurrentPage = (number) => {
    dispatch(setCurrentPage(number));
  };

  useEffect(() => {
    const search = inputValue ? `&search=${inputValue}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "ASC" : "DESC";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    setIsLoading(true);

    axios
      .get(
        `https://666714afa2f8516ff7a6383f.mockapi.io/pizzaList?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setPizzas(res.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, inputValue, currentPage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(i) => changeCategoryId(i)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, id) => {
              return <SkeletonPizzas key={id} />;
            })
          : pizzas.map((pizza) => {
              return <PizzaBlock key={pizza.id} {...pizza} />;
            })}
      </div>
      <Pagination currentPage={currentPage} onChangePage={changeCurrentPage} />
    </div>
  );
}

export default Home;
