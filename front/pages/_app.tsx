//Safe Alert - Hackathon ETHCC5
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { useSession } from "../components/Session";

declare global {
  interface Window {
    ethereum: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const session = useSession();
  const [initialized, setInitialized] = useState(false);

  // Pages that don't require authentication must explicitly define
  // a static prop called `protected` set to `false`.
  const pageRequiresSignedInUser = pageProps.protected !== false;

  useEffect(() => {
    function onSuccess() {
      setInitialized(true);
    }

    function onFailure(error: Error) {
      console.log(error);
      setInitialized(true);
    }

    session.initialize().then(onSuccess, onFailure);
  }, [session]);

  if (!initialized) {
    return null;
  }

  if (!session.authenticated && pageRequiresSignedInUser) {
    router.push("/sign-in");
    return null;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
