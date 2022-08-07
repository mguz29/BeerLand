import React from 'react'
import { useState } from "react";
import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import { FaEthereum } from 'react-icons/fa'


const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};

export default function Crypto({value, precioTotal, userId, purchaseDetails, email}) {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {

    e.preventDefault();
    const data = new FormData(e.target);
    setError();

    await startPayment({
      setError,
      setTxs,
      ether: value,
      addr: "0xF8fb48A1924756530b2EA2bFAA422f285eFaD202"
    });
  };

  let totalInfo = {
    // data: x?.hash,
    totalPrice: value,
    purchaseDetails: purchaseDetails,
    userId: userId,
    
  }

  return (
    <form onSubmit={handleSubmit} style={{ borderTop: '1px solid gray' }}>
    <div style={{ display: 'flex', justifyContent: 'center' }}>

      <button
        type="submit"
        style={{ textAlign: 'center', alignItems: 'center', padding: ' 14px 2rem', margin: '10px 0', borderRadius: '5px', color: 'white', border: 'none', backgroundColor: '#4c72ad',cursor:'pointer' }}
      >
        Pay With Metamask
        <FaEthereum size={15} style={{ marginLeft: '1px', marginBottom: '-2px' }} />
      </button>
      

    </div>
  </form>
);
}
