import React from "react";
import Link from "next/link";
import axios from "axios";
import { BsPersonFill, BsThreeDotsVertical } from "react-icons/bs";
import { GiCook } from "react-icons/gi";
import { useState, useEffect } from "react";
const Allrecipes = () => {
  //use effect frontend-backend logic

  const [recipeData, setRecipeData] = useState([]);
  //use effect frontend-backend logic
  useEffect(() => {
    axios
      .post("https://savorshare.onrender.com/recipe/getbyid", {
        userid: JSON.parse(localStorage.getItem("user"))._id,
      })
      .then((response) => {
        // handle the response data
        setRecipeData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // handle the error
        console.log(error);
      });
  }, []);

  return (
    <div
      className="bg-gray-100 min-h-screen text-base"
      style={{ fontSize: "18px" }}
    >
      <div className="flex justify-between p-4">
        <h2>My All Recipes</h2>
        <Link href="/dashboard/allblogs">
          <button
            style={{ marginLeft: "15px" }}
            className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
          >
            My All Blogs
          </button>
        </Link>
      </div>
      <div className="p-4">
        <div className="w-full m-auto p-4 border rounded-lg bg-white overflow-y-auto">
          <div className="my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer">
            <span>Recipe Name</span>
            <span className="sm:text-left text-right">No of Likes</span>
            <span className="hidden md:grid">No of Comments</span>
            <span className="hidden sm:grid">Date Created</span>
          </div>
          <ul>
            {recipeData.map((it, index) => (
              <li
                key={index}
                className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 items-center justify-between cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <GiCook className="text-purple-800" />
                  </div>
                  <p className="pl-4">{it.title}</p>
                </div>
                <p className="text-gray-600 sm:text-left text-right">
                  {it.likes.length}
                </p>
                <p className="hidden md:flex">{it.comments.length}</p>
                <div className="sm:flex hidden justify-between items-center">
                  <p>{it.date}</p>
                  <BsThreeDotsVertical />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Allrecipes;
