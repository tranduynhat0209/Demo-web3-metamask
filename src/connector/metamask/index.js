
import { setWeb3Sender } from "../web3"
import Web3 from "web3"
export const connectMetamask = async ()=>{
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
    setWeb3Sender(Web3.givenProvider);
    return accounts[0]
}