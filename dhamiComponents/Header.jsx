import React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <div className="flex justify-between px-4 pt-4">
      <h2>Dashboard</h2>
      <div>
        <Link href="/dashboard/allrecipes">
          <button className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded">
           My All Recipes
          </button>
        </Link>
        <Link href="/dashboard/allblogs">
          <button
            style={{ marginLeft: "15px" }}
            className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
          >
           My All Blogs
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
