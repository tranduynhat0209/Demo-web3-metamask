import {Box, Button} from "@material-ui/core"
import {updateAccount} from "./redux/account-slice"
import {useDispatch, useSelector} from "react-redux"
import { UserBalances } from "./components/userBalances"
import { TransferBox } from "./components/transferBNB"
function App() {
  const dispatch = useDispatch()
  const status = useSelector(state=>state.account.status)
  return (
    <Box>
      {
        status==='SUCCESS'?
        <Box sx={{
          m: 5
        }}>
          <UserBalances/>
          <TransferBox/>
        </Box>
        :
        <Button
          onClick={() =>{
          dispatch(updateAccount())
        }}
      >
        Get Account
      </Button>
      }
      
    </Box>
  );
}

export default App;
