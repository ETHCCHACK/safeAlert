//Safe Alert - Hackathon ETHCC5
import React, { FC } from "react";
import Head from "next/head";
import SafeLogo from "./SafeLogo";
import styles from "../styles/Layout.module.css";

interface Props {
  backgroundClass?: string;
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children, backgroundClass }) => {
  return (
    <>
      <Head>
        <title> Safe Alert </title>
        <img src="../public/logo_safe_alert.png"></img>
      </Head>
      <main>
        {backgroundClass ? (
          <div className={backgroundClass}></div>
        ) : (
          <div className={styles.safe}></div>
        )}

        <div className={styles.outer}>
          <div className={styles.inner}>
            <div className={styles.logo}>
              <SafeLogo></SafeLogo>
            </div>
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
