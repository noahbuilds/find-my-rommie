import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <>
            <footer className="footer text-center">
                <p className="text-muted">
                    Final Year Project{' '}
                    <a
                        href="https://github.com/ladipojones/roommie.git"
                        rel="noopener nofollow noreferrer"
                        target="_blank"
                    >
                        View the source code on GitHub!
                    </a>
                </p>
            </footer>
        </>
    );
};

export default Footer;
