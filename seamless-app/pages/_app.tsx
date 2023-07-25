import type { AppProps } from "next/app";
import { ThirdwebProvider, paperWallet } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { Sepolia } from "@thirdweb-dev/chains";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "Sepolia";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider 
      activeChain={Sepolia}
      supportedWallets={[
        paperWallet({
          clientId: "5b321e26-c6ea-4cb2-ae72-7c1fb966740e"
        })
      ]}  
    >
      <Navbar />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;