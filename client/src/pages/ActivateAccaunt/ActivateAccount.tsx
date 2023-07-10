import React from 'react';
import {useAppDispatch, useAppSelector, useFetching} from "../../hooks";

import { userActions} from "../../redux";
import { EUserStatus} from "../../enums";
import './ActivateAccount.css'
import {authService} from "../../services";
import {DarkHeader} from "../../components/Header/DarkHeader";
import {LinearLoader} from "../../components/UI/Loader/LinearLoader";

const ActivateAccount = () => {

    const {user} = useAppSelector(state => state.userReducer)


    const dispatch = useAppDispatch();

    const [fetching, isLoading, error]=useFetching(
        async  () =>{
            await authService.sendActivationEmail(user.email)
            if(!error){
                dispatch(userActions.chengeUserStatus(EUserStatus.Sent))
            }
        }
    )


    return (
        <>
            <DarkHeader/>
            {isLoading && <LinearLoader/>}
            <div className='wrapper_activate'>
                <h2 className='activate_title'>Activate account</h2>
                {user?.status === EUserStatus.Inactive ?
                    <i className='message_activate'>{`The letter will send to your email (${user.email}). Follow the link to activate your account!`}</i> :
                    user?.status === EUserStatus.Sent ?
                        <i className='message_activate'>{`Letter has already sent to activate your account! Follow the link to activate your account!`}</i> :
                        <i className='message_activate'>{`Your account is activated!`}</i>}

                {user?.status === EUserStatus.Inactive &&
                    <button type='submit' onClick={() => {
                        fetching(user,true)
                    }} style={{width: '30%', height: '2.5rem', margin: '5px 0.2rem'}} className='button_activate'>SEND
                    </button>}
            </div>
        </>
    );
};

export {ActivateAccount};