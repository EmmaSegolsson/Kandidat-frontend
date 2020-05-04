import React, { useState } from 'react';
import { Redirect, Link, Switch, Route } from 'react-router-dom'
import { logoutHandler } from './Logout';

import '../styles/home.scss';
import NewCustomer from './NewCustomer.js';
import Customers from './Customers';
import Admin from './Admin';
import Edit from './Edit';

const Home = props => {
  const [login, setLogin] = useState(true);
  const [tab, setTab] = useState(window.location.href);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirmLogout = () => {
    
    console.log("loading e ", loading)

    logoutHandler(setLogin, setLoading);
    console.log("loading e ", loading)
  }


  if(loading){
    return (
      <div id="loading">
        <div className="spinner" ></div>
      </div>
    )
  }

  return (
    login ?
    <div>
      <div className={popup ? 'confimLogoutOverlay' : 'confimLogoutOverlay hidden'} onClick={ () => setPopup(false)}>
        <div className='confimationDiv'>
          <p>Är du säker på att du vill logga ut?</p>
          <div className='buttonContainer'>
            <div id='cancelButton' className={popup ? 'confimationsButton' : 'confimationsButton hidden'} onClick={() => setPopup(false)}>
              Avbryt
            </div>
            <div className={popup ? 'confimationsButton' : 'confimationsButton hidden'} onClick={confirmLogout}>
              Logga ut
            </div>
          </div>
        </div>
      </div>

      <div className="homeContainer">
        <main>

          <div className='menuOptions'>
            <Link to={`/home`} className={tab === 'http://localhost:3000/home' ? 'tab activeTab' : 'tab'} onClick={ e=> setTab('http://localhost:3000/home')}>Din profil</Link>
            <Link to={`/home/newcustomer`} className={tab === 'http://localhost:3000/home/newcustomer' ? 'tab activeTab' : 'tab'} onClick={ e=> setTab('http://localhost:3000/home/newcustomer')}>Ny kund</Link>
            <Link to={`/home/customers`} className={tab === 'http://localhost:3000/home/customers' ? 'tab activeTab' : 'tab'} onClick={ e=> setTab('http://localhost:3000/home/customers')}>Kunder</Link>
            <div className='tab' onClick={ () => setPopup(true) } >
                <p>Logga ut</p>
            </div>
          </div>

          <div className='inputContainer'>
            <div className='rightSideContainer'>
                <Switch>
                    <Route path={`/home`} exact component={Admin} />  
                    {/* <Route path={`/home/newcustomer`} exact component={NewCustomer} loggedIn={setLogin}/> */}
                    <Route path={`/home/newcustomer`} exact render={() => <NewCustomer loggedIn={setLogin} />}/>
                    <Route path={`/home/customers`} exact component={Customers} /> 
                    <Route path={`/home/customers/:id`} exact component={Edit} />
                </Switch> 
            </div>      
          </div> 
        </main>
      </div>
    </div>
    : 
    <Redirect to="/"/>  

   /*  <div id="loading">
      <div id="loading">
        <div className="spinner">
       
        </div>
      </div>
    </div>  */

  );
}
export default Home;





