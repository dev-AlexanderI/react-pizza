import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Categories from "../components/Categories";
import Sort, { sortNames } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import SkeletonPizzas from "../components/SkeletonPizzas";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import axios from "axios";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../Redux/slices/filterSlice";
import { fetchPizzas } from "../Redux/slices/pizzaSlice";




const Home = () => {
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const {items,status} = useSelector(
    (state) => state.pizza
  );

  
  const { inputValue } = React.useContext(SearchContext);

  const  getPizzas = async() => {
    const search = inputValue ? `&search=${inputValue}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "ASC" : "DESC";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
     
    dispatch(fetchPizzas({
        search,
        sortBy,
        order,
        category,
        currentPage
      }))
  }

  function changeCategoryId(id) {
    dispatch(setCategoryId(id));
  }

  const changeCurrentPage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const navigate = useNavigate();

  

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortNames.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  useEffect(()=>{
    if(window.location.search){
      getPizzas()
    }
  },[categoryId,sort.sortProperty,inputValue,currentPage])

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
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

      {status==="error"?(
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>К сожалению не удалось получить пиццы. Попробуйте повторить попытку позже.</p>
        </div>
      ): <div className="content__items">
        {status==="loading"
          ? [...new Array(6)].map((_, id) => {
              return <SkeletonPizzas key={id} />;
            })
          : items.map((pizza) => {
              return <PizzaBlock key={pizza.id} {...pizza} />;
            })}
      </div>}
     
      <Pagination currentPage={currentPage} onChangePage={changeCurrentPage} />
    </div>
  );
}

export default Home;
