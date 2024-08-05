"use client";
import AccountInfo from "./AccountInfo";
import { useContractProvider } from "./ContractProvider";

const ConnectButton = () => {
  const { connectToSubWallet, isConnected } = useContractProvider();

  if (!isConnected) {
    return (
      <button
        onClick={connectToSubWallet}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Connect Wallet
      </button>
    );
  }

  return <AccountInfo />;
};

export default ConnectButton;
