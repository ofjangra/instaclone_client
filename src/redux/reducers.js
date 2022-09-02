import { createSlice,  createAsyncThunk} from "@reduxjs/toolkit";


const initialState = {
    username:null,
    userId:null,
    followers:null,
    followings:null,
    phone:null,
    posts:null
}



const getUser = createAsyncThunk(
  'get_user',
  async (username) => {
    const resp = await fetch (`http://localhost:5000/users/${username}`)
    const respJson = await resp.json()
    return respJson
  }
)


const userReducer = createSlice({
    name:"user",
    initialState: initialState,
    extraReducers:{
      [getUser.fulfilled]: (state, action) =>{

        console.log(action.payload)
        state.username = action.payload.userDetails.username
        state.userId = action.payload.userDetails._id
        state.phone = action.payload.userDetails.phone
        state.posts = action.payload.posts
      }
    }
})

export {getUser, userReducer}
