import React from 'react';
import {
  CNavbar,
  CContainer,
  CCollapse,
  CNavbarNav,
  CNavLink,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {cilFeaturedPlaylist,cilHouse,cilContact,cilLibraryAdd,cilWallpaper,cilArrowThickFromLeft,} from '@coreui/icons';
import {logout} from '../../services/person'

import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call your logout function
      await logout();
      localStorage.removeItem("authenticated");

      // After successful logout, redirect to the main page
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <CNavbar expand="lg" colorScheme="light" className="bg-light" style={styles.navbar}>
      <CContainer fluid style={{marginTop:'10px'}}>
       
        <CCollapse className="navbar-collapse" >
          <CNavbarNav component="nav">
            <CNavLink href="http://localhost:3000/home" active style={styles.navLink}>
            <CIcon icon={cilHouse} customClassName="nav-icon"  style={styles.navIcon} />
              Home
            </CNavLink>
            <CNavLink href="http://localhost:3000/form" style={styles.navLink}>
            <CIcon icon={cilFeaturedPlaylist} customClassName="nav-icon"  style={styles.navIcon} />
              formulaire
            </CNavLink>
        
            <CNavLink href="http://localhost:3000/info" disabled style={styles.navLink}>
            <CIcon icon={cilLibraryAdd} customClassName="nav-icon"  style={styles.navIcon} />
            learn about VT
             </CNavLink>
            {/* <CNavLink href="http://localhost:3000/map" disabled style={styles.navLink}>
            <CIcon icon={cilWallpaper} customClassName="nav-icon"  style={styles.navIcon} />
              Map
            </CNavLink> */}
            <CNavLink href="http://localhost:3000/profile" style={styles.navLink}>
            <CIcon icon={cilContact} customClassName="nav-icon"  style={styles.navIcon} />
              profile
            </CNavLink>
            <CNavLink href="#"   onClick={handleLogout}  style={styles.navLink}>
            <CIcon icon={cilArrowThickFromLeft} customClassName="nav-icon"  style={styles.navIcon} />
              Log out
            </CNavLink>

          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
};

const styles = {
  navbar: {
    width: '100%',
    border: '1px solid #ccc',
    height:"60px"
  },
  navLink: {
    margin: '0 50px',
  },
  navIcon: {
    width: '30px',
    height: '25px',
    fontSize: '16px', 
    marginRight: '5px', 
  },
 
};

export default Navbar;
