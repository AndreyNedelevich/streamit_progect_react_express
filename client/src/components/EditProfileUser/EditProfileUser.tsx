import React from 'react';


import './EditProfileUser.css'

import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {allValidators} from "../../validators";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";
import {IUserFromDB} from "../../interfaces";


const EditProfileUser = () => {

    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()


    const {
        handleSubmit, register, reset,
        formState: {errors}
    } = useForm<Partial<IUserFromDB>>({mode: 'all', resolver: joiResolver(allValidators.editUser)});


    const submitFunction: SubmitHandler<Partial<IUserFromDB>> = async (data: Partial<IUserFromDB>) => {
        const dto = {
            userId: user._id,
            dto: data
        }
        const response = await dispatch(userActions.editUser(dto))
        if (response.meta.requestStatus === 'fulfilled') {
            toast.success("Data changed successfully", {
                autoClose: 2000,
                theme: "light",
            });
        }
        reset();
    }


    return (
        <div>
            <form className="form_edit_user" onSubmit={handleSubmit(submitFunction)}>
                <input
                    className='edit_user_input'
                    type="text"
                    placeholder={"user name"}
                    {...register("userName")}
                />
                {errors.userName && <span className="error_edit_user_1">{errors.userName.message}</span>}
                <input
                    className='edit_user_input'
                    type="number"
                    placeholder={"age"}
                    {...register("age")}
                />
                {errors.age && <span className="error_edit_user_2">{errors.age.message}</span>}
                <button style={{width: '100%', height: '2.3rem'}} className='button_edit_user'>
                    Edit user
                </button>
            </form>
        </div>
    );
};

export {EditProfileUser};