import React, { useState } from "react";
import styles from "@/styles/utils/Login.module.scss";
import Cta from "../utils/Cta";
import axios from "axios";
export default function Login({ setIsOpen, isLoggedIn, setIsLoggedIn }) {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  if (type === "login")
    return (
      <LoginComp
        setIsOpen={setIsOpen}
        message={message}
        setMessage={setMessage}
        setType={setType}
        setIsLoggedIn={setIsLoggedIn}
      />
    );
  return (
    <SignUpComp
      setMessage={setMessage}
      message={message}
      setIsOpen={setIsOpen}
      setType={setType}
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

function LoginComp({ setType, setIsOpen, message, setMessage, setIsLoggedIn }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleValueChange = (item) => (e) => {
    setLoginData((prev) => ({ ...prev, [item]: e.target.value }));
  };
  function handleSubmitForm(e) {
    e.preventDefault();
    axios
      .post("https://savorshare.onrender.com/auth/login", loginData)
      .then(function (response) {
        console.log(response.data);
        if (!response.data.user) {
          setMessage(response.data.message);
          return;
        }
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setIsLoggedIn(true);
        setIsOpen(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div>
      <form className={styles.signup}>
        <div className={styles.header}>
          <h2 className={"heading"}>Login</h2>
          <button onClick={() => setIsOpen(false)}>
            <b>&#10005;</b>
          </button>
        </div>
        <div className={styles.main}>
          <div className={styles.input}>
            <input
              onChange={handleValueChange("email")}
              value={loginData.email}
              placeholder="Email"
              type="text"
            />
          </div>
          <div className={styles.input}>
            <input
              onChange={handleValueChange("password")}
              value={loginData.password}
              placeholder="Password"
              type="password"
            />
          </div>
          <div className={styles.footer}>
            <Cta onClick={handleSubmitForm} className={styles.cta}>
              Login
            </Cta>
            <p>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setType("signup")}
                className={styles.highlight}
              >
                create new account.
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
function SignUpComp({ setIsOpen, setType, setIsLoggedIn }) {
  const [signUpData, setsignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleValueChange = (item) => (e) => {
    setsignUpData((prev) => ({ ...prev, [item]: e.target.value }));
  };
  function handleSubmitForm(e) {
    e.preventDefault();
    axios
      .post("https://savorshare.onrender.com/auth/signup", signUpData)
      .then(function (response) {
        console.log(response.data);
        setIsOpen(false);
        setIsLoggedIn(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <form onSubmit={handleSubmitForm} className={styles.signup}>
      <div className={styles.header}>
        <h2 className={"heading"}>SignUp</h2>
        <button onClick={() => setIsOpen(false)}>
          <b>&#10005;</b>
        </button>
      </div>
      <div className={styles.main}>
        <div className={styles.input}>
          <input
            value={signUpData.name}
            placeholder="Full Name"
            type="text"
            onChange={handleValueChange("name")}
          />
        </div>
        <div className={styles.input}>
          <input
            value={signUpData.email}
            onChange={handleValueChange("email")}
            placeholder="Email"
            type="text"
          />
        </div>
        <div className={styles.input}>
          <input
            value={signUpData.password}
            placeholder="Password"
            onChange={handleValueChange("password")}
            type="password"
          />
        </div>
        <div className={styles.input}>
          <input
            value={signUpData.confirmPassword}
            placeholder="Confirm password"
            onChange={handleValueChange("confirmPassword")}
            type="password"
          />
        </div>
        <div className={styles.footer}>
          <Cta className={styles.cta}>Create Account</Cta>
          <p>
            Already have an account?{" "}
            <button
              onClick={() => setType("login")}
              className={styles.highlight}
            >
              Login.
            </button>
          </p>
        </div>
      </div>
    </form>
  );
}
