import { ThirdwebNftMedia, useContract, useNFTs } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";

const Home: NextPage = () => {
  const {
    contract
  } = useContract('0xd150801A93E44fA286b707935fCE78067415a519', 'edition-drop');
  const {
    data: nfts,
    isLoading: loadingNfts,
  } = useNFTs(contract);

  return (
    <div className={styles.container}>
        <div className={styles.heroBanner}>
          <div>
            <h1>WAVEFORM NFT ARTWORK</h1>
            <p>Buy and Sell Digital Waveform Artwork</p>
          </div>
          <div></div>
        </div>
        {!loadingNfts && nfts && (
          <div className={styles.grid}>
            {nfts.map((nft) => (
              <Link href={`/artwork/${nft.metadata.id}`} key={nft.metadata.id}>
                <div className={styles.artCard}>
                  <ThirdwebNftMedia
                    metadata={nft.metadata}
                  />
                  <div className={styles.cardContent}>
                    <h3>{nft.metadata.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
    </div>
  );
};

export default Home;