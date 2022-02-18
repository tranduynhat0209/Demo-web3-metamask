import { Box, Divider , Button} from '@material-ui/core'
import {React} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { updateAccount } from '../redux/account-slice'
export const UserBalances = () =>{
    const dispatch = useDispatch()
    const accountInfo = useSelector(state => state.account)
    return accountInfo.status === 'SUCCESS' && (
        <Box>
            <p>
                Address: {accountInfo.address}
            </p>
            <Divider/>
            <p>
                BNBBalance: {accountInfo.BNBBalance}
            </p>
            <Divider/>
            <p>
                TRAVABalance: {accountInfo.TRVBalance}
            </p>
            <Divider/>
            <p>
                DAIBalance: {accountInfo.DAIBalance}
            </p>
            <Divider/>
            <Button
          onClick={() =>{
          dispatch(updateAccount())
        }}
      >
        Switch Account
      </Button>
        </Box>
    )
}