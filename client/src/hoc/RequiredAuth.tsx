import {FC, ReactElement} from 'react';
import {Navigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from "../hooks";
import {modalActions} from "../redux";
import {EActionTokenModal} from "../enums";


interface IProps {
    children: ReactElement
}

const RequiredAuth: FC<IProps> = ({children}) => {

const {user} = useAppSelector((state) => state.userReducer)
const dispatch=useAppDispatch()

    if (!user) {
        dispatch(modalActions.shownModal(EActionTokenModal.LOGIN))
        return <Navigate to={'/home'}/>
    }

    return children
};

export {RequiredAuth};