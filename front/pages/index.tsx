//Safe Alert - Hackathon ETHCC5
import React, { useEffect, useState } from "react";
import { FieldInstance } from "@privy-io/privy-browser";
import { useSession, SignOutLink } from "../components/Session";
import styles from "../styles/Home.module.css";
import FileIcon from "../components/FileIcon";
import Layout from "../components/Layout";
import Forms from "../components/Forms";
import { ethers } from "ethers";

import abi from "../mint_contract.json";

let my_contract = new ethers.Contract("0xfD24916a52ff24EE5628a89155CD8a27059AAA57",abi);

function HomePage() {
  const session = useSession();
  const [inbox, setInbox] = useState<FieldInstance | null>(null);
  const [inboxUrl, setInboxUrl] = useState<string>("");
  const [uploadedFile, setUpload] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<String>("");
  const [etat, setEtat] = useState<boolean>(false);

  useEffect(() => {
    async function fetchInboxFromPrivy() {
      try {
        const inbox = await session.privy.getFile(session.address, "inbox");
        setInbox(inbox);
      } catch (error) {
        console.log(error);
      }
    }

    fetchInboxFromPrivy();
  }, [session]);

  // Construct the inbox url when the inbox value changes
  useEffect(() => {
    if (!inbox) {
      return;
    }

    const objectUrl = URL.createObjectURL(inbox.blob());
    setInboxUrl(objectUrl);

    // Cleanup url after use
    return () => URL.revokeObjectURL(objectUrl);
  }, [inbox]);

  async function onSend(destinationAddress: string, file: File) {
    try {
      // ****************
      // Privy writes
      // ****************
      await session.privy.putFile(destinationAddress, "inbox", file);
      // ****************
      // end Privy writes
      // ****************
      console.log("Sent");
      //For the minting of the NFT 

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send("eth_requestAccounts",[])
      const signer = provider.getSigner()
      console.log(signer._address,await signer.getAddress())
      
      var temp = await my_contract.connect(signer).mint("gfgf",destinationAddress);

    } catch (e) {
      // @ts-ignore
      setErrorMsg(e.message);
    }
    
  }
  
  return ( 
      
      <Layout backgroundClass={etat ? styles.safe_style : styles.safe}> 
      
      <div className={styles.inbox} id="form_soumission">
        <Forms/>
      </div>
      <div className={styles.inbox} id="soumission">
        <h1>Upload your file and send it to the concerned protocol :</h1>
          {uploadedFile ? (
            <SendForm uploadedFile={uploadedFile} onSend={onSend} />
          ) : (
            <UploadForm address={session.address} setUploadedFile={setUpload} />
          )}
          {errorMsg && <div className={styles.errorMsg}>Error: {errorMsg}</div>}
          <h1>Check your Sismo badge :</h1>
          <a href="https://sandbox.sismo.io/safe-alert" target="_blank">
            <button> Sismo Badge </button>
          </a>
          
        </div>
      <div className={styles.inbox}>
        <div className={styles.flexRow}>
          <h1>Your Inbox </h1>
          <div className={styles.ethAddressWrapper}>
            <p className={styles.ethAddress}>{session.address.slice(0, 7)}</p>
          </div>
          <div className={styles.flexCol}>
            <SignOutLink />
          </div>
        </div>
        {inboxUrl && inbox ? (
          <>
            <div className={styles.inboxcontent}>
              <div>You got message!</div>
              <button
                type="submit"
                onClick={() => window.open(inboxUrl)}
                className={styles.downloadbutton}
              >
                View
              </button>
            </div>
          </>
        ) : (
          <div className={styles.inboxcontent}>
            <div>Your inbox is empty</div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function UploadForm(props: {
  address: string;
  setUploadedFile: (file: File) => void;
}) {
  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files || new FileList();
    const file = fileList[0] || null;
    props.setUploadedFile(file);
  };

  return (
    <button className={styles.uploadbutton}>
      <input type="file" id="file-btn" onChange={onChange} hidden />
      <label htmlFor="file-btn">
        <FileIcon></FileIcon>
        Select report files to send
      </label>
    </button>
  );
}

function SendForm(props: {
  uploadedFile: File;
  onSend: (destination: string, file: File) => void;
}) {
  const [destination, setDestination] = useState<string | null>(null);
  return (
    <div className={styles.sendcontainer}>
      <div className={styles.sendtext}>Your file is ready to share!</div>
      <input
        id="destination"
        type="text"
        autoComplete="off"
        placeholder="Protocol wallet address"
        className={styles.destination}
        onChange={(e) => setDestination(e.target.value)}
      ></input>
      <button
        className={styles.sendbutton}
        onClick={() => {
          props.onSend(destination!, props.uploadedFile);
        }}
      >
        Send
      </button>
    </div>
  );
}

export default HomePage;
