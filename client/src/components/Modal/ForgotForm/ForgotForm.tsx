import React, {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from '@hookform/resolvers/joi';
import CloseIcon from '@mui/icons-material/Close';

import {modalActions} from "../../../redux";
import {useAppDispatch, useFetching} from "../../../hooks";
import './ForgotForm.css'
import {forgotValidator} from "../../../validators";
import logo from "../../../assets/imeges/logo.png";
import {EActionTokenModal} from "../../../enums";
import {authService} from "../../../services";
import {toast} from "react-toastify";
import {LoaderForm} from "../../UI";


const ForgotForm = () => {

    type IEmail = { email: string }

    const dispatch = useAppDispatch();


    const {
        handleSubmit, register, reset,
        formState: {errors}
    } = useForm<IEmail>({mode: 'all', resolver: joiResolver(forgotValidator)});




    const [fetching, isLoading, error]=useFetching(
        async  (email) =>{
            await authService.forotPassword(email)
            dispatch(modalActions.shownModal(EActionTokenModal.NONE))
            toast.success("On the  email will be sent to the Email, you provided during registration. This letter  will contain a link to follow!", {
                autoClose: 6000,
                theme:"light",
            });
        }
    )



    const forgot: SubmitHandler<IEmail> = async ({email}: IEmail) => {
        fetching(email,false)
        reset();
    }

    const closeModalWindow = () => {
        dispatch(modalActions.shownModal(EActionTokenModal.NONE))
    }


    return (
        <div className='backdrop_forgot'>
            <div className='wrapper_forgot'>
                <div className='logo__form_forgot'>
                    <img src={logo} alt='logo '/>
                </div>
                <form className='form_forgot' onSubmit={handleSubmit(forgot)}>
                    <CloseIcon onClick={closeModalWindow}/>
                    <input
                        type="text"
                        placeholder="email"
                        {...register("email")}
                    />
                    {errors.email && <span className="error_forgot_1">{errors.email.message}</span>}
                    <button style={{width: '100%', height: '2.5rem', margin: '0.5rem 0'}} className='button_forgot'>SEND
                    </button>

                </form>
                <div className='forgot_loader'>
                {isLoading && <LoaderForm/>}
                </div>
                {error &&
                    <div className="error_forgot">{error}</div>
                }
            </div>
        </div>
    );
};

export {ForgotForm};