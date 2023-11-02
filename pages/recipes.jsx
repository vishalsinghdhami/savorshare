import AddRecipe from "@/components/Recipe/AddRecipe";
import Cta from "@/components/utils/Cta";
import MyModal from "@/components/utils/Modal";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "@/styles/Recipe.module.scss";
import axios from "axios";
import Container from "@/components/utils/Container";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { FiShare } from "react-icons/fi";
export default function Recipes({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [allblogs, setAllblogs] = useState([]);
  const [show2, setShow2] = useState(false);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const addComment = async (recipeId, index) => {
    let ret = { email: email, comment: newcomment, recipeid: recipeId };
    let sample = [...allblogs];
    sample[index].comments.push(ret);

    setAllblogs(sample);
    await axios.post("https://savorshare.onrender.com/recipe/addcomment", ret);
  };
  return (
    <div>
      <Container>
        <Cta className={styles.cta} onClick={() => setIsOpen(true)}>
          Create New Recipe
        </Cta>
      </Container>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <AddRecipe setIsOpen={setIsOpen} />
      </MyModal>
      <main>
        {data.map((e) => (
          <>
            <Container key={e._id}>
              <div className={styles.recipeCover}>
                <div className={styles.left}>
                  <img
                    style={{
                      objectFit: "cover",
                      height: 300,
                      width: 300,
                      objectPosition: "center",
                    }}
                    alt={e.photos.title}
                    src={e.photos.url}
                  />
                  <div className={styles.base}>
                    <Likes />
                    {show2 ? (
                      <div>
                        {allblogs.map((it, index) => {
                          return (
                            <p key={index}>
                              {`@${it.comments.email} ${it.comments.comment}`}
                            </p>
                          );
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                    <Button
                      variant="primary"
                      style={{ fontSize: 12 }}
                      onClick={(e) => setShow2(!show2)}
                    >
                      Show comments
                    </Button>
                    <FiShare />
                  </div>
                </div>
                <div className={styles.right}>
                  <h2 className={styles.heading}>{e.title}</h2>
                  <p className={styles.ingredients}>Ingredients: {e.ingredients}</p>
                  <div className={styles.row}>
                    <p className={styles.typeofcuisine}>{e.typeofcuisine}</p>
                    <p>{e.mealtype}</p>
                  </div>
                  <p>
                    dietary restrictions: contains{" "}
                    {e?.restriction?.map((e) => (
                      <span key={uuidv4()}>{e + ", "}</span>
                    ))}
                  </p>
                  {e.cookingsteps.map((e, i) => (
                    <div key={i}> {e}</div>
                  ))}
                </div>
              </div>
            </Container>
          </>
        ))}
      </main>
    </div>
  );
}
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await axios.get("https://savorshare.onrender.com/recipe/getall");
  const data = await res.data;
  // Pass data to the page via props
  return { props: { data } };
}

function Likes() {
  const [isLiked, setIsLiked] = useState(false);
  return (
    <button onClick={() => setIsLiked((prev) => !prev)} className={styles.like}>
      {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
      {Math.floor(10)}
    </button>
  );
}
