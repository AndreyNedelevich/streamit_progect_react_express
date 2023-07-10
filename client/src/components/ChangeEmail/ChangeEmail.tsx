import React from 'react';
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";


import {useAppDispatch, useAppSelector} from "../../hooks";
import {allValidators} from "../../validators";
import {userActions} from "../../redux";
import {toast} from "react-toastify";

const ChangeEmail = () => {

    const {user, error} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    const {
        handleSubmit, register, reset,
        formState: {errors}
    } = useForm<{ email: string }>({mode: 'all', resolver: joiResolver(allValidators.changeEmail)});



    const formSubmitHandler = async (data: { email: string }) => {
        const response = await dispatch(userActions.updateEmailById({userId: user._id, email: data.email}))
        if (response.meta.requestStatus === 'fulfilled') {
            toast.success(`The new email address has been successfully set. email sent to verify email address ${data.email}`, {
                autoClose: false,
                theme: "light",
            });
        }
        reset();

    };



    const emailInputClasses = errors.email
        ? "email_edit_input invalid"
        : "email_edit_input";


    return (
        <div className='block_edit_email'>
            <h2 className="title_edit_email">Edit email</h2>
            <form onSubmit={handleSubmit(formSubmitHandler)} className='edit_email'>
                <div className='edit_user_email'>{user?.email}</div>
                <input {...register("email")} className={emailInputClasses} type="text"
                       placeholder='new email'/>
                <button style={{width: '50%', height: '2.2rem'}}
                        className='button_edit_profile '>Change email
                </button>
            </form>
            {errors.email && <span className="error_edit_profile">{errors.email.message}</span>}
        </div>
    );
};

export {ChangeEmail};