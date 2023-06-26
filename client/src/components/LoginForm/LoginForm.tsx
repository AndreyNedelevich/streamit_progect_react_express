import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import { joiResolver} from '@hookform/resolvers/joi';
import CloseIcon from '@mui/icons-material/Close';

import {IUser} from "../../interfaces";
import {authActions} from "../../redux";
import {useAppDispatch} from "../../hooks";
import './loginForm.css'
import {authValidator} from "../../validators";
import logo from "../../assets/imeges/logo.png";
import {EActionTokenModal} from "../../enums";


const LoginForm = () => {
    const dispatch = useAppDispatch();




    const {handleSubmit, register, reset,
        formState: {isValid, errors}} = useForm<IUser>({mode: 'all', resolver: joiResolver(authValidator)});

    const login: SubmitHandler<IUser> = (user) => {
        console.log(user);
        //dispatch(authActions.getAuthUser(user))
        reset();

    }

    const closeModalWindow=()=>{
        dispatch(authActions.shownModalLogIn(EActionTokenModal.NONE))
    }


    return (
        <div  className={'backdrop'}>
            <div className={'wrapper_login'}>
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
                    {errors.email && <span className="error1">{errors.email.message}</span>}
                    <input
                        type="text"
                        placeholder={"password"}
                        {...register("password")}
                    />
                    {errors.password && <span className="error2" >{errors.password.message}</span>}
                    <button style={{width:'100%',height:'2.5rem',margin:'7px 0'}} className='button_slider' disabled={!isValid} >SIGN IN</button>
                    <div className='register' >Ты еще не с нами? Регистрируйся!
                        <button onClick={()=>dispatch(authActions.shownModalRegister(EActionTokenModal.REGISTRATION))}>REGISTRATION</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export {LoginForm};