import React from 'react';
import {useAppSelector} from "../../hooks";
import './ProfileUser.css'
import {DarkHeader} from "../../components/Header/DarkHeader";
import avatar from "../../assets/imeges/Avatar-PNG-Image.png";

const ProfileUser = () => {

    const {user} = useAppSelector((state) => state.userReducer)

    return (
        <>
            <DarkHeader/>
            <div className='wrapper_profile'>
                <div className='wrapper_profile_img'>
                    <img className='profile_img'
                         src={user?.avatar ? `${user.avatar}` : `${avatar}`}
                         alt='foto'/>
                </div>
                <div>
                    <div className='title_userName'>{user?.userName}</div>
                    <div className='block_uset_data'>
                        <div>
                            <div className='data'>User name</div>
                            <div className='data'>Email</div>
                            <div className='data'>Age</div>
                            <div className='data'>Status your accaunt</div>
                        </div>
                        <div>
                            <div className='data'>{user?.userName}</div>
                            <div className='data'>{user?.email}</div>
                            <div className='data'>{user?.age}</div>
                            <div className='data'>{user?.status}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export {ProfileUser};