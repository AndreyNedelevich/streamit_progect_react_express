import React, {FC, useState} from 'react';
import {useParams} from "react-router-dom";

import {useAppDispatch} from "../../hooks";
import './ForgotPassword.css'
import {ISetState} from "../../types/setState.type";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {forgotPasswordValidator} from "../../validators";
import {IRegistr} from "../../interfaces";
import {authService} from "../../services";
import {modalActions} from "../../redux";
import {EActionTokenModal} from "../../enums";
import {toast} from "react-toastify";
import {AxiosError} from "axios/index";
import {Footer} from "../Footer";
import {useSelector} from "react-redux";


interface IProps {
    setQuery: ISetState<string>
}

const ForgotPassword = () => {

    let {actionToken} = useParams();



    type IPassword = { password: string, confirmPassword: string }

    const dispatch = useAppDispatch();

    //const [error, setError] = useState(null);
    console.log('forgotPassword');

    const {
        handleSubmit, register, reset,
        formState: {isValid, errors}
    } = useForm<IPassword>({mode: 'all', resolver: joiResolver(forgotPasswordValidator)});


    const forgotFunction: SubmitHandler<IPassword> = async (data: IPassword) => {
        //setError(null);
        try {
            //await authService.register(data)
            dispatch(modalActions.shownModal(EActionTokenModal.NONE))
            toast.success("Sign up success", {
                autoClose: 3500,
            });
        } catch (e) {
            const err = e as AxiosError
            //setError(err);
            toast.success(`${err}`, {
                autoClose: 3500,
            });
        } finally {
            reset();
        }
    }

    return (
        <>
            <div className='dark'></div>
            <div className="container_forgot_password">
                <form className="forgot_password_form" onSubmit={handleSubmit(forgotFunction)}>
                    <h2 className="title_forgot_password">Enter a new password</h2>
                    <input
                        className='forgot_password_input'
                        type="text"
                        placeholder={"password"}
                        {...register("password")}
                    />
                    {errors.password && <span className="error_forgot_password_1">{errors.password.message}</span>}
                    <input
                        className='forgot_password_input'
                        type="text"
                        placeholder={"confirm pasword"}
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword &&
                        <span className="error_forgot_password_2">{errors.confirmPassword.message}</span>}
                    <button style={{width: '100%', height: '2.5rem', margin: '7px 0'}} className='button_forgot_password'>SEND
                    </button>
                </form>
            </div>
        </>
    );
};

export {ForgotPassword};