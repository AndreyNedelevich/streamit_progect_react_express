import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from '@hookform/resolvers/joi';
import CloseIcon from '@mui/icons-material/Close';
import {toast} from "react-toastify";


import { IRegistr} from "../../../interfaces";
import {modalActions} from "../../../redux";
import './RegistrationForm.css'
import {registrationValidator} from "../../../validators";
import logo from "../../../assets/imeges/logo.png";
import {EActionTokenModal} from "../../../enums";
import {authService} from "../../../services";
import {useAppDispatch, useFetching} from "../../../hooks";
import {LoaderForm} from "../../UI";



const RegistrationForm = () => {


    const dispatch = useAppDispatch();




    const {
        handleSubmit, register, reset,
        formState: { errors}
    } = useForm<IRegistr>({mode: 'all', resolver: joiResolver(registrationValidator)});


    const [fetching, isLoading, error]=useFetching(
        async  (user) =>{
                await authService.register(user)
                dispatch(modalActions.shownModal(EActionTokenModal.NONE))
                toast.success("Sign up success",{
                    autoClose: 1500,
                    theme:"light",
                });
        }
    )


    const registration: SubmitHandler<IRegistr> = async (user: IRegistr) => {
        fetching(user,false)
        reset();
    }


    const closeModalWindow = () => {
        dispatch(modalActions.shownModal(EActionTokenModal.NONE))
    }


    return (
        <div className='backdrop_register'>
            <div className='wrapper_register'>
                <div className='logo__form_register'>
                    <img src={logo} alt='logo '/>
                </div>
                <form className='forms' onSubmit={handleSubmit(registration)}>
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
                    <button style={{width: '100%', height: '2.5rem', margin: '0.5rem 0'}} className='button_register'>SIGN UP
                    </button>

                    <div className='register_form'>У тебя уже есть аккаунт?
                        <button type='button' onClick={() => dispatch(modalActions.shownModal(EActionTokenModal.LOGIN))}>SIGN IN</button>
                        {isLoading&&  <LoaderForm/>}
                    </div>
                </form>
                {error &&
                    <div className="error_register">{error}</div>
                }
            </div>
        </div>
    );
};

export {RegistrationForm};