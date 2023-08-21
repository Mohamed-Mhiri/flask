import React, { useState } from 'react';
import './forgetpassword.css';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import Button from '@mui/material/Button';
import CIcon from '@coreui/icons-react';
import { cilArrowThickToLeft } from '@coreui/icons';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from '../../services/person'; 


const PasswordHelp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleHelpRequest = async () => {
    try {
      // Send the password reset email request
      await sendPasswordResetEmail(email);

      // Navigate back to the home page
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MDBContainer fluid className='bg-image d-flex align-items-center justify-content-center'>
      <MDBCard className='m-5 cardBodyRight' style={{ maxWidth: '600px', transformStyle: 'preserve-3d', perspective: '1000px', border: '2px solid black' }}>
        <MDBCardBody className='px-5' style={{ transform: 'translateZ(40px)', backfaceVisibility: 'hidden' }}>
          <h2 className='text-uppercase text-center mb-5' style={{ color: 'black', fontFamily: 'Courier New, monospace' }}>
            Write your email to request help
          </h2>

          <div className='d-flex mb-4'>
            <MDBInput wrapperClass='mb-0' size='lg' id='form6' type='email' placeholder='Email' style={{ ...styles.input, marginBottom: '10px' }} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className='d-flex flex-row justify-content-center mb-4' style={{ color: 'black' }}>
            {/* Additional input fields or checkboxes can be added here if needed */}
          </div>
        </MDBCardBody>
        <a href='http://localhost:3000/' style={{ textDecoration: 'none' }}>
          <CIcon icon={cilArrowThickToLeft} customClassName='nav-icon' style={{ ...styles.navIcon, color: 'black', marginTop: '40px', cursor: 'pointer' }} />
        </a>
        <Button
          type='submit'
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          onClick={handleHelpRequest}
          style={{ fontSize: '15px', marginBottom: '20px', marginTop: '10px', marginLeft: '400px' }}
        >
          Request Help
        </Button>
      </MDBCard>
    </MDBContainer>
  );
};

const styles = {
  input: {
    width: '30%',
    padding: '7px',
  },
  navIcon: {
    width: '30px',
    height: '25px',
    fontSize: '16px',
    marginRight: '5px',
  },
};

export default PasswordHelp;
