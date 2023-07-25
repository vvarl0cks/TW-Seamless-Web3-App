import { ThirdwebNftMedia, useAddress, useContract, useDisconnect, useOwnedNFTs } from '@thirdweb-dev/react';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';

export default function Profile() {
    const router = useRouter();
    const address = useAddress();
    const disconnect = useDisconnect();

    const {
        contract
    } = useContract('0xd150801A93E44fA286b707935fCE78067415a519', 'edition-drop');

    const {
        data: ownedNfts,
        isLoading: loadingOwnedNfts,
    } = useOwnedNFTs(contract, address);

    const signout = () => {
        disconnect();
        router.push('/');
    };

    return (
        <div className={styles.container}>
            <h1>Profile</h1>
            <button
                onClick={signout}
            >Sign Out</button>
            <h3>Your collectibles:</h3>
            {!loadingOwnedNfts && ownedNfts ? (
                ownedNfts.length > 0 ? (
                    <div className={styles.grid}>
                        {ownedNfts.map((nft) => (
                            <div className={styles.artCard} key={nft.metadata.id}>
                                <ThirdwebNftMedia
                                    metadata={nft.metadata}
                                />
                                <div className={styles.cardContent}>
                                    <h3>{nft.metadata.name}</h3>
                                    <p>QTY: {nft.quantityOwned}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // eslint-disable-next-line react/no-unescaped-entities
                    <p>You don't own any collectibles yet</p>
                )
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}