import React, { useState} from 'react';
import {Navigate,useNavigate, useParams} from "react-router-dom";

import './ForgotPassword.css'

import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {forgotPasswordValidator} from "../../validators";
import {authService} from "../../services";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {LinearLoader} from "../UI/Loader/LinearLoader";


const ForgotPassword = () => {

    const navigate=useNavigate()

    let {actionToken} = useParams();


    type IPassword = { password: string, confirmPassword: string }


    const [error, setError] = useState(null);
    const [isLoginRequest, setIsLoginRequest] = useState(false);

    const {
        handleSubmit, register, reset,
        formState: {isValid, errors}
    } = useForm<IPassword>({mode: 'all', resolver: joiResolver(forgotPasswordValidator)});


    const forgotFunction: SubmitHandler<IPassword> = async (data: IPassword) => {
        setError(null);
        try {
            setIsLoginRequest(true)
            await authService.setNewPassword(actionToken, data.password)
            navigate('/home')
            toast.success("New password successfully set", {
                    autoClose: 1000,
            });
        } catch (e) {
            const err = e as AxiosError
            setError(err);
            toast.error(`${err.message}`, {
                autoClose: 1000,
            });
        } finally {
            setIsLoginRequest(false)
            reset();
        }
    }

    return (
        <>
            <div className='dark'></div>
            {isLoginRequest && <LinearLoader/>}
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
                    <button style={{width: '100%', height: '3.2rem', margin: '7px 0'}} className='button_forgot_password'>SEND
                    </button>
                </form>
                {error &&
                    <div className="error_forgot_password">{error.message}</div>
                }
            </div>
        </>
    );
};

export {ForgotPassword};