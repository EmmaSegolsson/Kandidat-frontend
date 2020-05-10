import React, { useState, useEffect } from 'react';
import '../styles/tab.scss';
import '../styles/Login.scss';
import Logo_black from '../assets/svart_logo.jpg';

import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
      <div className='tabContainer'>
        <div id='adminTab'>
          <div className='logoContainer'>
            <img className='anebyhusLogo' src={Logo_black} />
            <h2>Välkommen till startsidan {username}</h2>
          </div>
          {/* <div style={{height: '100%', width:'100%', backgroundColor: 'pink'}}>
            <div style={{display: 'inline'}}><FontAwesomeIcon icon={faHome} style={{height: 100, width:100,backgroundColor: 'yellow'}}/></div>
            <div style={{display: 'inline'}}><FontAwesomeIcon icon={faHome} style={{height: 200, width:200,backgroundColor: 'yellow'}}/></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Admin;