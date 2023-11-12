"use client";

import useSWR, { mutate, useSWRConfig } from "swr";
import Link from "next/link";
import { redirect } from "next/navigation";
import Button from "../UI/Button/Button";
import styles from "./Dashboard.module.css";
import Loading from "../UI/Loading/Loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [info, setInfo] = useState({
    fullName: "",
    email: "",
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
  const { cache } = useSWRConfig();

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(info);

    cache.delete("/api/dashboard");
    const response = await fetch("/api/dashboard", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    mutate("/api/dashboard");
  };

  const logOutHandler = async () => {
    setIsRedirecting(true);
    const response = await fetch("/api/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsRedirecting(false);
    router.push("/");
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
  }, [data, isLoading]);

  if (error) return redirect("/login");
  if (isLoading) return <Loading />;

  return (
    <div className={styles.container}>
      <div className={styles.logout}>
        {!isRedirecting && (
          <Button className={styles.signin} onClick={logOutHandler}>
            Log out
          </Button>
        )}
        {isRedirecting && (
          <Button
            className={`${styles.signin} ${styles.enable}`}
            onClick={logOutHandler}
          >
            Redirecting ...
          </Button>
        )}
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
              <p className={styles.tag}>Sex</p>
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
            <div className={styles.column}>
              <p className={styles.tag}>Email</p>
              <input
                name="email"
                type="email"
                value={info.email}
                onChange={inputChangeHandler}
                required
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
          </div>
          <Button>Update info</Button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
