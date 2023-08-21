import React from 'react';
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CButton,
} from '@coreui/react';
import { useNavigate } from "react-router-dom";
import CIcon from '@coreui/icons-react';
import {cilPencil, cilUserUnfollow ,cilExcerpt} from '@coreui/icons';
import { Link } from 'react-router-dom';
import{deletePersonData,logout} from '../../services/person'

const Sidebar = () => {

  const navigate = useNavigate();
  const handleDeleteAccount = async () => {
    try {
      await deletePersonData();
      await logout();
      console.log('Account deleted successfully');
      navigate("/");
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };
  return (
    <CSidebar style={{ backgroundColor: '#2BAEBD', width: '250px' }}>
      <CSidebarBrand style={{marginTop:'20px', fontSize:'30px' , marginBottom:'45px'}}>  <strong>Account setting</strong></CSidebarBrand>
      <CSidebarNav style={{ marginRight:'30px'}}> 
      <Link to="/profile">
          <CButton color="light" variant="outline" type="submit" style={{ fontSize: '22px', marginBottom: '20px' }}>
            <CIcon customClassName="nav-icon" icon={cilExcerpt} style={styles.navIcon} />
            show my informations
          </CButton>
        </Link>
        <Link to="/Updateprofile">
        <CButton color="light" variant="outline" type="submit" style={{ fontSize: '22px' , marginBottom:'20px '}}>
              <CIcon customClassName="nav-icon" icon={cilPencil}  style={styles.navIcon} />
              Upadte my profile
        </CButton>
        </Link>

        <CButton color="light" variant="outline" type="submit" style={{ fontSize: '22px' , marginBottom:'20px '}} onClick={handleDeleteAccount}>
              <CIcon customClassName="nav-icon" icon={cilUserUnfollow}  style={styles.navIcon} />
              delete my account 
        </CButton>
      </CSidebarNav>
    </CSidebar>
  );
};

const styles = {

  navIcon: {
    width: '30px',
    height: '18px',
    fontSize: '16px', 
    marginRight: '5px', 
  },

};
export default Sidebar;
