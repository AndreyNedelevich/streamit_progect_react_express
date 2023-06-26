import React from 'react';


import './Footer.css'
import img from '../../assets/imeges/footer-bg.jpg';
import logotip from '../../assets/imeges/logo.png';

const Footer = () => {
    return (
        <div className="footer" style={{backgroundImage: `url(${img })`}}>
                <div className="footer__content">
                    <div className="footer__logo">
                        <img src={ logotip} alt="logotip" />
                    </div>
                </div>
        </div>
    );
}

export  {Footer}