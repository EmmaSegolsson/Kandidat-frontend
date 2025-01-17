import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../styles/tab.scss';
import users from '../assets/users.svg';
import pen from '../assets/pen.png';

const Customers = props => { 

  const [data, setData] = useState([]);
  
  //fetch all users
  useEffect(() => {
    fetch("https://kandidat-test.herokuapp.com/edit/", {
      method: "GET",
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        setData(responseData.users);
      })
  }, []);
  

  const displayCustomers = () => {
    return data.map((customer, index) => {
      const { user_id, username } = customer //destructuring
      return (
        // <tr key={id} onClick={handleClick}>
        <Link to={`/home/customers/${user_id}`} key={index}>
          <li onClick={handleClick}>
            <div className='List'>
              <div className='id'>
                {user_id}
              </div> 
              <div className='username'>
                {username} 
              </div>
              <div>
                <img src={pen} className='penImage'/>
              </div>
            </div> 
          </li>
        </Link>
        // </tr>
      )
   })
  }

  const handleClick = (props) => {
    console.log("hej");   
  }


  return (
    data ?
    <div>
      <div className='tabContainer'>
        <div id='customersTab'>

          <div className='customersLogo'>
            <img src={users} className='userLogo' />
          </div>

          <div className='tableHeader'>
            <h4 className='heaederID'>ID</h4>
            <h4 className='headerName'>Namn</h4>
            <img src={pen} />
          </div>

          <div id='customerContainer'>
            <div className='customer'>
              <ul id='students'>
                {displayCustomers()}
              </ul>
            </div>
          </div>

        </div>
      </div>  
  </div>
  :
  <h3>Du måste logga in för att se dina använadare!</h3>
  );
};

export default Customers; 