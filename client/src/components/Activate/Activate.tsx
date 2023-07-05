import React, {useEffect} from 'react';
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";
import {authService} from "../../services";
import {AxiosError} from "axios";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";
import {EUserStatus} from "../../enums";

const Activate = () => {

    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch();

    let {actionToken} = useParams();




    useEffect( ()=>{
        const ActivateFunction: any = async (actionToken:string) => {
            try {
                await authService.activateAccaunt(actionToken)
                if(user){
                    dispatch(userActions.getUserByToken())
                }
                toast.success("Your account is activated!", {
                    autoClose: 2000,
                    theme:"light",
                });

            } catch (e) {
                const err = e as AxiosError
                toast.error("Account activation error!", {
                    autoClose: 2000,
                    theme:"light",
                });
            }
        }

        ActivateFunction(actionToken)
    },[])


    return (
        <>
        </>
    );
};

export {Activate};