import React, { useState,FC} from 'react';


import './PasswordUpdate.css'

import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {passwordUpdateValidator} from "../../validators";
import {authService} from "../../services";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {IUseState} from "../../hooks";

interface IProps{
    setIsLoginRequest:IUseState<boolean>
}

const PasswordUpdate:FC<IProps> = ({setIsLoginRequest}) => {

    type IPasswordUpdate = {oldPassword:string, password: string, confirmPassword: string }


    const [error, setError] = useState(null);



    const {
        handleSubmit, register, reset,
        formState: {errors}
    } = useForm<IPasswordUpdate>({mode: 'all', resolver: joiResolver(passwordUpdateValidator)});




    const submitFunction: SubmitHandler<IPasswordUpdate> = async (data: IPasswordUpdate) => {
        setError(null);
        try {
            setIsLoginRequest(true)
            await authService.chengePassword(data.oldPassword,data.password)
            toast.success("New password successfully set", {
                    autoClose: 2000,
                    theme:"light",
            });
        } catch (e) {
            const err = e as AxiosError
            console.log(err);
            setError(err);
            toast.error(`${err.message}`, {
                autoClose: 2000,
                theme:"light",
            });
        } finally {
            reset();
            setIsLoginRequest(false);
        }
    }

    return (
        <>
            <div className="container_update_password">
                <form className="form_password_update" onSubmit={handleSubmit(submitFunction)}>
                    <h2 className="title_update_password  ">Change password</h2>
                    <input
                        className='password_update_input'
                        type="text"
                        placeholder={"old password"}
                        {...register("oldPassword")}
                    />
                    {errors.oldPassword && <span className="error_update_password_1">{errors.oldPassword.message}</span>}
                    <input
                        className='password_update_input'
                        type="text"
                        placeholder={"new password"}
                        {...register("password")}
                    />
                    {errors.password && <span className="error_update_password_2">{errors.password.message}</span>}
                    <input
                        className='password_update_input'
                        type="text"
                        placeholder={"confirm pasword"}
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword &&
                        <span className="error_update_password_3">{errors.confirmPassword.message}</span>}
                    <button style={{width: '40%', height: '2.3rem'}} className='button_update_password'>
                        Change password
                    </button>
                </form>
            </div>
        </>
    );
};

export {PasswordUpdate};