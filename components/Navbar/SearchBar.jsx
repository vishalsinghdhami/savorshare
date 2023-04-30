import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import styles from "@/styles/Navbar/Navbar.module.scss";
export default function SearchBar() {
  return (
    <form className={styles.SearchBar}>
      <button className={styles.SearchBtn}>
        <BiSearchAlt />
      </button>
      <input
        placeholder="search recipie here"
        type="text"
        className={styles.SearchBarInput}
      />
    </form>
  );
}
