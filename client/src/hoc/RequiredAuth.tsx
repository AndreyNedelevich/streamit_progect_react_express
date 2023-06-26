import {FC, ReactElement} from 'react';
import {Navigate} from 'react-router-dom';

import {useAppDispatch} from "../hooks";
import {authActions} from "../redux";


interface IProps {
    children: ReactElement
}

const RequiredAuth: FC<IProps> = ({children}) => {

   const auth= localStorage.getItem('auth')&&localStorage.getItem('username')
const dispatch=useAppDispatch()

    if (!auth) {
        dispatch(authActions.shownModalLogIn(true))
        return <Navigate to={'/home'}/>
    }

    return children
};

export {RequiredAuth};