import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import { joiResolver} from '@hookform/resolvers/joi';
import CloseIcon from '@mui/icons-material/Close';

import {IRegistr} from "../../interfaces";
import {authActions} from "../../redux";
import {useAppDispatch} from "../../hooks";
import './RegistrationForm.css'
import {registrationValidator} from "../../validators";
import logo from "../../assets/imeges/logo.png";
import {EActionTokenModal} from "../../enums";



const RegistrationForm = () => {
    const dispatch = useAppDispatch();




    const {handleSubmit, register, reset,
        formState: {isValid, errors}} = useForm<IRegistr>({mode: 'all', resolver: joiResolver(registrationValidator)});

    const registration: SubmitHandler<IRegistr> = (user) => {
        console.log(user);
        //dispatch(authActions.getAuthUser(user))
        reset();
    }

    const closeModalWindow=()=>{
        dispatch(authActions.shownModalRegister(EActionTokenModal.NONE))
    }


    return (
        <div  className={'backdrop'}>
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
                    {errors.email && <span className="error1">{errors.email.message}</span>}
                    <input
                        type="text"
                        placeholder={"user name"}
                        {...register("username")}
                    />
                    {errors.username && <span className="error1">{errors.username.message}</span>}
                    <input
                        type="text"
                        placeholder={"password"}
                        {...register("password")}
                    />
                    {errors.password && <span className="error3" >{errors.password.message}</span>}
                    <input
                        type="text"
                        placeholder={"confirm pasword"}
                        {...register("confirmPassword")}
                    />
                    {errors.password && <span className="error4" >{errors.password.message}</span>}
                    <button style={{width:'100%',height:'2.5rem',margin:'7px 0'}} className='button_slider' disabled={!isValid} >SIGN UP</button>
                    <div className='register' >У тебя уже есть аккаунт?
                        <button onClick={()=>dispatch(authActions.shownModalLogIn(EActionTokenModal.Login))}>SIGN IN</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export {RegistrationForm};