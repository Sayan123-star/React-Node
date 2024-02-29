import axios from 'axios';
import React, { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
// Importing userNavigate from react-router-dom  to navigate between pages.
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
// Importing Swal from sweetalert2 to show stylish alerts
import Swal from 'sweetalert2';
function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

    // After the form submission code for redirecting to the login page
    const navigate = useNavigate();
    const handleClick = (event)=>{
        event.preventDefault();
        setLoading(true);
        // Posting data in the frontend and pasing them to the backend to store into the dtabase
        const requestData = {firstname: firstname, lastname: lastname, email: email, password: password}
        axios.post(`${API_BASE_URL}/register`, requestData)
        .then((result)=>{
          if(result){
            setLoading(false);
            //  Showing a successfull message using SweetAlert2
            Swal.fire({
              icon:'success',
              title: 'User registered successfully'
            })
            navigate('/login');
          }
          setFirstname('');
          setLastname('');
          setEmail('');
          setPassword('')
        })
        .catch((error)=>{
          console.log(error);
          
          setLoading(false);
          // If there is an error showing it to the user using SweetAlert2
          Swal.fire({
            icon: 'error',
            title: error.response.data.error
          })
        })
    }
  return (

    <div className="container">
        <h3 className='text-center mt-3 text-bg-light p-2'>Registration Form</h3>
        {/* Creating a register form */}
    { loading ?
    <Spinner animation="border" variant="primary" style={{marginLeft:"550px"}} role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>:""}
    <Form className='mt-4' onSubmit={handleClick}>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      {/* Adding validation for empty fields using react-bootstrap and validator library*/}
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" value={firstname} onChange={(ev)=>setFirstname(ev.target.value)} placeholder="Enter your First name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="Last name" value={lastname} onChange={(ev)=>setLastname(ev.target.value)} placeholder="Enter your Last name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" value={email} onChange={(ev)=>setEmail(ev.target.value)} placeholder="Enter your email id" />
      </Form.Group>
      <Form.Group className="mb-3">
      <Form.Label htmlFor="inputPassword5">Password</Form.Label>
      <Form.Control
        type="password"
        id="inputPassword5"
        aria-describedby="passwordHelpBlock" value={password} onChange={(ev)=>setPassword(ev.target.value)} placeholder='Enter your password'
      />
      </Form.Group>
      <div className="d-grid">
      <Button variant="primary" size="lg" type='Submit'>
        Submit
      </Button></div>
    </Form>
    </div>
  );
}

export default Register;