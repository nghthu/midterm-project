"use client";

import Link from "next/link";

import Input from "@/components/UI/Input/Input";
import Button from "@/components/UI/Button/Button";
import styles from "./SignUp.module.css";

const SignUp = () => {
  return (
    <div className={styles.signup}>
      <div className={styles.card}>
        <p className={styles["signin-label"]}>Sign Up</p>
        <form className={styles["signin-form"]}>
          <Input type="email" placeholder="Email" />
          <p className={styles["none-display"]}>Please enter a valid email.</p>
          <Input name="fullName" type="text" placeholder="Full name" />
          <p className={styles["none-display"]}>
            Name cannot contain special characters.
          </p>
          <Input name="tel" type="text" placeholder="Phone" />
          <p className={styles["none-display"]}>
            Please enter a valid phone number.
          </p>
          <Input name="password" type="password" placeholder="Password" />
          <p className={styles["none-display"]}>
            Your password must contain between 4 and 60 characters.
          </p>
          <Button>Sign Up</Button>
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
