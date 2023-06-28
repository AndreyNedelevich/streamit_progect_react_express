import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from '@hookform/resolvers/joi';
import CloseIcon from '@mui/icons-material/Close';

import {IUser} from "../../interfaces";
import {modalActions} from "../../redux";
import {useAppDispatch} from "../../hooks";
import './loginForm.css'
import {loginValidator} from "../../validators";
import logo from "../../assets/imeges/logo.png";
import {EActionTokenModal} from "../../enums";
import {authService} from "../../services";
import {toast} from "react-toastify";
import {AxiosError} from "axios";
import {LoaderForm} from "../UI";


const LoginForm = () => {
    const dispatch = useAppDispatch();

    const [isLoginRequest, setIsLoginRequest] = useState(false);
    const [error, setError] = useState(null);


    const {
        handleSubmit, register, reset,
        formState: {isValid, errors}
    } = useForm<IUser>({mode: 'all', resolver: joiResolver(loginValidator)});

    const login: SubmitHandler<IUser> = async (user: IUser) => {
        setError(null);
        try {
            setIsLoginRequest(true);
            const response = await authService.login(user)
            console.log(response);
            dispatch(modalActions.shownModal(EActionTokenModal.NONE))
            toast.success("Sign in success");
        } catch (e) {
            const err = e as AxiosError
            setError(err);
        } finally {
            setIsLoginRequest(false);
            reset();
        }
    }

    const closeModalWindow = () => {
        dispatch(modalActions.shownModal(EActionTokenModal.NONE))
    }


    return (
        <div className='backdrop_login'>
            <div className='wrapper_login'>
                <div className={'logo__form'}>
                    <img src={logo} alt='logo '/>
                </div>
                <form className={'form'} onSubmit={handleSubmit(login)}>
                    <CloseIcon onClick={closeModalWindow}/>
                    <input
                        type="text"
                        placeholder={"email"}
                        {...register("email")}
                    />
                    {errors.email && <span className="error_login_1">{errors.email.message}</span>}
                    <input
                        type="text"
                        placeholder={"password"}
                        {...register("password")}
                    />
                    {errors.password && <span className="error_login_2">{errors.password.message}</span>}
                    <button style={{width: '100%', height: '2.5rem', margin: '7px 0'}} className='button_login'>SIGN
                        IN
                    </button>
                    <div className='login_form'>Ты еще не с нами? Регистрируйся!
                        <button
                            onClick={() => dispatch(modalActions.shownModal(EActionTokenModal.REGISTRATION))}>REGISTRATION</button>
                        {isLoginRequest && <LoaderForm/>}
                    </div>
                </form>
                {error &&
                    <div className="error_register">{error.message}</div>
                }
            </div>
        </div>
    );
};

export {LoginForm};