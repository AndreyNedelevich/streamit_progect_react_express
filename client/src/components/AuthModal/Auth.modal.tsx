import React,{useState} from 'react';
import {EActionTokenModal} from "../../enums";
import {useAppDispatch, useAppSelector} from "../../hooks";


const AuthModal = () => {

    const {showModal,isloading} = useAppSelector((state) => state.authReducer)
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (authModalOpen) setAction(actionState.signin);
    }, [showModal]);


    return (
        <div>

        < /div>
    );
};

export {AuthModal};