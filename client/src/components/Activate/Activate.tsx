import React, {useEffect} from 'react';
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {authService} from "../../services";
import {AxiosError} from "axios";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";

const Activate = () => {

    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();

    let {actionToken} = useParams();
    console.log(actionToken,'Activated');

    const ActivateFunction: any = async (actionToken:string) => {
        try {
            if(user?.status==="active"){
                toast.info('This account has already been activated!', {
                    autoClose: 2000,
                    theme:"light",
                });
            }
            await authService.activateAccaunt(actionToken)
            toast.success("Your account is activated!", {
                autoClose: 2000,
                theme:"light",
            });
            if(user){
                dispatch(userActions.getUser(user._id))
            }
        } catch (e) {
            const err = e as AxiosError
            toast.error(`${err.message}!`, {
                autoClose: 2000,
                theme:"light",
            });
        } finally {

        }
    }

    useEffect( ()=>{
        ActivateFunction(actionToken)
    },[actionToken])


    return (
        <>
        </>
    );
};

export {Activate};