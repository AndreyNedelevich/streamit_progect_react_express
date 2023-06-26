import React, {FC} from "react";

import styles from './Card.module.css'

interface IProps {
    children: any
//     ????
}

const Card:FC<IProps> = (props) => {
    return <div className={styles.card}>{props.children}</div>;

};

export  {Card};