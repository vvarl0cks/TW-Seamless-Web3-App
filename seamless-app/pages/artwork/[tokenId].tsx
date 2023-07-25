import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';
import { ThirdwebNftMedia, useAddress, useContract, useNFT, usePaperWalletUserEmail } from '@thirdweb-dev/react';
import { CheckoutWithCard } from '@paperxyz/react-client-sdk';
import { useState } from 'react';

export default function Artwork() {
    const router = useRouter();
    const { tokenId } = router.query;
    console.log(tokenId);

    const address = useAddress();
    const email = usePaperWalletUserEmail();

    const {
        contract
    } = useContract('0xd150801A93E44fA286b707935fCE78067415a519', 'edition-drop');
    const {
        data: nft,
        isLoading: loadingNft,
    } = useNFT(contract, tokenId as string);

    const [paymentSuccesful, setPaymentSuccesful] = useState(false);

    const handlePaymentSuccess = () => {
        setPaymentSuccesful(true);
    }

    return (
        <div className={styles.container}>
            {!loadingNft && nft ? (
                <div className={styles.artContainer}>
                    <div className={styles.artImage}>
                        <ThirdwebNftMedia
                            metadata={nft.metadata}
                            height='100%'
                            width='100%'
                        />
                    </div>
                    <div className={styles.artInfo}>
                            <div>
                                <h1>{nft.metadata.name}</h1>
                                {address && email && tokenId ? (
                                    !paymentSuccesful ? (
                                        <div>
                                            <CheckoutWithCard
                                                configs={{
                                                contractId: "ab0ac44f-402d-44ec-ad85-cec3719db9f1",
                                                walletAddress: address,
                                                contractArgs: {
                                                    "tokenId": tokenId
                                                },
                                                email: email.data,
                                                }}
                                                onPaymentSuccess={handlePaymentSuccess}
                                                onReview={(result) => console.log(result)}
                                                options={{
                                                    colorBackground: '#ffffff',
                                                    colorPrimary: '#99e0ff',
                                                    colorText: '#363636',
                                                    borderRadius: 6,
                                                    inputBackgroundColor: '#ffffff',
                                                    inputBorderColor: '#b0b0b0',
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div>
                                            <p>Payment succesful!</p>
                                            <button
                                                onClick={() => router.push(`/profile/${address}`)}
                                            >View collectibles</button>
                                        </div>
                                    )
                                    
                                ) : (
                                    <p>Login to buy this artwork</p>
                                )}
                            </div>
                    </div>
                    
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
};