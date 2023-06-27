import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue, isPending} from '@reduxjs/toolkit';
import { IUser} from "../../interfaces";
import {authService} from "../../services";
import {EActionTokenModal} from "../../enums";


interface IState {
    showModal:EActionTokenModal
    errorAuth: string,
    isloading: boolean,
}


const initialState: IState = {
    showModal: EActionTokenModal.NONE,
    errorAuth: '',
    isloading: false,
}


// const getAuthUser = createAsyncThunk<IUser, IUser>(
//     'authSlice/getAuthUser',
//     async ({username, password}, {rejectWithValue}) => {
//         try {
//             const {data} = await authService.getUseers()
//             const mockUser = data.find(user => user.username === username && user.password === password);
//             if (mockUser) {
//                 localStorage.setItem('auth', 'true');
//                 localStorage.setItem('username', mockUser.username);
//                 localStorage.setItem('password', mockUser.password);
//                 return mockUser
//             }
//         } catch (e) {
//             // const err = e as AxiosError
//             return rejectWithValue('Incorrect username or password')
//         }
//     }
// )


const slice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        shownModal: (state, action) => {
            state.showModal = action.payload
        },
   
        // logout: (state, action) => {
        //     localStorage.removeItem('auth')
        //     localStorage.removeItem('username')
        //     localStorage.removeItem('password')
        //     // state.user = {} as IUser;
        //     state.isAuth = action.payload
        // },
    },


//     extraReducers: builder =>
//         builder
//             .addCase(getAuthUser.fulfilled, (state, action) => {
//                 if (localStorage.getItem('auth') && localStorage.getItem('username')) {
//                     state.user = action.payload;
//                     state.isAuth = true
//                     state.errorAuth=''
//                 } else {
//                     state.errorAuth = 'Incorrect username or password'
//                 }
//                 state.showModal = false
//             })
//             .addMatcher(isPending(), (state) => {
//                 state.isloading = true
//             })
//             .addMatcher(isFulfilled(), state => {
//                 state.isloading = false
//             })
//             .addMatcher(isRejectedWithValue(), (state, action) => {
//                 state.errorAuth = action.payload as string
//                 state.isloading = false
//             })
})

const {actions, reducer: modalReducer} = slice


const modalActions = {
    ...actions,
}

export {
    modalActions,
    modalReducer
}