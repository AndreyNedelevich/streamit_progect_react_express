import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from '@hookform/resolvers/joi';
import CloseIcon from '@mui/icons-material/Close';

import {IUser} from "../../../interfaces";
import {modalActions, userActions} from "../../../redux";
import {useAppDispatch, useFetching} from "../../../hooks";
import './loginForm.css'
import {loginValidator} from "../../../validators";
import logo from "../../../assets/imeges/logo.png";
import {EActionTokenModal} from "../../../enums";
import {authService} from "../../../services";
import {toast} from "react-toastify";
import {LoaderForm} from "../../UI";


const LoginForm = () => {
    const dispatch = useAppDispatch();



    const {
        handleSubmit, register, reset,
        formState: { errors}
    } = useForm<IUser>({mode: 'all', resolver: joiResolver(loginValidator)});


    const [fetching, isLoading, error]=useFetching(
        async  (user) =>{
            const {data} = await authService.login(user)
            if (data) {
                dispatch(userActions.getUser(data.id))
                dispatch(modalActions.shownModal(EActionTokenModal.NONE))
                toast.success("Sign in success", {
                    theme:"light",
                     autoClose: 1500,
                });
            }
        }
    )



    const login: SubmitHandler<IUser> = async (user: IUser) => {
        fetching(user,false)
        reset();
    }

    const closeModalWindow = () => {
        dispatch(modalActions.shownModal(EActionTokenModal.NONE))
    }


    return (
        <div className='backdrop_login'>
            <div className='wrapper_login'>
                <div className={'logo_form'}>
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
                    <button style={{width: '100%', height: '2.5rem', margin: '0.5rem  0'}} className='button_login'>SIGN
                        IN
                    </button>
                    <div className='login_form'>
                        Are you not with us yet? Register!!
                        <button
                          type="button"  onClick={() => dispatch(modalActions.shownModal(EActionTokenModal.REGISTRATION))}>REGISTRATION</button>
                        {isLoading && <LoaderForm/>}
                    </div>
                    <div className='login_form'>Forgot your password!!!
                        <button style={{marginLeft:"2.3rem"}}
                            type="button"  onClick={() => dispatch(modalActions.shownModal(EActionTokenModal.FORGOTPASSWORD))}>FORGOT PASSWORD</button>
                    </div>
                </form>
                {error &&
                    <div className="error_login">{error}</div>
                }
            </div>
        </div>
    );};

export {LoginForm};