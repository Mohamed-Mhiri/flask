import React , { useState, useEffect } from 'react';
import './update.css'
import Navbar from '../navbar/navbar';
import { MDBCol,MDBContainer, MDBRow, MDBCard ,MDBInput,MDBCardBody} from 'mdb-react-ui-kit';
import profileImage from '../../assets/profile1.jpg';
import {CButton,} from '@coreui/react';
import Sidebar from './sideBar';  
import { getPersonData ,putPersonData } from '../../services/person'
import { useNavigate } from "react-router-dom";


const UpdateProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    phone: '',
    gender: '',
    email: '',
    age:''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await getPersonData();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleUpdate = async () => {
    try {
      await putPersonData(userData);
      console.log('User data updated successfully');
      navigate("/profile");
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  
 


  return (
    <div style={styles.container} >
      <div style={{ ...styles.content, }}>
        <Navbar />
         <hr></hr>
        <section className="vh-100" >
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol lg="6" className="mb-4 mb-lg-0">
                <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                  <MDBRow className="g-0">
                  <MDBCol lg="4"  className="gradient-custom text-center text-white" style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem', backgroundImage: `url(${profileImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '180px', marginBottom:'20px' }}></MDBCol>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Sidebar style={{marginTop:'100px'}} />

                  <MDBCard className='m-5 cardBodyRight' style={{width:'50%', transformStyle: 'preserve-3d', perspective: '1000px' ,  border: '1px solid black',marginTop:'10px'}}>
                    <MDBCardBody className='px-5' style={{ transform: 'translateZ(40px)', backfaceVisibility: 'hidden'}}>
                   <h2 className="text-uppercase text-center mb-5" style={{ color: 'black', textDecoration: 'underline', textShadow: '0 2px 2px black', fontFamily: 'Courier New, monospace' }}>Update my  account</h2>
                       <MDBInput wrapperClass='mb-0' size='lg' id='form1'  style={{  marginBottom: '10px'}} type='text'  value={userData.name} onChange={handleInputChange}   name='name' />
                        <MDBInput wrapperClass='mb-0' size='lg' id='form2' type='text'  style={{  marginBottom: '10px'}} value={userData.lastName} onChange={handleInputChange} name='lastName' />
                        <MDBInput wrapperClass='mb-0' size='lg' id='form2' type='number'  style={{  marginBottom: '10px'}} value={userData.age} onChange={handleInputChange} name='age' />

                        <select
                                className="form-select mb-0"
                                value={userData.gender}
                                name='gender'
                                onChange={handleInputChange}
                                style={{marginBottom: '10px', width: '23%' }}
                            >
                                <option value="" disabled style={{ fontSize: '14px' , color: '#DCDCDC'  }}>Gender</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                            </select>
                        <MDBInput wrapperClass='mb-0' size='lg' id='form3' type='tel'   style={{  marginBottom: '10px'}} value={userData.phone} onChange={handleInputChange} name='phone'/>
                        <MDBInput wrapperClass='mb-0' size='lg' id='form6' type='email' style={{  marginBottom: '10px'}} value={userData.email} onChange={handleInputChange}  name='email'/>
                        <CButton color="light" variant="outline" type="submit"  style={{ fontSize: '20px', marginTop:'20px', marginBottom:'10px' , marginLeft:'80%' }}    onClick={handleUpdate}>
                        update
                        </CButton>

               </MDBCardBody>

                </MDBCard>
                  
                   
                  </div>

                  </MDBRow>
                </MDBCard>
              </MDBCol>

            </MDBRow>


          


          </MDBContainer>
        </section>
        
   
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh', 
    width: '100vw', 
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 3,
    height: '100%', 
    padding: '20px',
  },
  navIcon: {
    width: '30px',
    height: '18px',
    fontSize: '16px', 
    marginRight: '5px', 
  },

};

export default UpdateProfile;
