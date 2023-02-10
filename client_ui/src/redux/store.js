import { configureStore } from '@reduxjs/toolkit'
import SigninSlice from '../pages/SigninPage/SigninSlice'
const store = configureStore({
    reducer: {
        signin: SigninSlice.reducer
        // Declare reducer in app
    }
})

export default store