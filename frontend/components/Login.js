"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import styles from "./Login.module.css";

const Login = () => {
  const router = useRouter();
  const [isvalid, setIsValid] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const email = emailInputRef.current?.value;
  const password = passwordInputRef.current?.value;

  console.log("data in login: ", email, password);

  const submitHandler = async (event) => {
    event.preventDefault();

    // const response = await fetch("/api/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, password }),
    // });

    // if (response.status === 422 || response.status === 401) {
    //   setIsValid(false);
    //   return response;
    // }

    // if (!response.ok) {
    //   setIsValid(false);
    //   return;
    // }

    // const resData = await response.json();

    // const resData = response.resData;
    // const accessToken = resData.accessToken;
    // const refreshToken = resData.refreshToken;
    // localStorage.setItem("accessToken", accessToken);
    // const expiration = new Date();
    // expiration.setHours(expiration.getMinutes() + 5);
    // localStorage.setItem("expiration", expiration.toISOString());

    // emailInputRef.current.clear();
    // passwordInputRef.current.clear();

    setIsValid((prevState) => !prevState);

    // return router.push("/dashboard");
  };

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <p className={styles["signin-label"]}>Log In</p>
        <form onSubmit={submitHandler} className={styles["signin-form"]}>
          <Input
            ref={emailInputRef}
            name="email"
            type="email"
            placeholder="Email"
          />
          <p className={styles["none-display"]}>Please enter a valid email.</p>
          <Input
            ref={passwordInputRef}
            name="password"
            type="password"
            placeholder="Password"
          />
          <p className={isvalid ? styles["none-display"] : ""}>
            Incorrect Email or Password.
          </p>
          <Button>Log In</Button>
        </form>
        <div className={styles["sign-up"]}>
          <p>Need an account?</p>
          <Link href="/signup">Sign up now.</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
