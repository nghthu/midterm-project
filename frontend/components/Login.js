"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import styles from "./Login.module.css";

const Login = () => {
  const router = useRouter();
  const [isvalid, setIsValid] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "email") setEmail(value);
    else setPassword(value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 422 || response.status === 401) {
      setIsValid(false);
      return;
    }

    if (!response.ok) {
      setIsValid(false);
      return;
    }

    const resData = await response.json();
    console.log(resData);

    const message = resData.message;

    if (message === "No User Found" || message === "Something went wrong") {
      setIsValid(false);
    }
    if (message === "Log in successfully") {
      setEmail("");
      setPassword("");
      setIsValid(true);
      return router.push("/dashboard");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <p className={styles["signin-label"]}>Log In</p>
        <form onSubmit={submitHandler} className={styles["signin-form"]}>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={changeHandler}
            value={email}
          />
          <p className={styles["none-display"]}>Please enter a valid email.</p>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={changeHandler}
            value={password}
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
