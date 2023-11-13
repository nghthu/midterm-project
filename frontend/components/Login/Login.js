"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Input from "@/components/UI/Input/Input";
import Button from "@/components/UI/Button/Button";
import styles from "./Login.module.css";

const Login = () => {
  const router = useRouter();
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api");
      const resData = await response.json();

      if (resData?.message) {
        router.push("/dashboard");
      }
    };
    fetchData();
  }, []);

  const changeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "email") setEmail(value);
    else setPassword(value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    setIsLoading(false);

    if (!response.ok) {
      setIsValid(false);
      return;
    }

    const resData = await response.json();

    const message = resData.message;

    if (message === "No User Found" || message === "Something went wrong") {
      setIsValid(false);
    }
    if (message === "Log in successfully") {
      setEmail("");
      setPassword("");
      setIsValid(true);
      console.log("redirect");
      router.push("/dashboard");
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
          <p className={isValid ? styles["none-display"] : ""}>
            Incorrect Email or Password.
          </p>
          {!isLoading && <Button>Log In</Button>}
          {isLoading && <Button className={styles.enable}>Loading ...</Button>}
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
