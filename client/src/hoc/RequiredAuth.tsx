import {FC, ReactElement} from 'react';
import {Navigate} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from "../hooks";
import {modalActions} from "../redux";
import {EActionTokenModal} from "../enums";
import {userService} from "../services/user.service";
import {authService} from "../services";


interface IProps {
    children: ReactElement
}

const RequiredAuth: FC<IProps> = ({children}) => {

const {user} = useAppSelector((state) => state.userReducer)
const dispatch=useAppDispatch()

const accessToken= authService.getAccessToken()

    if (!user&&!accessToken) {
        <Navigate to={'/home'}/>
        dispatch(modalActions.shownModal(EActionTokenModal.LOGIN))
    }

    return children
};

export {RequiredAuth};