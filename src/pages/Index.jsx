import React, { useState } from "react";
import { FaWallet, FaFaucet } from "react-icons/fa";

const Index = () => {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [message, setMessage] = useState("");

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
        setWeb3(web3Instance);
        setMessage("Wallet connected successfully!");
      } catch (error) {
        setMessage("Failed to connect wallet.");
      }
    } else {
      setMessage("Please install MetaMask!");
    }
  };

  const requestTokens = async () => {
    if (web3 && account) {
      try {
        // Replace with your faucet contract address and ABI
        const faucetAddress = "YOUR_FAUCET_CONTRACT_ADDRESS";
        const faucetABI = [
          // Your faucet contract ABI here
        ];
        const faucetContract = new web3.eth.Contract(faucetABI, faucetAddress);
        await faucetContract.methods.requestTokens().send({ from: account });
        setMessage("Tokens requested successfully!");
      } catch (error) {
        setMessage("Failed to request tokens.");
      }
    } else {
      setMessage("Please connect your wallet first.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Shiba Inu Crypto Faucet</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center">
          <button onClick={connectWallet} className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center mb-4">
            <FaWallet className="mr-2" /> Connect Wallet
          </button>
          <button onClick={requestTokens} className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center">
            <FaFaucet className="mr-2" /> Request Shiba Inu Tokens
          </button>
          {account && <p className="mt-4 text-gray-700">Connected account: {account}</p>}
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Index;
