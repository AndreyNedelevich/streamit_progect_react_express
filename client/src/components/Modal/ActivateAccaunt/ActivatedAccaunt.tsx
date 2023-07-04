import React from 'react';
import CloseIcon from "@mui/icons-material/Close";


import {useAppDispatch, useAppSelector} from "../../../hooks";
import {modalActions} from "../../../redux";
import {EActionTokenModal} from "../../../enums";
import './ActivatedAccaunt.css'

const ActivatedAccaunt = () => {

    const {user} = useAppSelector(state => state.userReducer)
    console.log(user);

    const dispatch = useAppDispatch();


    return (
        <div className='backdrop_activate'>
            <div className='wrapper_activate'>
                <h2 className='activate_title'>Activate account</h2>
                <CloseIcon onClick={() => dispatch(modalActions.shownModal(EActionTokenModal.NONE))}/>
                {user?.status === "inactive" ?
                    <i className='message_activate'>{`The letter will be sent to your email (${user.email}). Follow the link to verify your account!`}</i>
                    : <i className='message_activate'>{`Your account is activated!`}</i>}

                {user?.status === "inactive" &&
                    <button style={{width: '100%', height: '3rem', margin: '7px 0'}} className='button_activate'>SEND
                    </button>}
            </div>
        </div>
    );
};

export {ActivatedAccaunt};