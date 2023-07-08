import React, {useState} from 'react';

import {useAppSelector} from "../../hooks";
import './EditProfile.css'
import {LinearLoader} from "../../components/UI/Loader/LinearLoader";
import {PasswordUpdate} from "../../components";
import {ChangeEmail} from "../../components/ChangeEmail";
import {EditProfileUser} from "../../components/EditProfileUser";


const EditProfile = () => {

    const {user, loading} = useAppSelector((state) => state.userReducer)
    const [isLoginRequest, setIsLoginRequest] = useState(false);


    return (
        <>
            <div className='dark'></div>
            {loading && <LinearLoader/>}
            {isLoginRequest && <LinearLoader/>}
            <div className='wrapper_edit_profile'>
                <div className='wrapper_edit_profile_img'>
                    <img className='profile_edit_img' src={"https://www.movienewz.com/img/films/poster-holder.jpg"}
                         alt='foto'/>
                </div>
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