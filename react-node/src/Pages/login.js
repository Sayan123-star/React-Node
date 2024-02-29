import axios from 'axios';
import React, { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
    // After the form submission code for redirecting to the login page
    const navigate = useNavigate();
    const handleLog = (event)=>{
        event.preventDefault();
        setLoading(true);
        // posting the email and password and checkin if  it is valid or not, if  yes then go to dashboard otherwise show error message
        const requestData = {email: email, password: password}
        axios.post(`${API_BASE_URL}/login`, requestData)
        .then((result)=>{
          if(result.status===200){
            setLoading(false);
            //  Save token amd the user detils in local storage and Redux store
            localStorage.setItem("token", result.data.result.token)
            localStorage.setItem("user", JSON.stringify(result.data.result.user));
            dispatch({type:"LOGIN_SUCCESS", payload: result.data.result.user});
            setLoading(false);
            //  Redirect to dashboard after successful login
            Swal.fire({
              icon:'success',
              title: 'User logged in successfully'
            })
            navigate('/topsale');
          }
          setEmail('');
          setPassword('')
        })
        .catch((error)=>{
          console.log(error);
          setLoading(false);
          //  If any error occured then show it on sweet alert
          Swal.fire({
            icon: 'error',
            title: error.response.data.error
          })
        })}

  return (
    <div className="container">
        <h3 className='text-center mt-3 text-bg-light p-2'>Login Form</h3>
        {/* Creating  a login form  using react bootstrap. */}
        { loading ?
    <Spinner animation="border" variant="primary" style={{marginLeft:"550px"}} role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>:""}
    <Form className='mt-4' onSubmit={handleLog}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
         {/* Sending the email and password data to the backend */}
        <Form.Control type="email" value={email} onChange={(ev)=> setEmail(ev.target.value)} placeholder="Enter your email id" />
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
      <Button variant="primary" type='submit' size="lg">
        Submit
      </Button></div>
    </Form>
    </div>
  );
}

export default Login;