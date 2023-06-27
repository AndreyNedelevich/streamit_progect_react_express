import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {IErrorAuth, IRegistr, IUser} from '../../interfaces';
import {authService} from '../../services';



interface IState {
    loading:boolean
    error: IErrorAuth;
}

const initialState: IState = {
    error: null,
    loading: false,
}


const register = createAsyncThunk<any, IRegistr>(
    'authSlice/register',
    async (user, {rejectWithValue}) => {
        try {
            await authService.register(user)
        } catch (e) {
            const err = e as AxiosError
            console.log(err);
            return rejectWithValue(err)
        }
    }
)


const login = createAsyncThunk<void,IUser>(
    'authSlice/login',
    async (user, {rejectWithValue}) => {
        try {
             await authService.login(user);
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err)
        }
    }
)


const slice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addMatcher(isPending(), (state) => {
                state.loading = true
                state.error = null
            })
            .addMatcher(isFulfilled(), state => {
                state.loading = false
                state.error = null
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.error = action.payload as IErrorAuth
                state.loading = false
            })
});

const {actions, reducer: authReducer} = slice;

const authActions = {
    ...actions,
    register,
    login,
}

export {
    authReducer,
    authActions
}