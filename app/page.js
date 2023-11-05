import Image from "next/image";
import styles from "./page.module.css";
import Button from "@/components/UI/Button";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.auth}>
        <Button className={styles.signin}>Log In</Button>
        <Button className={styles.signup}>Sign Up</Button>
      </div>
      <h1>Welcome to our page!</h1>
      <h3>Explore our products and services to discover the possibilities.</h3>
    </div>
  );
}
