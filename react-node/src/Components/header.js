import React from 'react'
import { Container, Nav, NavLink, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link,  useNavigate } from 'react-router-dom';


function Header() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  
  const handlelogout=()=>{
    // this function  will dispatch the log out action and then redirect to login page.
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    dispath({type:"LOGIN_ERROR"})
    navigate("/login")
    
  }
    return ( 
        <Navbar expand="lg" bg="primary" data-bs-theme="dark">
      <Container>
        {/*  A simple navbar working off the Bootstrap framework. */}
        <Navbar.Brand>Sales App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* links to the respective pages */}
            
            <Link to={'/addsale'}   className='nav-link'>ADD SALES</Link>
            <Link to={'/topsale'}   className='nav-link'>TOP 5 SALES</Link>
            <Link to={'/totalrevenue'}   className='nav-link'>TODAY'S TOTAL REVENUE</Link>
            <Link to={'/login'} className='nav-link'>LOGIN</Link>
            <Link to={'/register'}  className='nav-link'>REGISTER</Link>
            <a className='nav-link' href=''  onClick={handlelogout}>LOGOUT</a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
     );
}

export default Header;