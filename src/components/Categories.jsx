import React from "react";

function Categories() {
const[activeIndex,setActiveIndex] = React.useState(0)

let categories = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]

 
  return (
    <div className="categories">
      <ul>
        {categories.map((category, id)=>{
          return (
          <li key = {id} onClick={()=>setActiveIndex(id)} className={activeIndex == id ? "active" : ""}>{category}</li>
        )
        })}

      </ul>
    </div>
  );
}

export default Categories;