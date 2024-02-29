import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { API_BASE_URL } from '../config';
import { useSelector } from 'react-redux';
function Topsale() {
  // getting the user from user reducer
  const user = useSelector(state=> state.UserReducer)
  const [sales, setSales] = useState([]);
  // This function is responsible to display the top 5 added product by the logged in user
  const getsales = async()=>{
    const resp = await axios.get(`${API_BASE_URL}/allposts`);
    
    if(resp.status==200){
      setSales(resp.data.posts)
    }
  }
  let i=0;
  useEffect(()=>{
    getsales();
  }, [])
    return ( 
        <div className="container">
            {/* Code for showing  a dummy table page of top sales */}
            <h3 className='text-center mt-3 text-bg-light p-2'>ADD SALE ENTRYTOP 5 SALES</h3>
        <Table className='mt-4' striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Sales Id</th>
          <th>Product name</th>
          <th>Quantity</th>
          <th>Sale Amount</th>
        </tr>
      </thead>
      <tbody>
        {
          // map through the data and display it in the tabular form
        sales.map((post)=>{
          i++;
            return(
            post.author._id == user.user._id ?
            <tr>
            <td>{i}</td>
            <td >{post._id}</td>
            <td>{post.product_name}</td>
            <td>{post.product_quantity}</td>
            <td>{post.product_price}</td>
          </tr>:""
          
          )})}
      </tbody>
    </Table>
    </div>
     );
}

export default Topsale;