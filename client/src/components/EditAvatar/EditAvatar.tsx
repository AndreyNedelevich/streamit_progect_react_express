import React, {FC, useRef, useState} from 'react';
import {Button} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import {red} from '@mui/material/colors';


import './EditAvatar.css'
import {IUseState, useAppDispatch, useAppSelector} from "../../hooks";
import {toast} from "react-toastify";
import {userService} from "../../services/user.service";
import {AxiosError} from "axios";
import {userActions} from "../../redux";


interface IProps{
    setIsLoginRequest:IUseState<boolean>
}


const EditAvatar:FC<IProps> = ({setIsLoginRequest}) => {
    const fileInputRef = useRef(null);

    const {user} = useAppSelector((state) => state.userReducer)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState(null);
    const dispatch = useAppDispatch()




    const handleImageClick = () => {
        fileInputRef.current.click();
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.files[0]){
            setSelectedFile(event.target.files[0]);
        }
    };

    console.log(selectedFile);

    const handleUpload = async () => {
        setError(null);
        if (!selectedFile) {
            toast.info("Please select file", {
                theme: "light",
                autoClose: 1500,
            });
            return
        }
        const formData = new FormData();
        formData.append('avatar', selectedFile);
        try {
            setIsLoginRequest(true)
            const {data} = await userService.uploadAvatar(user._id, formData)
            if(data){
                dispatch(userActions.getUser(user._id))
            }
            toast.success("Photo saved successfully", {
                autoClose: 2000,
                theme: "light",
            });

        } catch (e) {
            const err = e as AxiosError
            setError(err);
            toast.error(`${err.message}`, {
                autoClose: 2000,
                theme: "light",
            });
        } finally {
            setIsLoginRequest(false);
            setSelectedFile(null);
        }
    }


    const handleDelete = () => {

    };

    return (
        <div className='wrapper_edit_profile_img'>
            <div className='blockAvatar'>
                <img onClick={handleImageClick} style={{cursor: 'pointer'}} className='profile_edit_img'
                     src={user?.avatar ? `${user.avatar}` : `https://www.movienewz.com/img/films/poster-holder.jpg`}
                     alt='foto'/>
                <span className='message_loadFile'>{selectedFile? `Selected file ${selectedFile.name}`:'Upload a file. Click on the photo!' }
                <button  onClick={()=>{setSelectedFile(null)}}>dalete select file</button>
                </span>
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
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon/>}
                    style={{borderColor: red[500], color: '#fff'}}
                    onClick={handleDelete}
                >
                    Dalete
                </Button>
                </div>
            </div>
        </div>
    );
};

export {EditAvatar}

