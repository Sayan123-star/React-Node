// importing axios for getting data from the database
import axios from 'axios';
// importing react, useEffect and usrState from react
import React, { useEffect, useState } from 'react'
// Importing useSelector from react-redux
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../config';
// This function is responsible to get and display the total product_price from the database of the particular loggedin user
function Totalrev() {
    const user = useSelector(state => state.UserReducer);
    const [sales, setSales] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);

    const getsales = async () => {
        //Getting the allposts data
        const resp = await axios.get(`${API_BASE_URL}/allposts`);

        if (resp.status === 200) {
            setSales(resp.data.posts);
        }
    }

    useEffect(() => {
        getsales();
    }, []);
// Adding the price of top 5 sales and displaying as the total revenue
    useEffect(() => {
        let sum = 0;
        sales.forEach(post => {
            if (post.author._id === user.user._id) {
                sum += post.product_price;
            }
        });
        setTotalRevenue(sum);
    }, [sales, user.user._id]);

    return (
        <div className="container p-5 text-center">
            {totalRevenue > 0 ?
                <h2 className='text-center mt-3 text-bg-light p-2'>TODAY'S REVENUE IS {totalRevenue}</h2> :
                <h2 className='text-center mt-3 text-bg-light p-2'>No products</h2>
            }
        </div>
    );
}

export default Totalrev;