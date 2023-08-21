import React from 'react';
import './home.css';

import Navbar from '../navbar/navbar';
import HomeImage2 from '../../assets/helpme.jpg';

const HomePage = () => {
  return (
    <div style={styles.container}  >
      <div style={styles.content}>
        <Navbar />

        <div style={{ marginTop: '20px' }}>

                <div className="home-page">
              <main>
              <img src={HomeImage2} alt="Home 3"  className='img'/> 

              </main>
            
                </div>

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
