import Web3 from "web3"
import {NETWORKS} from "../network"
let web3Reader
export const getWeb3Reader = () => web3Reader
export const initWeb3Reader = async () =>{
    const network = NETWORKS.BSC_TESTNET
    web3Reader = new Web3(network.rpcUrl)
}
let web3Sender
export const getWeb3Sender = () => web3Sender
export const setWeb3Sender = (provider) =>{
    if(!provider){
        web3Sender = null
    }else{
        web3Sender = new Web3(provider)
    }
}