import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilArrowThickToLeft } from '@coreui/icons';

const VerifyAccount = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', height: '100vh',width:'100%' , background: 'white' }}>
            <div style={{ textAlign: 'center',  justifyContent: 'center', color: 'black', marginLeft:'20%' }}>
                <h1 style={{ fontSize: '50px', }}>Verify Your Account</h1>
                <p style={{ fontSize: '30px', marginBottom: '20px' }}>Check your email for a verification link that we've sent you.</p>
                <a href="http://localhost:3000" style={{ textDecoration: 'none', color: 'black' }}>
                    <CIcon icon={cilArrowThickToLeft} customClassName="nav-icon" style={{ ...styles.navIcon, color: 'black', marginRight: '5px' }} />
                    Login page
                </a>
            </div>
        </div>
    );
};

const styles = {
    navIcon: {
        width: '30px',
        height: '25px',
        fontSize: '16px',
        marginRight: '5px',
    },
};

export default VerifyAccount;
