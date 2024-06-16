import React, { useEffect } from "react";


import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import SkeletonPizzas from "../components/SkeletonPizzas";

function Home(){

    const [pizzas, setPizzas] = React.useState([]);
    const [isLoading, setIsLoading]= React.useState(true)

    useEffect(() => {
        fetch("https://666714afa2f8516ff7a6383f.mockapi.io/pizzaList")
          .then((promise) => {
            return promise.json();
          })
          .then((data) => {
            setPizzas(data);
            setIsLoading(false)
          });
      }, []);

    return(
        <>
        <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
           
            {isLoading ? [...new Array(6)].map(item =>{
              return <SkeletonPizzas />;
            }):pizzas.map(pizza=>{
              return <PizzaBlock key={pizza.id} {...pizza} />
            })}
          </div>
          </>
    )

}

export default Home;