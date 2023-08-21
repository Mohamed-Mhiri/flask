import React from 'react';
import HealthForm from './formulaire';
import Navbar  from '../navbar/navbar'; 

const HelpPage = () => {
 

  const handleSubmit = (healthData) => {
    console.log(healthData);
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <Navbar />

        {/* Add some margin to separate the components */}
        <div style={{ marginTop: '20px' }}>
          <HealthForm onSubmit={handleSubmit} />
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
};

export default HelpPage;





