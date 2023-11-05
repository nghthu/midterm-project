import Link from "next/link";

import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import styles from "./page.module.css";

const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles.card}>
        <p className={styles["signin-label"]}>Log In</p>
        <form className={styles["signin-form"]}>
          <Input type="email" placeholder="Email" />
          <p className={styles["none-display"]}>Please enter a valid email.</p>
          <Input type="password" placeholder="Password" />
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
