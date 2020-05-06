import React, { Component } from 'react';
import '../styles/tab.scss';
import user from '../assets/user.svg';
import createdLogo from '../assets/success.png';

class NewCustomer extends Component { 


  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      username: "",
      password: "",
      stringTest: "",
      error: null,

      time: 0,
      isOn: false,
      start: 0
    }
    this.username = this.username.bind(this);
    this.password = this.password.bind(this);
    this.validText = this.validText.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  username(e){
    this.setState({username: e.target.value, error: false});
    console.log("sätter statet username: ", e.target.value)
    this.setState({stringTest: ""});
  }

  password(e){
    this.setState({password: e.target.value, error: false});
    this.setState({stringTest: ""});
  }

  validText(e){
    let validUsername = document.getElementById("usernameInput");
    let validPassword = document.getElementById("passwordInput");

    if(this.state.stringTest !== "" && validUsername.value !== "" && validPassword.value !== "" && this.state.stringTest !== "unvalidText"){
      this.setState({stringTest: "validText"});
      //tömmer input fälten
      document.getElementById("usernameInput").value = "";
      document.getElementById("passwordInput").value = "";
      // timer på "Användare skapad diven"
      setTimeout(() => {
        this.setState({stringTest: ""})
      }, 1200)
    }else{
      this.setState({stringTest: "unvalidText"});
      setTimeout(() => {
        this.setState({stringTest: ""})
      }, 1500)
    }
  }

  createUser = (e) => {
    e.preventDefault();

    if(this.state.username !== "" && this.state.password !== ""){
      fetch("https://kandidat-test.herokuapp.com/register", {
        method: "POST",
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: this.state.username, password: this.state.password})
      })

      .then(response => {
        if(response.status !== 200){          
          throw "Failed creating user!"
        }
        console.log("yayy user created!!")
          this.setState({password: "", error: true});
          this.setState({password: "", error: true});
          this.setState({stringTest: "validText"});
          this.validText();
      })

      .catch(err => {
          //felmeddelande: 
          //this.props.loggedIn(false);
          this.setState({stringTest: "unvalidText"});
          console.log(err);
          this.validText();
      })
    }else{
      this.setState({stringTest: "unvalidText"});
      this.validText();
    }
  }

  render(){
    return (

    <div>
      <div className='tabContainer'>
        <div id='newCustomerTab'>
          <div className='customerLogo'>
            <img src={user} className='userLogo' />
          </div>

          <div style={{position: 'relative', paddingLeft: 20, paddingRight: 20, paddingTop: 10, alignItems: 'center'}}>
            {
              this.state.stringTest === "validText" ? 
                <div className="userCreated">
                  <img src={createdLogo} style={{height: 16}} />
                  <h5 style={{position: 'absolute', display: 'inline', paddingLeft: 8, fontWeight: 'normal', fontSize: 16 }}>Användare skapad!</h5>
                </div>
              :
              this.state.stringTest === "unvalidText" ?
                <div className='userCreated unvalidUser'>
                  <h5 style={{position: 'absolute', display: 'inline', paddingLeft: 8, fontWeight: 'normal', fontSize: 16 }}>Ogiltig text!</h5>
                </div> 
              :
                <div className="createdMessHidden"></div>

            }
            </div>

            <form id='infoForm' onSubmit={ this.createUser }>
              <div className={`textInput ${this.state.stringTest}`}>
                <input id='usernameInput' placeholder='Användarnamn*'
                onChange={this.username}
                />
              </div>
              <div className={`textInput ${this.state.stringTest}`}>
                <input id='passwordInput' placeholder='Lösenord*'
                onChange={this.password}
                />
              </div>

              <input type="submit" style={{display: "none"}}/>
              <div id="createButton" onClick={this.createUser}>Skapa användare</div>
            </form>
          </div>
        </div>  
      </div>  

    );
  }
};

export default NewCustomer;