"use client";

import Link from "next/link";
import styles from "./page.module.css";
import Button from "@/components/UI/Button";

const Dashboard = () => {
  const submitHandler = async (event) => {};

  return (
    <div className={styles.container}>
      <div className={styles.logout}>
        <Link href="/">
          <Button className={styles.signin}>Log out</Button>
        </Link>
      </div>
      <h1>Hello, Username!</h1>
      <div className={styles.card}>
        <form onSubmit={submitHandler} className={styles.form}>
          <p className={styles["edit-label"]}>Edit your Profile</p>
          <div className={styles["input-fields"]}>
            <div className={styles.column}>
              <p className={styles.tag}>Full Name</p>
              <input type="text" />
              <p className={styles.tag}>Email</p>
              <input type="email" />
              <p className={styles.tag}>Phone Number</p>
              <input type="text" />
            </div>
            <div className={styles.column}>
              <p className={styles.tag}>Password</p>
              <input type="password" />
              <p className={styles.tag}>Adress</p>
              <input type="text" />
              <div className={styles["radio-group"]}>
                <label className={styles["radio-container"]}>
                  Male
                  <input type="radio" name="radio" />
                  <span className={styles.checkmark}></span>
                </label>
                <label className={styles["radio-container"]}>
                  Female
                  <input type="radio" name="radio" />
                  <span className={styles.checkmark}></span>
                </label>
              </div>
            </div>
          </div>
          <Button>Update info</Button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
