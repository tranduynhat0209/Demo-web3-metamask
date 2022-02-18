import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { connectMetamask } from "../connector/metamask";
import { getWeb3Reader, 
    initWeb3Reader 
} from "../connector/web3";
import BigNumber from "bignumber.js";
import ERC20ABI from "../contract/BEP20_ABI.json"
import { tokens } from "../contract/tokens";
export const updateAccount = createAsyncThunk('account/updateAccount', async ()=>{
    const address = await connectMetamask()
    console.log(address)
    await initWeb3Reader()
    const reader = getWeb3Reader()
    let BNBBalance = await reader.eth.getBalance(address)
    BNBBalance = new BigNumber(BNBBalance).dividedBy(10**18).toString()
    const TRAVAContract = new reader.eth.Contract(ERC20ABI, tokens.TRAVA.address)
    let TRVBalance = await TRAVAContract.methods.balanceOf(address).call()
    TRVBalance = new BigNumber(TRVBalance).dividedBy(10**tokens.TRAVA.decimal).toString()
    const DAIContract = new reader.eth.Contract(ERC20ABI, tokens.DAI.address)
    let DAIBalance = await DAIContract.methods.balanceOf(address).call()
    DAIBalance = new BigNumber(DAIBalance).dividedBy(10**tokens.DAI.decimal).toString()
    return{
        address: address,
        BNBBalance: BNBBalance,
        TRVBalance: TRVBalance,
        DAIBalance: DAIBalance
    }
})

export const accountSlice = createSlice({
    name: 'account',
    initialState:{
        address: '',
        BNBBalance: '',
        TRVBalance: '',
        DAIBalance: '',
        status: 'NONE'
        // NONE, LOADING, SUCCESS, FAIL
    },
    reducers:{
    },
    extraReducers(builder){
        builder
        .addCase(updateAccount.pending, (state, action)=>{
            state.status = 'LOADING'            
        })
        .addCase(updateAccount.fulfilled, (state, action)=>{
            state.status = 'SUCCESS'
            state.address = action.payload.address
            state.BNBBalance = action.payload.BNBBalance
            state.TRVBalance = action.payload.TRVBalance
            state.DAIBalance = action.payload.DAIBalance
            console.log(action.payload)
        })
        .addCase(updateAccount.rejected, (state, action)=>{
            state.status = 'FAIL'
        })
    }
})
export default accountSlice.reducer;