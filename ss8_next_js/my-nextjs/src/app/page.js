import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/app/component/Header";
import React from "react";

export default function Home() {
  return (

      <div className={styles.page}>
          <Header/>
        <h1>Hello Next.Js</h1>
      </div>

  );
}
