import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom'
import '../styles/tab.scss';

const Edit = props => { 

  console.log("props match e: ", props.match.params.id); 
    
  const [user, setUser] = useState([]);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [popup, setPopup] = useState(false);
  
  useEffect(() => {
    fetch('https://kandidat-test.herokuapp.com/edit/' + '?id=' + props.match.params.id, {
      method: "GET",
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setUser(data.userdata);
      })
  }, []);  

  const confirmDelete = () => {
   fetch('https://kandidat-test.herokuapp.com/edit/' + '?id=' + props.match.params.id, {
      method: "DELETE",
      credentials: "include"
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        props.history.push('/home/customers'); //funkar detta?
      }) 
  }
  
  const changePass = () => {

    if(newPass !== confirmPass){
      document.getElementById("changepassword").value = ""; 
      document.getElementById("confirmchangepassword").value = "";
      return console.log("fälten stämmer inte överens");
    }

    fetch('https://kandidat-test.herokuapp.com/edit/' + '?id=' + props.match.params.id, { 
      method: "PATCH",
      credentials: "include",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({password: newPass})
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        setNewPass(responseData.updatedData);
        console.log("update user went GREAT!")
      })
  }

 return (
  
  <div>
    <div className={popup ? 'confirmLogoutOverlayDelete' : 'confirmLogoutOverlayDelete hidden'} onClick={ () => setPopup(false)}>
        <div className='confirmationDiv'>
          <p>Are you sure you want to log out?</p>
          <div className='buttonContainer'>
            <div id='cancelButton' className={popup ? 'confirmationsButton' : 'confirmationsButton hidden'} onClick={() => setPopup(false)}>
              Cancel
            </div>
            <div className={popup ? 'confirmationsButton' : 'confirmationsButton hidden'} onClick={confirmDelete}>
              Delete
            </div>
          </div>
        </div>
      </div>

    <div className='tabContainer'>
      <div id='customersTab'>

        <div className='manageDiv'>
          <h1 style={{padding:20, textAlign: 'center'}}>Hantera användare: {user.username}</h1>
            <form className='credentials'>

              <div className='textInput'>
                <label htmlFor="password"></label>
                  <input className='passwordInput'
                    type="password"
                    id="changepassword"
                    placeholder="Nytt lösenord"
                    onChange={e => setNewPass(e.target.value)}
                  />
              </div>

             <div className='textInput' >
                <label htmlFor="password"></label>
                  <input className='passwordInput'
                    type="password"
                    id="confirmchangepassword"
                    placeholder="Bekräfta lösenord"
                    onChange={e => setConfirmPass(e.target.value)}
                  />
              </div> 
              <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                <div id='changePassword' className='borderButton' onClick={ () => changePass() }>
                  Byt lösenord
                </div> 
              </div>
              

              <div className='textInput' >
                <label htmlFor="password"></label>
                  <input className='usernameInput'
                    type="html"
                    name="changepassword"
                    placeholder="Addera personlig ritning"
                  />
              </div>
              <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                <div id='changePassword' className='borderButton' onClick={ () => changePass() }>
                  Addera ritning
                </div> 
              </div>
            </form>
        </div>

        <div className='buttonContainer'>
          <Link to={'/home/customers'}>
            <div className='borderButton'>
              Gå tillbaka
            </div>
          </Link>
          <div className='deleteButton' onClick={ () => setPopup(true) }>
            Radera kund
          </div>
        </div>
        
      </div>
    </div>  
  </div>
  );
};
 
export default Edit; 