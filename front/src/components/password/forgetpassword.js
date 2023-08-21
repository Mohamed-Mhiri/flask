import React , { useState } from 'react';
import './forgetpassword.css';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CIcon from '@coreui/icons-react';
import {cilArrowThickToLeft,} from '@coreui/icons';
import { resetPassword } from '../../services/person'; // Import the new function


const Password1 = () => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
    const handleRegister = async () => {
      try {
        // Vérification du mot de passe
        if (password !== confirmPassword) {
          setPasswordError("Passwords do not match");
          return;
        }
        
        // Réinitialisation du mot de passe
        await resetPassword(email, password);
  
        setPasswordError('');
  
        navigate("/"); 
  
      } catch (error) {
        console.error(error);
      }
    };
    
  return (
    <MDBContainer fluid className='bg-image d-flex align-items-center justify-content-center' >
      <MDBCard className='m-5 cardBodyRight' style={{ maxWidth: '600px', transformStyle: 'preserve-3d', perspective: '1000px' ,  border: '2px solid black',}}>
        <MDBCardBody className='px-5' style={{ transform: 'translateZ(40px)', backfaceVisibility: 'hidden'}}>
          <h2 className="text-uppercase text-center mb-5" style={{ color: 'black', fontFamily: 'Courier New, monospace' }}>Reset your password please</h2>

          <div className="d-flex mb-4">
          <MDBInput wrapperClass='mb-0' size='lg' id='form6' type='email' placeholder='Email' style={{ ...styles.input, marginBottom: '10px'}} onChange={(e) => setEmail(e.target.value)}/>
            <MDBInput wrapperClass='mb-0' size='lg' id='form7' type='password' placeholder='Password' style={{ ...styles.input, marginBottom: '10px'}} onChange={(e) => setPassword(e.target.value)}/>
            <MDBInput wrapperClass='mb-0' size='lg' id='form8' type='password' placeholder='Repeat your password' style={{ ...styles.input, marginBottom: '10px'}} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
          {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}

          <div className='d-flex flex-row justify-content-center mb-4'  style={{ color: 'black'}} >
            <MDBCheckbox name='flexCheck' id='flexCheckDefault'label='I agree to all statements in the Terms of Service' />
          </div>
        </MDBCardBody>
        <a href="http://localhost:3000/" style={{ textDecoration: 'none' }}>
              <CIcon icon={cilArrowThickToLeft} customClassName="nav-icon" style={{ ...styles.navIcon, color: 'black', marginTop: '40px', cursor: 'pointer' }} />
            </a>
        <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRegister}
                style={{ fontSize: '15px' , marginBottom: '20px' , marginTop:'10px', marginLeft:'400px'}}
              >
                okk
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
export default Password1;
