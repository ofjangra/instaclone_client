import {configureStore} from "@reduxjs/toolkit"

import { userReducer } from "./reducers"

const store = configureStore({
    reducer: userReducer.reducer
})

export default store