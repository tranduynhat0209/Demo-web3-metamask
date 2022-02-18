import { Box, Divider , Button, TextField} from '@material-ui/core'
import {React, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getWeb3Sender } from '../connector/web3'
import { updateAccount } from '../redux/account-slice'
import ERC20ABI from "../contract/BEP20_ABI.json"
import { tokens } from "../contract/tokens";
import BigNumber from 'bignumber.js'
export const TransferBox = () =>{
    const [receiver, setReceiver] = useState('')
    const [amount, setAmount] = useState(0)
    const [status, setStatus] = useState('Success')
    const [TRAVASender, setTRAVASender] = useState('')
    const [TRAVAAmount, setTRAVAAmount] = useState(0)
    const [TRAVAStatus, setTRAVAStatus] = useState('Success')
    const [TRAVAReceiver, setTRAVAReceiver] = useState('')
    const [spender, setSpender] = useState('')
    const [allowance, setAllowance] = useState(0)
    const [approveStatus, setApproveStatus] = useState('')
    const dispatch = useDispatch()
    const accountInfo = useSelector(state => state.account)
    const hdTx = (txPromise, setStatus)=>{
        txPromise.on("transactionHash", (hash)=>{
            console.log(hash)
            setStatus('Pending')
        })
        txPromise.catch(error =>{
            console.error(error)
            setStatus('Fail')
        })
        txPromise.then(txReceipt =>{
            console.log(txReceipt)
            setStatus('Success')
            dispatch(updateAccount())
        })
    }
    const transferBNB = async ()=>{
        const sender = getWeb3Sender()
        const value = sender.utils.toWei(amount, 'ether')
        const txParams = {
            from: accountInfo.address,
            to: receiver,
            value: value
        }
        const txPromise = sender.eth.sendTransaction(txParams)
        hdTx(txPromise, setStatus)
    }
    const transferTRAVA = async () =>{
        console.log(TRAVASender)
        console.log(TRAVAReceiver)
        const sender = getWeb3Sender()
        const value = new BigNumber(TRAVAAmount).multipliedBy(10**tokens.TRAVA.decimal).toFixed()
        const TRAVAContract = new sender.eth.Contract(ERC20ABI, tokens.TRAVA.address)
        const txParams = {
            from: accountInfo.address
        }
        let txPromise
        if(TRAVASender === '')
            txPromise = TRAVAContract.methods.transfer(TRAVAReceiver, value).send(txParams)
        else 
            txPromise = TRAVAContract.methods.transferFrom(TRAVASender ,TRAVAReceiver, value).send(txParams)
        hdTx(txPromise, setTRAVAStatus)
    }
    const approveTRAVA = async () =>{
        const sender = getWeb3Sender()
        const value = new BigNumber(allowance).multipliedBy(10**tokens.TRAVA.decimal).toFixed()
        console.log(value)
        const TRAVAContract = new sender.eth.Contract(ERC20ABI, tokens.TRAVA.address)
        const txParams = {
            from: accountInfo.address,
        }
        const txPromise = TRAVAContract.methods.approve(spender, value).send(txParams)
        hdTx(txPromise, setApproveStatus)
    }
    return accountInfo.status === 'SUCCESS' && (
        <Box sx={{m: 5}}>
            <Divider/>
            <p>
                Transfer BNB:
            </p>
            <div>
                <span>
                    Receiver:
                </span>
                <TextField
                    onChange={
                        (e)=>{
                            setReceiver(e.target.value)
                        }
                    }
                />
            </div>
            <div>
                <span>
                    Amount:
                </span>
                <TextField
                    onChange={
                        (e)=>{
                            setAmount(e.target.value)
                        }
                    }
                />
            </div>
            <Button
                onClick={transferBNB}
            >
                Transfer
            </Button>
            <p>
                Status: {status}
            </p>
            <Divider/>
            <p>
                Transfer TRAVA:
            </p>
            <div>
                <span>
                    Sender:
                </span>
                <TextField
                    onChange={
                        (e)=>{
                            setTRAVASender(e.target.value)
                        }
                    }
                />
            </div>
            <div>
                <span>
                    Receiver:
                </span>
                <TextField
                    onChange={
                        (e)=>{
                            setTRAVAReceiver(e.target.value)
                        }
                    }
                />
            </div>
            <div>
                <span>
                    Amount:
                </span>
                <TextField
                    onChange={
                        (e)=>{
                            setTRAVAAmount(e.target.value)
                        }
                    }
                />
            </div>
            <Button
                onClick={transferTRAVA}
            >
                Transfer
            </Button>
            <p>
                Status: {TRAVAStatus}
            </p>
            
            <Divider/>
            <p>
                Approve TRAVA:
            </p>
            <div>
                <span>
                    Spender:
                </span>
                <TextField
                    onChange={
                        (e)=>{
                            setSpender(e.target.value)
                        }
                    }
                />
            </div>
            <div>
                <span>
                    Allowance:
                </span>
                <TextField
                    onChange={
                        (e)=>{
                            setAllowance(e.target.value)
                        }
                    }
                />
            </div>
            <Button
                onClick={approveTRAVA}
            >
                Approve
            </Button>
            <p>
                Status: {approveStatus}
            </p>
    </Box>
    )
}