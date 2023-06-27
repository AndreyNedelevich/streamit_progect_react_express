import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import { joiResolver} from '@hookform/resolvers/joi';
import CloseIcon from '@mui/icons-material/Close';

import {IUser} from "../../interfaces";
import {modalActions} from "../../redux";
import {useAppDispatch} from "../../hooks";
import './loginForm.css'
import {loginValidator} from "../../validators";
import logo from "../../assets/imeges/logo.png";
import {EActionTokenModal} from "../../enums";


const LoginForm = () => {
    const dispatch = useAppDispatch();




    const {handleSubmit, register, reset,
        formState: {isValid, errors}} = useForm<IUser>({mode: 'all', resolver: joiResolver(loginValidator)});

    const login: SubmitHandler<IUser> = (userLogin:IUser) => {
        console.log(userLogin);
        //dispatch(modalActions.getAuthUser(userLogin))
        dispatch(modalActions.shownModal(EActionTokenModal.NONE))
        reset();
    }

    const closeModalWindow=()=>{
        dispatch(modalActions.shownModal(EActionTokenModal.NONE))
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
                    {errors.email && <span className="error_login_1">{errors.email.message}</span>}
                    <input
                        type="text"
                        placeholder={"password"}
                        {...register("password")}
                    />
                    {errors.password && <span className="error_login_2" >{errors.password.message}</span>}
                    <button style={{width:'100%',height:'2.5rem',margin:'7px 0'}} className='button_slider' disabled={!isValid} >SIGN IN</button>
                    <div className='register_form' >Ты еще не с нами? Регистрируйся!
                        <button onClick={()=>dispatch(modalActions.shownModal(EActionTokenModal.REGISTRATION))}>REGISTRATION</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export {LoginForm};