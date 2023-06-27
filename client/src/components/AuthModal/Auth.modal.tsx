import React from 'react';

import {EActionTokenModal} from "../../enums";
import { useAppSelector} from "../../hooks";
import {RegistrationForm} from "../RegistrationForm";
import {LoginForm} from "../LoginForm/LoginForm";


const AuthModal = () => {

    const {showModal,isloading} = useAppSelector((state) => state.modalReducer)



    return (
        <>
            {showModal === EActionTokenModal.LOGIN && <LoginForm />}
            {showModal === EActionTokenModal.REGISTRATION &&<RegistrationForm /> }
        </>
    );
};


export {AuthModal};