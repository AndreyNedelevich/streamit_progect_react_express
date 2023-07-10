import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejectedWithValue} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {IErrorAuth, IUserFromDB} from '../../interfaces';
import {userService} from "../../services/user.service";
import {toast} from "react-toastify";


interface IState {
    user: IUserFromDB
    error: IErrorAuth
    loading:boolean
}

const initialState: IState = {
    user: null,
    error: null,
    loading:false
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

const getUserByToken = createAsyncThunk<IUserFromDB, void>(
    'userSlice/getUserByToken',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await userService.getUserByToken()
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err)
        }
    }
)

const updateEmailById = createAsyncThunk<IUserFromDB, {userId:string,email:string}>(
    'userSlice/updateEmailById',
    async ({email,userId}, {rejectWithValue}) => {
        try {
            const {data} = await userService.editEmailUserById(userId,email)
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err)
        }
    }
)
const editUser = createAsyncThunk<IUserFromDB, {userId:string,dto:Partial<IUserFromDB>}>(
    'userSlice/editUser',
    async ({userId,dto}, {rejectWithValue}) => {
        try {
            const {data} = await userService.editUserById(userId,dto)
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
        chengeUserStatus: (state, action) => {
            if (state.user !== null) {
                state.user.status=action.payload
            }
        },
        deleteAvatar: (state, action) => {
            if (state?.user.avatar !== null) {
                state.user.avatar=action.payload
            }
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(getUserByToken.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(updateEmailById.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
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
                // @ts-ignore
                toast.error(`${action.payload.message}`, {
                    autoClose: 2000,
                    theme: "light",
                });
                state.loading = false
            })
});

const {actions, reducer: userReducer} = slice;

const userActions = {
    ...actions,
    getUser,
    getUserByToken,
    updateEmailById,
    editUser,
}

export {
    userReducer,
    userActions
}