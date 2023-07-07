import React from 'react';
import {useAppSelector} from "../../hooks";
import './EditProfile.css'
import {LinearLoader} from "../../components/UI/Loader/LinearLoader";
import {PasswordUpdate} from "../../components";

const EditProfile = () => {
    const [enteredEmail, setEnteredEmail] = useState("");
    const isEnteredEmailValid = enteredEmail.includes("@");


    const formSubmitHandler = (event) => {
        event.preventDefault();


        if (!isEnteredNameValid) {
            return;
        }


        setEnteredEmail("");

    };

    const {user} = useAppSelector((state) => state.userReducer)

    return (
        <>
            <div className='dark'></div>
            {/*{isLoginRequest && <LinearLoader/>}*/}
            <div className='wrapper_edit_profile'>
                <div className='wrapper_edit_profile_img'>
                    <img className='profile_edit_img' src={"https://www.movienewz.com/img/films/poster-holder.jpg"}
                         alt='foto'/>
                </div>
                <div>
                    <div className='block_edit_email'>
                        <h2 className="title_edit_email">Change email</h2>
                        <div className='edit_email'>
                            <div>{user?.email}</div>
                            <input onChange={(e) => {
                                setEnteredEmail(e.target.value)
                            }} value={enteredEmail} type="text" placeholder='new email'/>
                            <div>{user?.email}</div>
                        </div>
                    </div>
                    <div className='block_user_edit_data'>
                        <div>
                            <div className='edit_data'>User name</div>
                            <div className='edit_data'>Age</div>
                        </div>
                        <div>
                            <div className='edit_data'>{user?.userName}</div>
                            <div className='edit_data'>{user?.age}</div>
                        </div>
                    </div>
                    <PasswordUpdate/>
                </div>
            </div>
        </>
    );
};
export {EditProfile};