"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Input from "@/components/UI/Input/Input";
import Button from "@/components/UI/Button/Button";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const router = useRouter();

  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    email: "",
    tel: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

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
    setRegistrationData((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });

    setIsLoading(false);

    if (!response.ok) {
      setIsValid(false);
      return;
    }

    const resData = await response.json();

    if (resData?.error) {
      setIsValid(false);
    }

    if (resData.message === "Sign up successfully") {
      setRegistrationData({ fullName: "", email: "", tel: "", password: "" });
      setIsValid(true);
      router.push("/login");
    }
  };

  return (
    <div className={styles.signup}>
      <div className={styles.card}>
        <p className={styles["signin-label"]}>Sign Up</p>
        <form onSubmit={submitHandler} className={styles["signin-form"]}>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={changeHandler}
            value={registrationData.email}
          />
          <p className={styles["none-display"]}>Please enter a valid email.</p>
          <Input
            name="fullName"
            type="text"
            placeholder="Full name"
            onChange={changeHandler}
            value={registrationData.fullName}
          />
          <p className={styles["none-display"]}>
            Name cannot contain special characters.
          </p>
          <Input
            name="tel"
            type="text"
            placeholder="Phone"
            onChange={changeHandler}
            value={registrationData.tel}
          />
          <p className={styles["none-display"]}>
            Please enter a valid phone number.
          </p>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={changeHandler}
            value={registrationData.password}
          />
          <p className={isValid ? styles["none-display"] : ""}>
            Cannot Register User: Email Already Exists
          </p>
          {!isLoading && <Button>Sign Up</Button>}
          {isLoading && <Button className={styles.enable}>Loading ...</Button>}
        </form>
        <div className={styles["login"]}>
          <p>already a user?</p>
          <Link href="/login">Login.</Link>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
