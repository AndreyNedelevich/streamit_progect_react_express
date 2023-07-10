import React from 'react';

import './MainFooter.css'
import logotip from "../../assets/imeges/logo.png";


const MainFooter = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-row">
                    <div className="footer-column">
                        <ul className="footer-list">
                            <li className="footer-list-item">FAQ</li>
                            <li className="footer-list-item">Investor Relations</li>
                            <li className="footer-list-item">Corporate Information</li>
                            <li className="footer-list-item">Ways to Watch</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <ul className="footer-list">
                            <li className="footer-list-item">Help Center</li>
                            <li className="footer-list-item">Jobs</li>
                            <li className="footer-list-item">Terms of Use</li>
                            <li className="footer-list-item">Contact Us</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <ul className="footer-list">
                            <li className="footer-list-item">Account</li>
                            <li className="footer-list-item">Press Releases</li>
                            <li className="footer-list-item">Cookies</li>
                            <li className="footer-list-item">Legal Notices</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <ul className="footer-list">
                            <li className="footer-list-item">Media Center</li>
                            <li className="footer-list-item">Privacy</li>
                            <li className="footer-list-item">Submit a Request</li>
                            <li className="footer-list-item">Gift Card Terms</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-divider" />
            <div className="footer__logo">
                <img src={logotip} alt="logotip" />
            </div>
        </footer>
    );
};

export {MainFooter}