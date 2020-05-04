import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import '../styles/Login.scss';
import Logo_black from '../assets/svart_logo.jpg';
import errorLogo from '../assets/error.png';

class Login extends Component {
  constructor(){
    super();
    this.state = {
        login: false,
        error: null,
        username: "",
        password: "",
        loading: false,

        usernameOnFocus: false,
        passwordOnFocus: false,
        loginError: false
    };

    //bind here:
    this.username = this.username.bind(this);
    this.password = this.password.bind(this);
    this.submit = this.submit.bind(this);
  }

  username(e){
    this.setState({username: e.target.value, error: false});
    this.setState({loginError: false});
  }

  password(e){
    this.setState({password: e.target.value, error: false});
    this.setState({loginError: false});
  }

  submit(e){
    e.preventDefault();

    //headers behövs för : express veta göra vad med datan, POST, PATCH, DELETE troligtvis - testa
    this.setState({loading: true});
    fetch("https://kandidat-test.herokuapp.com/login/admin", {
      method: "POST",
      credentials: "include",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username: this.state.username, password: this.state.password}) //`username=${this.state.username}&password=${this.state.password}`
    })

    .then(response => {
      if(response.status !== 200){
        this.setState({loginError: true});
        throw "Failed login!"
      }
      this.setState({login: true});
    })

    .catch(err => {
        //felmeddelande: 
        console.log(err);
    })
  }

  LoginErrorDiv = () =>{
    console.log("hej");
    this.setState({loginError: true});
  }

  render() {

    if(this.state.login){
      return <Redirect to={"/home"} />;
    }

    let error = <div className="error-msg"></div>;
    if(this.state.error){
      error = <div className="error-show">Fel användarnamn eller lösenord</div>;
    }  

    return (
      <div>
        <div className="loginContainer">
          <main>

            <img className='anebyhusLogo' src={Logo_black} />

            <form className='credentials' onSubmit={ this.submit }>
            <div className={( this.state.loginError ? 'textInput errorMess' : 'textInput')} onClick={e => e.currentTarget.childNodes[1].focus()}>
                <label htmlFor="username"></label>
                  <input id='usernameInput'
                    type="text"
                    name="username"
                    onChange={this.username}
                    onFocus={e => this.setState({usernameOnFocus: true})}
                    onBlur={e => e.target.value ? this.setState({usernameOnFocus: true}) : this.setState({usernameOnFocus: false})}
                  />
                <p className={ ( this.state.usernameOnFocus ? 'placeholder toLabel' : 'placeholder') }>Användarnamn</p>
              </div>
              <div className={( this.state.loginError ? 'textInput errorMess' : 'textInput')} onClick={e => e.currentTarget.childNodes[1].focus()}>
                  <label htmlFor="password"></label>
                  <input id='passwordInput'
                    type="password"
                    name="password"
                    onChange={this.password}
                    onFocus={e => this.setState({passwordOnFocus: true})}
                    onBlur={e => e.target.value ? this.setState({passwordOnFocus: true}) : this.setState({passwordOnFocus: false})}
                  />
                  <p className={ this.state.passwordOnFocus ? 'placeholder toLabel' : 'placeholder' }>Lösenord</p>
                </div> 
                
                {
                  this.state.loginError ?
                    <div className="loginErrorMessage">
                      <img src={errorLogo} style={{height: 12}} />
                      <h5 style={{position: 'absolute', paddingTop: 1.5, display: 'inline', paddingLeft: 8, fontWeight: "normal" }}>Ingen sådan användare hittades</h5>
                    </div>
                    :
                    <div style={{height: 22}}></div>
                }

                {error}
                <input type="submit" style={{display: "none"}}/>
                <div id="loginButton" onClick={ this.submit } >Logga in</div>
                  <h3>Glömt lösenord</h3>    
            </form>

          </main>
        </div>
      </div>
        
    )
  }
}

export default Login;