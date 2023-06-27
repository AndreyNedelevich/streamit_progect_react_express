import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from '@hookform/resolvers/joi';
import CloseIcon from '@mui/icons-material/Close';
import {toast} from "react-toastify";

import {IRegistr} from "../../interfaces";
import {authActions, modalActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import './RegistrationForm.css'
import {registrationValidator} from "../../validators";
import logo from "../../assets/imeges/logo.png";
import {EActionTokenModal} from "../../enums";


const RegistrationForm = () => {


    const {loading, error} = useAppSelector((state) => state.authReducer)
    const dispatch = useAppDispatch();


    const {
        handleSubmit, register, reset,
        formState: {isValid, errors}
    } = useForm<IRegistr>({mode: 'all', resolver: joiResolver(registrationValidator)});

    const registration: SubmitHandler<IRegistr> = async (user: IRegistr) => {

      const response=await  dispatch(authActions.register(user))
        if (response.meta.requestStatus==='fulfilled') {
            dispatch(modalActions.shownModal(EActionTokenModal.NONE))
            toast.success("Sign up success");
        }
        console.log(error);
        reset();
    }

    const closeModalWindow = () => {
        dispatch(modalActions.shownModal(EActionTokenModal.NONE))
    }


    return (
        <div className={'backdrop'}>
            <div className={'wrapper_register'}>
                <div className={'logo__form'}>
                    <img src={logo} alt='logo '/>
                </div>
                <form className={'form'} onSubmit={handleSubmit(registration)}>
                    <CloseIcon onClick={closeModalWindow}/>
                    <input
                        type="text"
                        placeholder={"email"}
                        {...register("email")}
                    />
                    {errors.email && <span className="error_register_1">{errors.email.message}</span>}
                    <input
                        type="text"
                        placeholder={"user name"}
                        {...register("userName")}
                    />
                    {errors.userName && <span className="error_register_2">{errors.userName.message}</span>}
                    <input
                        type="number"
                        placeholder={"age"}
                        min="1"
                        {...register("age")}
                    />
                    {errors.age && <span className="error_register_3">{errors.age.message}</span>}
                    <input
                        type="text"
                        placeholder={"password"}
                        {...register("password")}
                    />
                    {errors.password && <span className="error_register_4">{errors.password.message}</span>}
                    <input
                        type="text"
                        placeholder={"confirm pasword"}
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword &&
                        <span className="error_register_5">{errors.confirmPassword.message}</span>}
                    <button style={{width: '100%', height: '2.5rem', margin: '7px 0'}} className='button_slider'
                            disabled={!isValid}>SIGN UP
                    </button>
                    <div className='register_form'>У тебя уже есть аккаунт?
                        <button onClick={() => dispatch(modalActions.shownModal(EActionTokenModal.LOGIN))}>SIGN IN</button>
                    </div>
                </form>
                {error &&
                    <div className="error_register">{error.message}</div>
                }
            </div>
        </div>
    );
};

export {RegistrationForm};