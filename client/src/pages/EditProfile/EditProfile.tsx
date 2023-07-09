import React, {FC, useState} from 'react';


import {IUseState, useAppSelector} from "../../hooks";
import './EditProfile.css'
import {LinearLoader} from "../../components/UI/Loader/LinearLoader";
import {PasswordUpdate} from "../../components";
import {ChangeEmail} from "../../components/ChangeEmail";
import {EditProfileUser} from "../../components/EditProfileUser";
import {EditAvatar} from "../../components/EditAvatar";





const EditProfile = () => {
    const {user, loading} = useAppSelector((state) => state.userReducer)
    const [isLoginRequest, setIsLoginRequest] = useState(false);



    return (
        <>
            <div className='dark'></div>
            {loading && <LinearLoader/>}
            {isLoginRequest && <LinearLoader/>}
            <div className='wrapper_edit_profile'>
                <EditAvatar setIsLoginRequest={setIsLoginRequest}/>
                <div>
                    <ChangeEmail/>
                    <div className='block_user_edit_data'>
                        <h2 className="title_edit_profile">Edit profile</h2>
                        <div className='grid_user_edit_data'>
                            <div>
                                <EditProfileUser/>
                            </div>
                            <div>
                                <div className='edit_data'>{user?.userName}</div>
                                <div className='edit_data'>{user?.age}</div>
                            </div>
                        </div>
                    </div>
                    <PasswordUpdate setIsLoginRequest={setIsLoginRequest}/>
                </div>
            </div>
        </>
    );
};
export {EditProfile};