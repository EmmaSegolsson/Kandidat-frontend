import React, { useState, useEffect } from 'react';
import '../styles/tab.scss';
import '../styles/Login.scss';
import Logo_black from '../assets/svart_logo.jpg';

const Admin = props => { 

  const [username, setUsername] = useState("");
  
  useEffect(() => {
    fetch("https://kandidat-test.herokuapp.com/home", {
      method: "GET",
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setUsername(data.username);
      })
  }, []);

  return (
    <div>
      <div className='tabContainer' >
        <div id='adminTab'>
          <div className='logoContainer'>
            <img className='anebyhusLogo' src={Logo_black} />
            <h2>Välkommen till startsidan {username}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;