"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import styles from "./page.module.css";

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // const response = await fetch("http://localhost:8080/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });

    const response = {
      status: 422,
      resData: { token: true },
      ok: true,
    };

    // if (response.status === 422 || response.status === 401) {
    //   return response;
    // }

    // if (!response.ok) {
    //   throw json({ message: "Could not authenticate user." }, { status: 500 });
    // }

    // const resData = await response.json();
    const resData = response.resData;
    const token = resData.token;

    localStorage.setItem("token", token);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    return router.push("/dashboard");
  };

  console.log(formData);

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
          />
          <p className={styles["none-display"]}>Please enter a valid email.</p>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={changeHandler}
          />
          <p className={styles["none-display"]}>
            Your password must contain between 4 and 60 characters.
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
