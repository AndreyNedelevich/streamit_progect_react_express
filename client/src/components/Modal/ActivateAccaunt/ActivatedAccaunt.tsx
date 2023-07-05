import React from 'react';
import CloseIcon from "@mui/icons-material/Close";


import {useAppDispatch, useAppSelector} from "../../../hooks";
import {modalActions, userActions} from "../../../redux";
import {EActionTokenModal, EUserStatus} from "../../../enums";
import './ActivatedAccaunt.css'
import {toast} from "react-toastify";
import {authService} from "../../../services";
import {AxiosError} from "axios";
import {IUserFromDB} from "../../../interfaces";

const ActivatedAccaunt = () => {

    const {user} = useAppSelector(state => state.userReducer)
    console.log(user);

    const dispatch = useAppDispatch();

    const ActivateFunction = async (user: IUserFromDB): Promise<void> => {
        try {
            await authService.sendActivationEmail(user.email)
            dispatch(userActions.chengeUserStatus(EUserStatus.Sent))
        } catch (e) {
            const err = e as AxiosError
            toast.error(`${err.message}!`, {
                autoClose: 2000,
                theme: "light",
            });
        } finally {
            dispatch(modalActions.shownModal(EActionTokenModal.NONE))
        }
    }


    // @ts-ignore
    return (
        <div className='backdrop_activate'>
            <div className='wrapper_activate'>
                <h2 className='activate_title'>Activate account</h2>
                <CloseIcon onClick={() => dispatch(modalActions.shownModal(EActionTokenModal.NONE))}/>
                {user?.status === EUserStatus.Inactive ?
                    <i className='message_activate'>{`The letter will be sent to your email (${user.email}). Follow the link to verify your account!`}</i> :
                    user?.status === EUserStatus.Sent ?
                        <i className='message_activate'>{`An email has already been sent to activate your account!`}</i> :
                        <i className='message_activate'>{`Your account is activated!`}</i>}

                {user?.status === EUserStatus.Inactive &&
                    <button type='submit' onClick={() => {
                        ActivateFunction(user)
                    }} style={{width: '100%', height: '2.5rem', margin: '5px 0'}} className='button_activate'>SEND
                    </button>}
            </div>
        </div>
    );
};

export {ActivatedAccaunt};