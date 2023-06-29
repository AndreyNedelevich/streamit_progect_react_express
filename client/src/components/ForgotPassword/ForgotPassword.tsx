import React, {FC, useState} from 'react';


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


interface IProps {
    setQuery: ISetState<string>
}

const ForgotPassword = () => {


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
            toast.success("Sign up success",{
                autoClose: 3500,
            });
        } catch (e) {
            const err = e as AxiosError
            //setError(err);
            toast.success(`${err}`,{
                autoClose: 3500,
            });
        } finally {
            reset();
        }
    }

    return (
        <>
            <div className='dark'></div>
            <h2>Enter a new password</h2>
            <form className="forgot_password_form" onSubmit={handleSubmit(forgotFunction)}>
                <input
                    className='forgot_password_input'
                    type="text"
                    placeholder={"password"}
                    {...register("password")}
                />
                {errors.password && <span className="error_register_4">{errors.password.message}</span>}
                <input
                    className='forgot_password_input'
                    type="text"
                    placeholder={"confirm pasword"}
                    {...register("confirmPassword")}
                />
                {errors.confirmPassword &&
                    <span className="error_register_5">{errors.confirmPassword.message}</span>}
            </form>
            <Footer/>
        </>
    );
};

export {ForgotPassword};