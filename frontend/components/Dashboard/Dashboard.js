"use client";

import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../UI/Button/Button";
import styles from "./Dashboard.module.css";
import Loading from "../UI/Loading/Loading";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
    password: "",
    tel: "",
    sex: "male",
    address: "",
  });

  const radioChangeHandler = (value) => {
    setInfo((prevInfo) => ({ ...prevInfo, sex: value }));
  };

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok || data?.error) {
      const error = new Error();
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }

    return data;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
  };

  const { data, error, isLoading } = useSWR("/api/dashboard", fetcher);

  useEffect(() => {
    if (data !== undefined)
      setInfo((prevInfo) => ({
        ...prevInfo,
        fullName: data.info.fullName || "",
        email: data.info.email || "",
        tel: data.info.tel || "",
        sex: data.info.sex || "male",
        address: data.info.address || "",
      }));
    // dùng kiểu này thì luôn quay về login và hiển thị 1 chút xíu dashboard
    // if (error) router.push("/login");
  }, [data]);

  if (error) return <p>Error</p>;
  if (isLoading) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.logout}>
        <Link href="/">
          <Button className={styles.signin}>Log out</Button>
        </Link>
      </div>
      <h1>Hello, {data?.info.fullName}</h1>
      <div className={styles.card}>
        <form onSubmit={submitHandler} className={styles.form}>
          <p className={styles["edit-label"]}>Edit your Profile</p>
          <div className={styles["input-fields"]}>
            <div className={styles.column}>
              <p className={styles.tag}>Full Name</p>
              <input
                name="fullName"
                type="text"
                value={info.fullName}
                onChange={inputChangeHandler}
                required
              />

              <p className={styles.tag}>Address</p>
              <input
                name="address"
                type="text"
                value={info.address}
                onChange={inputChangeHandler}
              />
              <p className={styles.tag}>Phone Number</p>
              <input
                name="tel"
                type="text"
                value={info.tel}
                onChange={inputChangeHandler}
                required
              />
            </div>
            <div className={styles.column}>
              <p className={styles.tag}>Email</p>
              <input
                name="email"
                type="email"
                value={info.email}
                onChange={inputChangeHandler}
                required
              />
              <p className={styles.tag}>Password</p>
              <input
                name="password"
                type="password"
                value={info.password}
                onChange={inputChangeHandler}
                required
              />
              <div className={styles["radio-group"]}>
                <label className={styles["radio-container"]}>
                  Male
                  <input
                    type="radio"
                    name="radio"
                    checked={info.sex === "male"}
                    onChange={() => radioChangeHandler("male")}
                  />
                  <span className={styles.checkmark}></span>
                </label>
                <label className={styles["radio-container"]}>
                  Female
                  <input
                    type="radio"
                    name="radio"
                    checked={info.sex === "female"}
                    onChange={() => radioChangeHandler("female")}
                  />
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
