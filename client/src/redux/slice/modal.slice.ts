import { createSlice} from '@reduxjs/toolkit'
import {EActionTokenModal} from "../../enums";


interface IState {
    showModal:EActionTokenModal
}


const initialState: IState = {
    showModal: EActionTokenModal.NONE,
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