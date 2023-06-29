import React, {useState} from 'react';
import {ListItemButton, ListItemText, Menu, Typography} from "@mui/material";
import {Link} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {userMenu} from "../../configs";
import {userActions} from "../../redux";

const Profile = () => {

    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    const [anchorEl, setAnchorEl] = useState(null);

    const toggleMenu = (e: { currentTarget: HTMLElement; }) => {
        console.log(e.currentTarget);
        setAnchorEl(e.currentTarget);
    }

    return (
        <>
            <div onClick={toggleMenu} className='wrapper_profile'>
                PROFILE
            </div>
                <Menu
                    className='menu'
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{sx: {padding: 0, mt: '1.6rem', background: 'rgba(20,19,19,0.6)', color: 'white'}}}
                >
                    <div className='userName'>{user.userName}</div>
                    {userMenu.map((item, index) => (
                        <ListItemButton
                            sx={{border: '0.1rem solid white', margin: '0.3rem'}}
                            component={Link}
                            to={item.path}
                            key={index}
                            onClick={() => setAnchorEl(null)}
                        >
                            <ListItemText disableTypography primary={
                                <Typography textTransform="uppercase">{item.display}</Typography>
                            }/>
                        </ListItemButton>
                    ))}
                    <ListItemButton
                        sx={{ border: '0.1rem solid white', margin: '0.3rem'}}
                        onClick={() => dispatch(userActions.signOut(null))}
                    >
                        <ListItemText disableTypography primary={
                            <Typography textTransform="uppercase">SIGN OUT</Typography>
                        }/>
                    </ListItemButton>
                </Menu>
        </>
    )
};

export {Profile};