//Safe Alert - Hackathon ETHCC5
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import { useSession } from "../components/Session";
import { useRouter } from "next/router";
import FileIcon from "../components/FileIcon";
import SignIcon from "../components/SignIcon";
import Layout from "../components/Layout";
import AnoLogo from "../components/AnoLogo";


export async function getStaticProps() {
  return {
    props: {
      protected: false,
    },
  };
}

function SignIn() {
  const router = useRouter();
  const session = useSession();

  function onSubmit() {
    function onSuccess() {
      router.push("/");
    }

    function onFailure(error: Error) {
      console.error(error);
    }

    session.authenticate().then(onSuccess, onFailure);
  }

  return (
    <Layout>
      <div className={styles.formBox}>
        <AnoLogo/>
      </div>
      <div className={styles.inbox}>
        <h1>Report a bug</h1>
        <p>
        Safe Alert is a dApp that protects the White Hats' interests by providing them with a secure way to alert protocols of detected bugs and providing them with a way to assess publicly their skills and contributions. 
        </p>
        <p>
        In case where the protocol concerned does not respond to your request, does not correct the bug,
        doesn't deal with you, you will have the possibility of directly publishing a bug report
        to inform users of the risks incurred.
        </p>
        <p>
          Everything is encrypted end-to-end client side and 
          we guarantee you increased security via Privy technology.
        </p>
        
        <button
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          Sign in with Ethereum
          <SignIcon></SignIcon>
        </button>
      </div>
    </Layout>
  );
}

export default SignIn;
