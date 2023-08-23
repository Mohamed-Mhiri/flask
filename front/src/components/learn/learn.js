import React from 'react';
import './learn.css';
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CContainer,
  CCol,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {cilChevronCircleRightAlt } from '@coreui/icons';
import Navbar from '../navbar/navbar';

const HomePage = () => {
  return (
    <div style={styles.container}  >
      <div style={styles.content}>
        <Navbar />

        <div >

        <CContainer   >
        <CRow  className="d-flex cennter backgroundimage">
        <CCol xs={12} md={6} className="text-center custom-card1" >
            <CCard className="text-center custom-card1 " >
              <CCardBody>
                  <CCardTitle style={{ color: '#008B8B', textDecoration: 'underline', textShadow: '0 2px 2px #008B8B',fontSize:'30px' }}>
                      <CIcon icon={cilChevronCircleRightAlt} customClassName="nav-icon"  style={styles.navIcon} />
                      What is Venous Thrombosis?
                  </CCardTitle>
                  <CCardText style={{border:' 2px solid black' ,fontSize:'18px'}}>
                      Venous thrombosis refers to the formation of a blood clot (thrombus) within a vein. It most commonly occurs in the deep veins of the legs, a condition known as deep vein thrombosis (DVT), but can also occur in other parts of the body. Venous thrombosis is a serious medical condition that requires prompt diagnosis and treatment.                
                  </CCardText>
                  <CCardTitle style={{ color: '#008B8B', textDecoration: 'underline', textShadow: '0 2px 2px #008B8B' ,fontSize:'30px'}}>
                      <CIcon icon={cilChevronCircleRightAlt} customClassName="nav-icon"  style={styles.navIcon} />
                      Preventing
                  </CCardTitle>
                  <CCardText style={{border:' 2px solid black',fontSize:'18px'}}>
                  To prevent Venous Thrombosis, maintain an active lifestyle with regular exercise, particularly after prolonged periods of sitting or bed rest. Elevate your legs when possible, wear graduated compression stockings, and stay hydrated. Manage a healthy weight, avoid prolonged immobility, and follow any prescribed anticoagulant medications diligently. Additionally, quit smoking, manage chronic conditions, and consult your healthcare provider for personalized advice based on your risk factors.               
                   </CCardText>
                   <CCardTitle style={{ color: '#008B8B', textDecoration: 'underline', textShadow: '0 2px 2px #008B8B',fontSize:'30px' }}>
                      <CIcon icon={cilChevronCircleRightAlt} customClassName="nav-icon"  style={styles.navIcon} />
                      Symptoms
                  </CCardTitle>
                  <CCardText style={{border:' 2px solid black' ,fontSize:'18px', width:'60%' , margin: '0 auto'}}>
                  <ul>
                      <li>Pain, often cramping or aching</li>
                      <li>Noticeable swelling in the affected leg or region</li>
                      <li>Skin warmth and redness</li>
                      <li>Tenderness when touched or pressed</li>
                      <li>Visibly enlarged veins close to the skin's surface</li>
                      <li>Feelings of leg fatigue or heaviness</li>
                    </ul>                    
                   </CCardText>
                   <CCardTitle style={{ color: '#008B8B', textDecoration: 'underline', textShadow: '0 2px 2px #008B8B' ,fontSize:'30px'}}>
                      <CIcon icon={cilChevronCircleRightAlt} customClassName="nav-icon"  style={styles.navIcon} />
                      For more informations click here to watch
                  </CCardTitle>
                   <CCardText style={{border:' 2px solid black' ,fontSize:'18px', width:'60%' , margin: '0 auto'}}>
                   <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/QTuN60hgL5Y"
                    title="YouTube Video"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>       
                   </CCardText>
                   

              </CCardBody>

            </CCard>
          </CCol>
         

        </CRow>
          </CContainer>

        </div>
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
    height: '25px',
    fontSize: '16px', 
    marginRight: '5px', 
  },
};
export default HomePage;
