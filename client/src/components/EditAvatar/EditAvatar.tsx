import React, {FC, useRef, useState} from 'react';
import {Button} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import {red} from '@mui/material/colors';
import {AxiosError} from "axios";

import './EditAvatar.css'
import {IUseState, useAppDispatch, useAppSelector} from "../../hooks";
import {toast} from "react-toastify";
import {userService} from "../../services/user.service";
import avatar from "../../assets/imeges/Avatar-PNG-Image.png";

import {userActions} from "../../redux";


interface IProps {
    setIsLoginRequest: IUseState<boolean>
}


const EditAvatar: FC<IProps> = ({setIsLoginRequest}) => {
    const fileInputRef = useRef(null);

    const {user} = useAppSelector((state) => state.userReducer)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const dispatch = useAppDispatch()


    const handleImageClick = () => {
        fileInputRef.current.click();
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };


    const handleUpload = async () => {
        if (!selectedFile) {
            return
        }
        const formData = new FormData();
        formData.append('avatar', selectedFile);
        try {
            setIsLoginRequest(true)
            const {data} = await userService.uploadAvatar(user._id, formData)
            if (data) {
                dispatch(userActions.getUser(user._id))
            }
            toast.success("Photo saved successfully", {
                autoClose: 2000,
                theme: "light",
            });

        } catch (e) {
            const err = e as AxiosError
            toast.error(`${err.message}`, {
                autoClose: 2000,
                theme: "light",
            });
        } finally {
            setIsLoginRequest(false);
            setSelectedFile(null);
        }
    }


    const handleDelete = async () => {
        if (!user?.avatar) {
            return
        }
        try {
            setIsLoginRequest(true)
            const {data} = await userService.deleteAvatar(user._id)
            if (data) {
                dispatch(userActions.deleteAvatar(null))
            }
            toast.success("Photo remotely", {
                autoClose: 2000,
                theme: "light",
            });
        } catch (e) {
            const err = e as AxiosError
            toast.error(`${err.message}`, {
                autoClose: 2000,
                theme: "light",
            });
        } finally {
            setIsLoginRequest(false);
            setSelectedFile(null);
        }

    };

    const styleSelectFileOpasity = selectedFile ? '' : 'opasity_button'
    const styleDeleteFileOpasity = user?.avatar ? '' : 'opasity_button'

    return (
        <>
            <img onClick={handleImageClick} style={{cursor: 'pointer'}} className='profile_edit_img'
                 src={user?.avatar ? `${user.avatar}` : `${avatar}`}
                 alt='foto'/>
            <div>
               <span className='message_loadFile'>{selectedFile ? `Selected file ${selectedFile.name}` : 'Upload a file.Click  photo!'}</span>
                <button className='message_button' onClick={() => {
                    setSelectedFile(null)
                }}>dalete selected file
                </button>
            </div>

            <input
                style={{display: "none"}}
                accept="image/*,.png,.jpg"
                id='files'
                type="file"
                onChange={handleFileChange}
                color="error"
                name='selected file'
                ref={fileInputRef}
            />
            <div className='block_batton'>
                <Button
                    className={styleSelectFileOpasity}
                    style={{borderColor: red[500], color: '#fff'}}
                    variant="outlined"
                    color="secondary"
                    disabled={!selectedFile}
                    onClick={handleUpload}
                    startIcon={<CloudUploadIcon/>}
                >
                    Sent
                </Button>
                <Button
                    className={styleDeleteFileOpasity}
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon/>}
                    style={{borderColor: red[500], color: '#fff'}}
                    onClick={handleDelete}
                >
                    Delete
                </Button>
            </div>
        </>

    );
};

export {EditAvatar}

