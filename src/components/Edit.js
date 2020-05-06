import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import userLogo from '../assets/user.svg';
import '../styles/tab.scss';

const Edit = props => { 

  console.log("props match e: ", props.match.params.id); 
    
  const [user, setUser] = useState([]);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [popup, setPopup] = useState(false);
  const [houseName, setHouseName] = useState("");
  const [houseImage, setHouseImage] = useState("");
  const [houseModel, setHouseModel] = useState("");
  
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

  const addModel  = () => {
    document.getElementById("houseName").value = ""; 
    document.getElementById("houseImage").value = "";
    document.getElementById("houseModel").value = "";
  }

 return (
  
  <div>
    <div className={popup ? 'confirmLogoutOverlayDelete' : 'confirmLogoutOverlayDelete hidden'} onClick={ () => setPopup(false)}>
        <div className='confirmationDiv'>
          <p>Är du säker på att du vill radera {user.username}?</p>
          <div className='buttonContainer'>
            <div id='cancelButton' className={popup ? 'confirmationsButton' : 'confirmationsButton hidden'} onClick={() => setPopup(false)}>
              Avbryt
            </div>
            <div className={popup ? 'confirmationsButton' : 'confirmationsButton hidden'} onClick={confirmDelete}>
              Radera
            </div>
          </div>
        </div>
      </div>

    <div className='tabContainer'>
      <div className='editBody'>

        {/* Header */}
        <div className='editHeader'>
          <div className='userInfo' >
            <p style={{paddingBottom: 10}}>{user.user_id}</p>
            <p>{user.username}</p>
          </div>
          <img src={userLogo} className='userImage' />
        </div>

        {/* Inoutfields */}
        <div className='textFields'>
          <div className='changePassword'>
            <form className='editForm'>
              <input className='inputDefault'
                type="password"
                id="changepassword"
                placeholder="Nytt lösenord*"
                onChange={e => setNewPass(e.target.value)}
              />
              <input className='inputDefault'
                type="password"
                id="confirmchangepassword"
                placeholder="Bekräfta lösenord*"
                onChange={e => setConfirmPass(e.target.value)}
              />
              <div id='changePasswordButton' onClick={ () => changePass() }>
                Byt lösenord
              </div> 
            </form>
          </div>

          <div className='addBlueprint'>
            <form className='editForm'>
              <input className='inputDefault'
                placeholder='Husnamn*'
                type="text"
                id="houseName"
                onChange={e => setHouseName(e.target.value)}
              />
              <input className='inputDefault'
                placeholder='Bildmodell på huset'
                type="text"
                id="houseImage"
                onChange={e => setHouseImage(e.target.value)}
              />
              <input className='inputDefault'
                placeholder='Länk till husritning*'
                type="text"
                id="houseModel"
                onChange={e => setHouseModel(e.target.value)}
              />

              <div id='changePasswordButton' onClick={ () => addModel() }>
                Addera husmodell
              </div> 
            </form>
          </div>
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


