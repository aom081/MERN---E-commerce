import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/Authcontext";
import CartService from "../service/cart.service";
import useCart from "../hook/useCart";
import Swal from "sweetalert2";

const Card = ({ item }) => {
  const { id, name, image, description, category, price } = item;
  const {user} = useContext(AuthContext);
  const [cart,refetch] = useCart();
  const [isHeartFiled, setIsHeartFiled] = useState(false);
  const handleHeartClick = () => {
    setIsHeartFiled(!isHeartFiled);
  };

  const handleAddToCart = async () => {
    if (!user || !user.email) {
      Swal.fire({
        title: "Error",
        text: "Please login to add item to cart",
        icon: "error",
        });
        return;
    }
    try {
      const cartItem = {
        productId: id,
        email: user.email,
        quantity: 1,
        name,
        price,
        image,
      }
      const response = await CartService.createCartItem(cartItem);
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Item added to cart successfully",
          icon: "success",
          });
          refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to add item to cart",
        icon: "error",
      })
    }
  }
  return (
    <div className="card shadow-xl relative mr-5 md:my-5 h-120">
      <div
        className="rating gap-1 absolute right-2 top-2 p-4 z-10 heartStart"
        onClick={handleHeartClick}
      >
        <input
          type="radio"
          name="heart"
          className={`mask mask-heart ${isHeartFiled ? "bg-red-400" : " "}`}
        />
      </div>
      <figure>
        <img
          src={image}
          alt={name}
          className="hover:scale-105 transition-all duration-300 md:h-30"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <div className="card-action justify-between items-center mt-2">
          <h5 className="text-lg font-bold">
            {price}
            <span className="text-red">฿</span>
          </h5>
          <button className="btn bg-red text-white">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
