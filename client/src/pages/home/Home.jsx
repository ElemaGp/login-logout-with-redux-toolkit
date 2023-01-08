import style from "./home.module.scss"
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from "../../components/reduxToolkit/features/userSlice"
import { Button } from "@mui/material"
import { Box } from "@mui/system"


const Home = () => {

  //Redux-toolkit part (the dispatch of the "logout" action creator is done in the "handleClick" function below)
  const user = useSelector(state => state.user) // "const user" is declared to be equal to the "user" in userSlice.jsx. Meaning it now contains the initial state object properties that the "user" has in useSlice.jsx, and the properties' values will be updates accordingly when the actions are dispatched. Btw, "const user = useSelector(state => state.user)" gives us the state of the entire "user" object in the user slice. If for instance, i just wanted to get the state of the the loading, then i would have done "const user = useSelector(state => state.user.loading)". "user" is what i named my userSlice in userSlice.jsx so it is the name of the user object. Any of the properties (in the "initial state" section) can now be accessed through it eg "state.user.loading", "state.user.websiteuser", "state.user.error". NOTE THAT IN THIS PAGE, I DON'T REAlly NEED TO BRING IN THIS USER (BUT I DID :) )
  const dispatch = useDispatch()

  const handleClick = () =>{
    dispatch(logout()); //logs out the user
    dispatch(reset());  //resets the state of "loading" and "error" to null after the websiteuser logs out
  }

  return (
    <div>
      This is the homepage
      <Box my={4}>
        <Button variant="contained" color="primary" size="small" onClick={handleClick}>LOGOUT</Button>
      </Box>

      <button onClick={handleClick}>LOGOUT</button>
    </div>
  )
}

export default Home
