import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
function Footer() {
    const dispath = useDispatch();
  const navigate = useNavigate();
  
  const handlelogout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    dispath({type:"LOGIN_ERROR"})
    navigate("/login")
    
  }
    return ( 
        <div className=" container-fluid mt-3 text-bg-dark">
            <div className="row text-center">
                {/* the footer with the links to the pages */}
            <div className="col">
            <Link to={'/addsale'} className='nav-link p-3 d-block'>ADD SALES</Link>
            </div>
            <div className="col">
            <Link to={'/addsale'} className='nav-link p-3 d-block'>ADD SALES</Link>
            <Link to={'/topsale'} className='nav-link p-3 d-block'>TOP 5 SALES</Link>
            <Link to={'/totalrevenue'} className='nav-link p-3 d-block'>TODAY'S TOTAL REVENUE</Link>
            </div>
            <div className="col">
            <Link to={'/login'} className='nav-link p-3 d-block'>LOGIN</Link>
            <Link to={'/register'} className='nav-link p-3 d-block'>REGISTER</Link>
            <a href='' onClick={handlelogout} className='nav-link p-3 d-block'>LOGOUT</a>
            </div>
            </div>
        </div>
     );
}

export default Footer;