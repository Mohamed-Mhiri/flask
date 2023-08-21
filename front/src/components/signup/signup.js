import React , { useState } from 'react';
import './signup.css';
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBCheckbox, MDBBtn } from 'mdb-react-ui-kit';
import { register } from '../../services/person'; 
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CIcon from '@coreui/icons-react';
import {cilArrowThickToLeft,} from '@coreui/icons';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
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
    
        // Si les mots de passe correspondent, continuer avec l'enregistrement
        setPasswordError('');

        if (!email.includes('@')) {
        setEmailError("Invalid email format");
        return;
      }
      setEmailError('');

      // Vérification du téléphone
      if (phone.length !== 8 || isNaN(phone)) {
        setPhoneError("Invalid phone number format");
        return;
      }
      setPhoneError('');
    
      const registrationResponse = await register(name, lastName, phone, age, gender, email, password);
        if (registrationResponse === 'Cet utilisateur existe déjà avec cet email') {
          setEmailError('This user already exists with this email');
          return;
        }
        navigate("/verify");
    
      } catch (error) {
        console.error(error);
      }
    };
    
  return (
    <MDBContainer fluid className='bg-image d-flex align-items-center justify-content-center' >
      <MDBCard className='m-5 cardBodyRight' style={{ maxWidth: '600px', transformStyle: 'preserve-3d', perspective: '1000px' ,  border: '2px solid black',}}>
        <MDBCardBody className='px-5' style={{ transform: 'translateZ(40px)', backfaceVisibility: 'hidden'}}>
          <h2 className="text-uppercase text-center mb-5" style={{ color: 'black', fontFamily: 'Courier New, monospace' }}>Create your account</h2>

          <div className="d-flex mb-4">
            <MDBInput wrapperClass='mb-0' size='lg' id='form1'  style={{ ...styles.input, marginBottom: '10px'}} type='text'  placeholder='Name'   onChange={(e) => setName(e.target.value)} />
            <MDBInput wrapperClass='mb-0' size='lg' id='form2' type='text'  placeholder='Last Name'  style={{ ...styles.input, marginBottom: '10px'}}  onChange={(e) => setLastName(e.target.value)}/>
            <MDBInput wrapperClass='mb-0' size='lg' id='form3' type='tel'  placeholder='Phone'  style={{ ...styles.input, marginBottom: '10px'}}  onChange={(e) => setPhone(e.target.value)}/>
            {phoneError && <div className="error-message">{phoneError}</div>}
            <MDBInput wrapperClass='mb-0' size='lg' id='form4' type='number'  placeholder='Age' style={{ ...styles.input, marginBottom: '10px'}}  onChange={(e) => setAge(e.target.value)}/>

              <select
                className="form-select mb-0"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                style={{...styles.input, marginBottom: '10px', width: '33%' }}
              >
                <option value="" disabled style={{ fontSize: '14px' , color: '#DCDCDC'  }}>Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>


            <MDBInput wrapperClass='mb-0' size='lg' id='form6' type='email' placeholder='Email' style={{ ...styles.input, marginBottom: '10px'}} onChange={(e) => setEmail(e.target.value)}/>
            {emailError && <div className="error-message">{emailError}</div>}
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
        <a href="http://localhost:3000" style={{ textDecoration: 'none' }}>
              <CIcon icon={cilArrowThickToLeft} customClassName="nav-icon" style={{ ...styles.navIcon, color: 'black', marginTop: '40px', cursor: 'pointer' }} />
            </a>
        {/* <MDBBtn className='mb-4 w-100 gradient-custom-4'  onClick={handleRegister} style={{ fontSize: '25px' , marginBottom: '20px' , marginTop:'10px', marginLeft:'400px'}}>Register</MDBBtn> */}
        <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRegister}
                style={{ fontSize: '15px' , marginBottom: '20px' , marginTop:'10px', marginLeft:'400px'}}
              >
                Sign Up
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
export default RegistrationForm;
