import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authServices from '../auth/authServices';


//get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isSuccess: false,
  isLoading: false,
  isError: null,
  message: '',
};

//Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authServices.register(user);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authServices.login(user);
  } catch (err) {
    const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const logout = createAsyncThunk('auth/logout', async (user, thunkAPI) => {
  await authServices.logout();
  return thunkAPI.rejectWithValue(user);
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = null
      state.message = ''
    }

    },
    extraReducers: (builder) => {
      builder
        .addCase(register.pending, (state,) => {
          state.isLoading = true;
          state.isSuccess = false;
          state.isError = null;
          state.message = '';
        })
        .addCase(register.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = null;
          state.user = action.payload;
          state.message = 'User registered successfully';
        })
        .addCase(register.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.message = action.payload;
          state.user = null;
        })
        .addCase(logout.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = false;
          state.message = 'User logged out successfully';
          state.user = null;
        })
        .addCase(login.pending, (state,) => {
          state.isLoading = true;
          state.isSuccess = false;
          state.isError = null;
          state.message = '';
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.isError = null;
          state.user = action.payload;
          state.message = 'User logged in successfully';
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.message = action.payload;
          state.user = null;
        })
    }
  
});





export const {
  
} = authSlice.actions;

export const { reset } = authSlice.actions;
export default authSlice.reducer;