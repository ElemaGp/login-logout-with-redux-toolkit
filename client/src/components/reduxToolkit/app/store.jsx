import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer  //the name of the reducer in the userSlice.js is "user" so i used that here as the key (key/value pair), and then i imported the reducer function from the userSlice.js as "UserReducer" and used that here too as the value. (key/value pair).
  }
})

export default store
