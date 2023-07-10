import React, {useState} from 'react';
import {ListItemButton, ListItemText, Menu, Typography} from "@mui/material";
import {Link} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {userMenu} from "../../configs";
import {modalActions, userActions} from "../../redux";
import {EActionTokenModal} from "../../enums";

const MenuUser = () => {

    const {user} = useAppSelector(state => state.userReducer)
    const dispatch = useAppDispatch()

    const [anchorEl, setAnchorEl] = useState(null);

    const toggleMenu = (e: { currentTarget: HTMLElement; }) => {
        setAnchorEl(e.currentTarget);
    }

    return (
        <>
            <div onClick={toggleMenu} className='wrapper_menu'>
                {user.userName}
            </div>
                <Menu
                    className='menu'
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{sx: {padding: 0, mt: '1.5rem', background: 'rgba(20,19,19,0.6)', color: 'white'}}}
                >
                    {userMenu.map((item, index) => (
                        <ListItemButton
                            sx={{padding:'0.8rem',border: '0.1rem solid white', margin: '0.7rem'}}
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
                        sx={{ padding:'0.8rem',border: '0.1rem solid white', margin: '0.7rem'}}
                        onClick={() =>{
                            dispatch(userActions.signOut(null))
                            dispatch(modalActions.shownModal(EActionTokenModal.NONE))
                        } }
                    >
                        <ListItemText disableTypography primary={
                            <Typography textTransform="uppercase">SIGN OUT</Typography>
                        }/>
                    </ListItemButton>
                </Menu>
        </>
    )
};

export {MenuUser};