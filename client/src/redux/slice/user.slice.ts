import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {IErrorAuth, IErrorMovie, IRegistr, IUser, IUserFromDB} from '../../interfaces';
import {userService} from "../../services/user.service";


interface IState {
    user: IUserFromDB;
    //isAuth: boolean;
    error: IErrorAuth
}

const initialState: IState = {
    user: null,
    //isAuth: false,
    error: null
}

const getUser = createAsyncThunk<IUserFromDB, string>(
    'userSlice/getUser',
    async (id, {rejectWithValue}) => {
        try {
            const {data} = await userService.getUserById(id)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err)
        }
    }
)

const slice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        signOut: (state, action) => {
            if (action.payload === null) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
            }
            state.user = action.payload
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addMatcher(isPending(), (state) => {
                state.error = null
            })
            .addMatcher(isFulfilled(), state => {
                state.error = null
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
                state.error = action.payload as IErrorAuth
            })
});

const {actions, reducer: userReducer} = slice;

const userActions = {
    ...actions,
    getUser

}

export {
    userReducer,
    userActions
}