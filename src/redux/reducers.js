import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'


const initialState = {
    token:null,
    loading:false,
    error:null,
    message:null
}


const signinUser = createAsyncThunk(
    'user_signin',

    async (body) =>{
        const resp = await fetch("http://localhost:5000/signin", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        })
        const respJson = await resp.json()
        return respJson
    }
)

const userReducer = createSlice({
    name:"auth_user",
    initialState: initialState,
    reducers:{},
    extraReducers:{
        [signinUser.pending]: (state) =>{
            state.loading = true
        },
        [signinUser.fulfilled]: (state, action) =>{
            console.log("fulfilled")
            console.log(action.payload.token)
            state.token = action.payload.token
            state.message = action.payload.message
            localStorage.setItem("jwt", action.payload.token)
            

        },
        [signinUser.rejected]:(state, action) =>{
            console.log("rejected")
            state.loading = false
            state.error = action.payload.error

        }
    }
})


export {signinUser, userReducer}