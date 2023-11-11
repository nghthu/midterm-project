"use client";

import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "./UI/Button";
import styles from "./Dashboard.module.css";
import Loading from "./UI/Loading";

const Dashboard = () => {
  const router = useRouter();

  const fetcher = async (url) => {
    const res = await fetch(url);
    return res.json();
  };

  const submitHandler = async (event) => {
    event.preventDefault();
  };

  const { data, error, isLoading } = useSWR("/api/dashboard", fetcher);
  console.log(data, error, isLoading);

  const message = data?.message;

  if (message === "Login needed") {
    router.push("/login");
  }

  if (error) return <div>failed to load</div>;
  if (isLoading) return <Loading />;

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
              <input type="text" required />

              <p className={styles.tag}>Address</p>
              <input type="text" />
              <p className={styles.tag}>Phone Number</p>
              <input type="text" required />
            </div>
            <div className={styles.column}>
              <p className={styles.tag}>Email</p>
              <input type="email" required />
              <p className={styles.tag}>Password</p>
              <input type="password" required />
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
