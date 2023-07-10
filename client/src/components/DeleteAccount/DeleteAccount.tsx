import React from 'react';
import {Button} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from '@mui/material/CircularProgress';

import './DeleteAccount.css'
import {useAppDispatch, useAppSelector, useFetching} from "../../hooks";
import {userService} from "../../services/user.service";
import {userActions} from "../../redux";
import {toast} from "react-toastify";


const DeleteAccount = () => {

    const dispatch = useAppDispatch()

    const {user} = useAppSelector(state => state.userReducer)

    const [fetching, isLoading, error] = useFetching(
        async () => {
            const response =await userService.deleteAccount(user._id)
            console.log(response);
            if (response&&!error) {
                dispatch(userActions.signOut(null))
                toast.success("Account deleted", {
                    theme: "light",
                    autoClose: 1500,
                });
            }
        }
    )



    return (
        <div className="block_delete_avatar">
            <h2 className="title_delete_profile">Delete account</h2>
            <Button
                variant="outlined"
                color="secondary"
                startIcon={isLoading ? <CircularProgress size={'1.3rem'} color="inherit"/> : <DeleteIcon/>}
                style={{
                    marginLeft: '0.7rem',
                    marginBottom:'3.1rem',
                    backgroundColor: 'red',
                    borderColor: 'rgba(192,189,189,0.67)',
                    width: '21rem',
                    height: '2.35rem',
                    color: '#fff'
                }}
                onClick={()=>{fetching()}}
            >
                Delete
            </Button>
        </div>
    );
};

export {DeleteAccount};