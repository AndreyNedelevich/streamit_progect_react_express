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
          const response= await authService.sendActivationEmail(user.email)
            console.log(response);
            dispatch(userActions.chengeUserStatus(EUserStatus.Sent))
        }
    )


    return (
        <>
            <DarkHeader/>
            {isLoading && <LinearLoader/>}
            <div className='wrapper_activate'>
                <h2 className='activate_title'>Activate account</h2>
                {user?.status === EUserStatus.Inactive ?
                    <i className='message_activate'>{`The letter will be sent to your email (${user.email}). Follow the link to verify your account!`}</i> :
                    user?.status === EUserStatus.Sent ?
                        <i className='message_activate'>{`An email has already been sent to activate your account!`}</i> :
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