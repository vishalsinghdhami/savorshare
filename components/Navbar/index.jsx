import Container from "../utils/Container";
import Link from "next/link";
import styles from "@/styles/Navbar/Navbar.module.scss";
import SearchBar from "./SearchBar";
import Cta from "../utils/Cta";
import {
  TiSocialTumbler,
  TiSocialYoutube,
  TiSocialTwitter,
  TiSocialFacebook,
} from "react-icons/ti";
import { IoLogoPinterest, IoLogoLinkedin } from "react-icons/io";
import MyModal from "../utils/Modal";
import { useEffect, useState } from "react";
import Login from "./Login";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const links = [
    { logo: <TiSocialTumbler />, link: "https://www.tumbler.com" },
    { logo: <TiSocialYoutube />, link: "https://www.youtube.com" },
    { logo: <TiSocialTwitter />, link: "https://www.twitter.com" },
    { logo: <IoLogoPinterest />, link: "https://www.pinterest.com" },
    { logo: <IoLogoLinkedin />, link: "https://www.linkedin.com" },
    { logo: <TiSocialFacebook />, link: "https://www.facebook.com" },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, [isLoggedIn]);
  function handleLogOut() {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  }
  return (
    <>
      <nav className={styles.Nav}>
        <div className={styles.Contact}>
          <Container className={styles.Container}>
            <ul className={styles.Left}>
              <li>
                <Link href={"/about"}>About</Link>
              </li>
              <li>
                <Link href={"/contact"}>Contact</Link>
              </li>
            </ul>
            <ul className={styles.right}>
              {links.map((link) => (
                <li key={link.link}>
                  <Link href={link.link}>{link.logo}</Link>
                </li>
              ))}
            </ul>
          </Container>
        </div>
        <div className={styles.Main}>
          <Container className={styles.Container}>
            <Link href={"/"} className={styles.Logo}>
              SavorShare
            </Link>
            <ul className={styles.NavLinks}>
              <li>
                <Link href={"/recipes"}>Recipes</Link>
              </li>
              <li>
                <Link href={"/blog"}>Blog</Link>
              </li>
            </ul>
            <SearchBar />
            {user !== null ? (
              <>
                <Link href={"/dashboard"}>{user.name.toUpperCase()}</Link>
                <Cta onClick={handleLogOut}>Logout</Cta>
              </>
            ) : (
              <Cta onClick={() => setIsOpen(true)} className={styles.login}>
                Login
              </Cta>
            )}
          </Container>
        </div>
      </nav>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Login
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
          setIsOpen={setIsOpen}
        />
      </MyModal>
    </>
  );
}
