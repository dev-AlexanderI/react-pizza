import React from "react";
import cartEmptyImg from "../assets/img/empty-cart.png";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <>
      <div class="cart cart--empty">
        <h2>Корзина пустая</h2>
        <p>
          Вероятней всего,вы не заказывали еще пиццу. Для того что бы заказать
          пиццу, перейдите на главную страницу.
        </p>
        <img src={cartEmptyImg} alt="Корзина пустая" />
        <Link to="/" class="button button--black">
          <span>Вернуться назад</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
