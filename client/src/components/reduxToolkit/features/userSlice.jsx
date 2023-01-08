//This userSlice shows how to use rtk for  managing state if async operations are involved eg that have to do with APIs.

import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const websiteuser = JSON.parse(localStorage.getItem('websiteuser')) //if there's a "websiteuser" saved in localstorage, the initial state below will use it as the value of the "user.websiteuser". Else it will be null. 

//initial state section below
const initialState = {
  loading: false,
  websiteuser: websiteuser ? websiteuser : null,    //if there's a "websiteuser" saved in localstorage as i declared above, the initial state for this "user.websiteuser" will use it as the value. Else it will be null. 
  error: ''
}


//actions and doing the async/api call section below
//"login" is the action-creator.
//"user/login" is the action.
//"login.pending", "login.fulfilled", "login.rejected" are the action-types.
// createAsyncThunk automatically generates pending, fulfilled and rejected action types aka "start, success, failure" for any async action.
export const login = createAsyncThunk('user/login', async (user) => { // "user/login" is the "action". You derive it by mixing the name of the slice (check the slice below which is named "user") and the name of the action-creator function which is "login" here. Thereby giving you "user/login"
   const response = await axios.post('/auth/login', user)
    
   if (response.data) {
    localStorage.setItem('websiteuser', JSON.stringify(response.data)) //persisting/storing the fetched user data in localstorage
   }

   return response.data
})

//you dont need a "try, catch" block for redux. Redux will automatically catch the error. The function returns the response to you, whether it is the user object or an error object.
//for login, "const fetchUsers" will be equivalent to "const login" (I've replaced 'fetchUsers with 'login here so don't worry about it).
//So basically, when the login action creator function is dispatched from the desired component, it dispatched this "user/login" action. Then while that action is being dispached, when it is pending/start, the reducer values of the loading, user and error states take their values. When it is fulfulfiled/success, the reducer values of the loading, user and error states take their values. If there's a failure/rejected, the the reducer values of the loading, user and error states take their values.



//for logout
//for logout, the only action-type needed in the reducer will be "logout.fulfilled" where i'll set the "websiteuser" state back to null, after the code below removes the "websiteuser" object from localstorage.
//"logout" is the action-creator.
//"user/logout" is the action.
//"logout.fulfilled" is the action-type. 
//the "reset" action-creator can be dispatched whenever you want to reset the state of "loading" and "error" to false eg. once a user logs out.
export const logout = createAsyncThunk('user/logout', () => { // "user/logout" is the "action". You derive it by mixing the name of the slice (check the slice below which is named "user") and the name of the action-creator function which is "logout" here. Thereby giving you "user/logout"
  localStorage.removeItem('websiteuser') //removing the fetched user data from the localstorage
})


//reducer section below
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {   //"reducers" in createSlice is used for managing the state of non-async actions.I'm not using it for now but the youtube tutorial from "Travest Media" Learn MERN STack -Frontend Authentication Redux Toolkit in (34:20), said the reducers can be used here to reset the state of any property and he used it. So if i ever run into such issue, i'll check it out.
    reset: (state) => {   //I've finally discovered the use of this "reset" reducer. Now since "logout" is a non-async action-creator which just removes the "websiteuser" object from localstorage and dispatches only the logout.fulfilled action-type, to ensure that the "loading" and "error" properties are set back to being empty/their initial states when the websiteuser logs out (is null), it is advisable to also dispatch this reset action/action-creator so that "loading" and 'error' go back to being null too.
      state.loading = false
      state.error = ''
    }
  },
  extraReducers: builder => { //"extraReducers" in createSlice is used for managing the state of async actions.
    builder.addCase(login.pending, state => {  //this line means that if the case of the action-type is fetchUser.pending (ie fetchUsers_start), "state.loading" becomes true
      state.loading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false
      state.websiteuser = action.payload
      state.error = ''
    })
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false
      state.websiteuser = ''
      state.error = action.error.message
    })
    builder.addCase(logout.fulfilled, (state) => {    //for logout, the only action-type needed in the reducer is this "logout.fulfilled" where i'll set the "websiteuser" state back to null.
      state.websiteuser = null
    })
  }
})



  

export const {reset} = userSlice.actions
export default userSlice.reducer