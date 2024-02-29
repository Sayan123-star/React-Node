import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Addsale() {
  const user = useSelector(state=> state.UserReducer)
const navigate = useNavigate()
  const [Product_name, setPname] = useState("");
  const [Product_quantity, setPquan] = useState();
  const [Product_price, setPamt] = useState();
  // inserting the headers  for authentication purpose 
  const CONFIG_OB = {
    headers: { "Content-Type": "application/json",  Authorization : `Bearer ${localStorage.getItem('token')}` }
    
  }

const handlecreatepost= async()=>{
  if(Product_name==""){
    Swal.fire({
      icon:'error',
      title: 'Product name is mandatory!'
    })
  }
  if(Product_quantity==null){
    Swal.fire({
      icon:'error',
      title: 'Product quantity is mandatory!'
    })
  }
  if(Product_price==null){
    Swal.fire({
      icon:'error',
      title: 'Product price is mandatory!'
    })
  }
  // Posting the product details in the database through axios by the middleware
  const data = {product_name: Product_name, product_quantity: Product_quantity, product_price: Product_price}
  console.log(data)
  const postre = await axios.post(`${API_BASE_URL}/createpost`, data, CONFIG_OB)
  //  Redirecting to topsale page after creating a new sale/transaction
    if(postre.status==201){
      navigate("/topsale")
    }
    //  Showing alert message when there are some error while creating a new transaction
  else{
    Swal.fire({
      icon: 'error',
      title: "Error occured"
    })
  }
}



  return (
    <div className="container">
        <h3 className='text-center mt-3 text-bg-light p-2'>ADD SALE ENTRY FOR {user.user._id}</h3>
        {/* Form for the addtion of the sales */}
    <Form className='mt-4'>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" onChange={(ev)=>setPname(ev.target.value)} placeholder="Enter the product name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Quantity</Form.Label>
        <Form.Control type="text" onChange={(ev)=>setPquan(ev.target.value)} placeholder="Enter the quantity" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Amount</Form.Label>
        <Form.Control type="text" onChange={(ev)=>setPamt(ev.target.value)} placeholder="Enter the amount of the product" />
      </Form.Group>
      <div className="d-grid">
      <Button variant="primary"  onClick={handlecreatepost} size="lg">
        Submit
      </Button></div>
    </Form>
    </div>
  );
}

export default Addsale;