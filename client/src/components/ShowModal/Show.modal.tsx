import React from 'react';

import {EActionTokenModal} from "../../enums";
import { useAppSelector} from "../../hooks";
import {RegistrationForm} from "../Modal";
import {LoginForm} from "../Modal";
import {ForgotForm} from "../Modal";



const ShowModal = () => {

    const {showModal} = useAppSelector((state) => state.modalReducer)

    return (
        <>
            {showModal === EActionTokenModal.LOGIN && <LoginForm />}
            {showModal === EActionTokenModal.REGISTRATION &&<RegistrationForm /> }
            {showModal === EActionTokenModal.FORGOTPASSWORD &&<ForgotForm /> }
        </>
    );
};


export {ShowModal};