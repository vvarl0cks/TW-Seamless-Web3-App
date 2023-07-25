import { CheckoutWithCard } from "@paperxyz/react-client-sdk";

type CheckoutWithCardProps = {
    address: string;
    email: string;
    tokenId: string;
};

export const CheckoutWithCC = (props: CheckoutWithCardProps) => {
    const email = props.email;
    const address = props.address;
    const tokenId = props.tokenId;
    console.log(email);
    console.log(address);
    console.log(tokenId);

    return (
        <div>
            <CheckoutWithCard
                configs={{
                contractId: "ab0ac44f-402d-44ec-ad85-cec3719db9f1",
                walletAddress: address,
                contractArgs: {
                    "tokenId": tokenId
                },
                email: email,
                }}
                onPaymentSuccess={(alert) => console.log("Payment success!")}
                onReview={(result) => console.log(result)}
                onError={(error) => console.error(error)}
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
    )
};