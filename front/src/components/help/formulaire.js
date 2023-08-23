import React, { useState } from 'react';
import './formule.css';
import {
  CButton,
  CForm,
  CFormInput,
  CAlert,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {cilCaretRight,cilMoodVeryGood,cilMoodBad} from '@coreui/icons';
import { result } from '../../services/health';

const HealthForm = ({ onSubmit }) => {
  const [iconName, setIconName] = useState('');
  const [healthData, setHealthData] = useState({
    id: '',
    personId: '',
    heartRate: '',
    systolicBloodPressure: '',
    diastolicBloodPressure: '',
    bloodSugar: '',
    ckmb: '',
    troponin1: '',
    troponin2: '',
    result: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setHealthData({ ...healthData, [name]: value });
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const r = await result(healthData);
      console.log(r)
      const resultValue = parseInt(r.split(":")[1].trim());
      

      if (resultValue === 0) {
        setIconName(cilMoodVeryGood)
        setNotificationMessage("You're radiating good health, like a morning's bright glow.");

      } else if (resultValue === 1) {
        setIconName(cilMoodBad)
        setNotificationMessage("Consider a health checkup for your continued well-being");
      } else {
        setNotificationMessage("Unknown response");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setNotificationMessage("An error occurred");
    }
  };

  const [notificationMessage, setNotificationMessage] = useState("");


  return (
    <>
    <div style={styles.centeredCard}>
      <div className="background-image">
        <CForm className="w-75">
        <div style={{ fontFamily: 'Cairo, sans-serif' }}>
            <h2 style={{ color: 'black', fontFamily: 'Courier New, monospace' }}>
              Please fill this to assist you:
            </h2>
          </div>

          <div className="form-group">
            <CFormInput
              type="text"
              size="lg"
              placeholder="Heart Rate"
              name="heartRate"
              value={healthData.heartRate}
              onChange={handleChange}
              style={{ ...styles.input, marginBottom: '10px'}}
            />
          </div>
          <div className="form-group">
            <CFormInput
              type="text"
              size="lg"
              placeholder="Systolic Blood Pressure"
              name="systolicBloodPressure"
              value={healthData.systolicBloodPressure}
              onChange={handleChange}
              style={{ ...styles.input, marginBottom: '10px'}}
            />
          </div>
          <div className="form-group">
            <CFormInput
              type="text"
              size="lg"
              placeholder="diastolic Blood Pressure"
              name="diastolicBloodPressure"
              value={healthData.diastolicBloodPressure}
              onChange={handleChange}
              style={{ ...styles.input, marginBottom: '10px'}}
            />
          </div>
          <div className="form-group">
            <CFormInput
              type="text"
              size="lg"
              placeholder="blood Sugar"
              name="bloodSugar"
              value={healthData.bloodSugar}
              onChange={handleChange}
              style={{ ...styles.input, marginBottom: '10px'}}
            />
          </div>
          <div className="form-group">
            <CFormInput
              type="text"
              size="lg"
              placeholder="ck-mb"
              name="ckmb"
              value={healthData.ckmb}
              onChange={handleChange}
              style={{ ...styles.input, marginBottom: '10px'}}
            />
          </div>
          <div className="form-group">
            <CFormInput
              type="text"
              size="lg"
              placeholder="troponin 1"
              name="troponin1"
              value={healthData.troponin1}
              onChange={handleChange}
              style={{ ...styles.input, marginBottom: '10px'}}
            />
          </div>
          <div className="form-group">
            <CFormInput
              type="text"
              size="lg"
              placeholder="troponin 2"
              name="troponin2"
              value={healthData.troponin2}
              onChange={handleChange}
              style={{ ...styles.input, marginBottom: '10px'}}
            />
          </div>
          

          <div className="form-group" style={{ ...styles.formGroup, marginLeft: '500px' }}>
            <CButton color="light" variant="outline" type="submit" onClick={handleSubmit} style={{ fontSize: '25px', marginTop:'20px' }}>
              <CIcon icon={cilCaretRight} customClassName="nav-icon" style={styles.navIcon} />
              Result
            </CButton>
          </div>
        </CForm>
        {notificationMessage && (
        <div id="notification" style={{ color: "black" }}>
          <CAlert color="warning" style={{ fontSize: '20px', marginTop: '25px' }}>
            <CIcon icon={iconName} customClassName="nav-icon" style={styles.navIcon} /> {notificationMessage}
          </CAlert>
        </div>
      )}
      </div>
    </div>
   
    </>
  );
};

const styles = {
  centeredCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  input: {
    width: '30%', 
    padding: '12px', 
    borderRadius: '5px', 
    border: '1px solid #ccc', 
  },
  formGroup: {
    textAlign: 'center',
  },
  navIcon: {
    width: '30px',
    height: '25px',
    fontSize: '16px', 
    marginRight: '5px', 
  },
};

export default HealthForm;
