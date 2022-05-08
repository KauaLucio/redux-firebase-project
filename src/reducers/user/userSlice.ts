import { createSlice } from '@reduxjs/toolkit'

interface UserData {
  user: {
    id: string,
    name: string,
    url_photo: string | null,
  } | null
}

const initialState: UserData = {
  user: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    }
  }
})

export const { setUser } = usersSlice.actions 

// export const selectUser = (state: { user: { user: UserData } }) => state.user.user;

export default usersSlice.reducer