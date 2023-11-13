"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import Button from "@/components/UI/Button/Button";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className={styles.container}>
      <div className={styles.auth}>
        <Link href="/login">
          <Button className={styles.signin}>Log In</Button>
        </Link>
        <Link href="/signup">
          <Button className={styles.signup}>Sign Up</Button>
        </Link>
      </div>
      <h1>Welcome to our page!</h1>
      <h3>Explore our products and services to discover the possibilities.</h3>
    </div>
  );
}
