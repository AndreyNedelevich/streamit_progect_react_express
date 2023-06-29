import { createSlice} from '@reduxjs/toolkit'
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




const slice = createSlice({
    name: 'modalSlice',
    initialState,
    reducers: {
        shownModal: (state, action) => {
            state.showModal = action.payload
        },
    },
})

const {actions, reducer: modalReducer} = slice


const modalActions = {
    ...actions,
}

export {
    modalActions,
    modalReducer
}