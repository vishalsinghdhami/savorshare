import React, { useState, useEffect } from "react";
import styles from "@/styles/Recipe.module.scss";
import { v4 as uuidv4 } from "uuid";
import Cta from "../utils/Cta";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "@/components/firebase";
import { v4 } from "uuid";
import Image from "next/image";
import axios from "axios";

export default function AddRecipe({ setIsOpen }) {
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: "",
    cookingsteps: [""],
    photos: {},
    typeofcuisine: "",
    mealtype: "",
    restriction: "",
  });
  const [imageUpload, setImageUpload] = useState(null);
  const imagesListRef = ref(storage, "data/");
  const uploadFile = (e) => {
    e.preventDefault();

    if (imageUpload == null) return;
    const imageRef = ref(storage, `data/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url, "recipe url");
        setRecipe((prev) => ({
          ...prev,
          photos: { type: "image", url: url },
        }));
      });
    });
  };
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setRecipe((prev) => ({
            ...prev,
            photos: { title: uuidv4(), url: url },
          }));
        });
      });
    });
  }, []);
  const handleChange = (item) => (e) => {
    setRecipe((prev) => ({
      ...prev,
      [item]: e.target.value,
    }));
  };
  const handleCookingChange = (index, event) => {
    const newSteps = [...recipe.cookingsteps];
    newSteps[index] = event.target.value;
    setRecipe((prev) => ({ ...prev, cookingsteps: newSteps }));
  };
  const addStep = (step) => {
    setRecipe((prev) => ({
      ...prev,
      cookingsteps: [...prev.cookingsteps, step],
    }));
  };
  const removeStep = (index) => {
    const newSteps = [...recipe.cookingsteps];
    newSteps.splice(index, 1);
    setRecipe((prev) => ({ ...prev, cookingsteps: newSteps }));
  };
  const renderSteps = () => {
    return (
      <ul className={styles.steps}>
        {recipe.cookingsteps.map((step, index) => (
          <li key={index}>
            <input
              type="text"
              value={step}
              placeholder={"step " + (index + 1)}
              onChange={(event) => handleCookingChange(index, event)}
            />
            <button onClick={() => removeStep(index)}>&#10005;</button>
          </li>
        ))}
      </ul>
    );
  };
  function submitForm(e) {
    e.preventDefault();
    axios
      .post("https://savorshare.onrender.com/recipe/add", recipe)
      .then((data) => console.log(data.data));
    setIsOpen(false);
  }
  return (
    <form onSubmit={submitForm} className={styles.form}>
      <div className={styles.header}>
        <div className="heading small">Add new recipe</div>
        <p onClick={() => setIsOpen(false)}>&#10005;</p>
      </div>
      <div className={styles.imageupload}>
        <label htmlFor="recipe-image">Add an image</label>
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <button
          style={{ border: "1px solid", backgroundColor: "#d63031" }}
          onClick={uploadFile}
        >
          {" "}
          Upload Image
        </button>
      </div>
      <div className={styles.input}>
        <label htmlFor="recipe title">Title: </label>
        <input
          value={recipe.title}
          onChange={handleChange("title")}
          type="text"
          placeholder="add your recipe title here"
        />
      </div>
      <div className={styles.input}>
        <label htmlFor="ingredients">ingredients: </label>
        <input
          onChange={handleChange("ingredients")}
          type="text"
          placeholder="ingredients"
        />
      </div>
      <div className={styles.input}>
        <label>Steps: </label>
        {renderSteps()}
        <a className={styles.add} onClick={() => addStep("")}>
          Add Step
        </a>
      </div>
      <div className={styles.input}>
        <label htmlFor="typeofcuisine">typeofcuisine: </label>
        <input
          type="text"
          value={recipe.typeofcuisine}
          name="typeofcuisine"
          id="typeofcuisine"
          onChange={handleChange("typeofcuisine")}
        />
      </div>
      <div className={styles.input}>
        <label htmlFor="category">Category: </label>
        <input
          type="text"
          value={recipe.mealtype}
          name="category"
          id="category"
          placeholder="like breakfast, lunch, dinner, veg or non-veg"
          onChange={handleChange("mealtype")}
        />
      </div>
      <div className={styles.input}>
        <label htmlFor="restriction">Dietery restriction: </label>
        <input
          type="text"
          value={recipe.restriction}
          name="restriction"
          id="restriction"
          onChange={handleChange("restriction")}
        />
      </div>
      <Cta className={styles.cta} type="submit">
        post
      </Cta>
    </form>
  );
}
