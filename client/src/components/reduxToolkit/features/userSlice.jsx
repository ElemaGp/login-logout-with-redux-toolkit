//This userSlice shows how to use rtk for  managing state if async operations are involved eg that have to do with APIs.

import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

//initial state section below
const initialState = {
  loading: false,
  websiteuser: '',
  error: ''
}


//actions and doing the async/api call section below
// createAsyncThunk automatically generates pending, fulfilled and rejected action types aka "start, success, failure"
export const login = createAsyncThunk('user/login', () => { // "user/login" is the "action". You derive it by mixing the name of the slice (check the slice below which is named "user") and the name of the action-creator function which is "login" here. Thereby giving you "user/login"
  return axios
    .post('/auth/login')
    .then(response => response.data)
})

//you dont need a "try, catch" block for redux. Redux will automatically catch the error. The function returns the response to you, whether it is the user object or an error object.
//for login, "const fetchUsers" will be equivalent to "const login".
//So basically, when the login action creator function is dispatched from the desired component, it dispatched this "user/login" action. Then while that action is being dispached, when it is pending/start, the reducer values of the loading, user and error states take their values. When it is fulfulfiled/success, the reducer values of the loading, user and error states take their values. If there's a failure/rejected, the the reducer values of the loading, user and error states take their values.



//reducer section below
const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder.addCase(login.pending, state => {  //this means that if the case of the action-type is fetchUser.pending (ie fetchUsers_start), "state.loading" becomes true
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
  }
})

export default userSlice.reducer