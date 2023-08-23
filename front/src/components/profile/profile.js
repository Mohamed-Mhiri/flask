import React , { useState, useEffect } from 'react';
import './update.css'
import Navbar from '../navbar/navbar';
import { MDBCol,MDBContainer, MDBRow, MDBCard ,MDBInput,MDBCardBody} from 'mdb-react-ui-kit';
import profileImage from '../../assets/profile1.jpg';
import Sidebar from './sideBar';  
import { getPersonData  } from '../../services/person'


const UpdateProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    lastName: '',
    phone: '',
    gender: '',
    email: '',
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
                   <h2 className="text-uppercase text-center mb-5" style={{ color: '#2BAEBD', textDecoration: 'underline', textShadow: '0 2px 2px black', fontFamily: 'Courier New, monospace' }}> My  account</h2>
    
                        <p style={{ color: 'black' }}><strong>First Name:</strong> {userData.name}</p>
                        <p style={{ color: 'black' }}><strong>last Name:</strong> {userData.lastName}</p>
                        <p style={{ color: 'black' }}><strong>Age:</strong> {userData.age}</p>
                        <p style={{ color: 'black' }}><strong>Gender:</strong> {userData.gender}</p>
                        <p style={{ color: 'black' }}><strong>Phone:</strong> {userData.phone}</p>
                        <p style={{ color: 'black' }}><strong>Email:</strong> {userData.email}</p>



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
  labelStyle :{
    color: 'black', 
    marginBottom: '5px',
    fontWeight: 'bold',
  },

};

export default UpdateProfile;
