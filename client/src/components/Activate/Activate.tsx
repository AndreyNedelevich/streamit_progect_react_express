import React, {useCallback, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {authService} from "../../services";
import {AxiosError} from "axios";
import {useAppDispatch} from "../../hooks";
import {userActions} from "../../redux";

const Activate = () => {
    const navigate = useNavigate()

    const dispatch = useAppDispatch();

    let {actionToken} = useParams();
    console.log(actionToken);

    const activateFunction: any = useCallback(async (actionToken: string) => {
        try {
            await authService.activateAccaunt(actionToken)
            dispatch(userActions.getUserByToken())
            toast.success("Your account is activated!", {
                autoClose: 2000,
                theme: "light",
            });
        } catch (e) {
            const err = e as AxiosError
            toast.error("Account activation error!", {
                autoClose: 2000,
                theme: "light",
            });
        }

    }, [actionToken])


    useEffect(() => {
        activateFunction(actionToken)
        const timer = setTimeout(() => {
            navigate('/home')
        }, 500);
        return () => clearTimeout(timer);
    }, [activateFunction, actionToken])


    return (
        <>
        </>
    );
};

export {Activate};