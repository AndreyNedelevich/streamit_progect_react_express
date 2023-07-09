import React,{useRef,useEffect,FC} from "react";
import {NavLink, useNavigate} from 'react-router-dom';

interface IProps {
    children: string;
    delay:number,
    to:string,
    replace:boolean;
    state:string
}


const DelayedLink:FC<IProps> = (props) => {
    const { delay,to} = props;
    const navigate = useNavigate();
    const timerRef = useRef();

    useEffect(() => () => clearTimeout(timerRef.current), []);

    const clickHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // @ts-ignore
        timerRef.current = setTimeout(navigate, delay, to);
    };

    return <NavLink to={to} {...props} onClick={clickHandler}>{props.children}</NavLink>
};

export {DelayedLink}