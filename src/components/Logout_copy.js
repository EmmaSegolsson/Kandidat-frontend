import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class Logout extends Component {
  constructor(){
    super();
    this.state = {
      logout: false
       
    }
  }

  componentDidMount() {
      fetch("http://localhost:4000/logout", {
        method: "GET",
        credentials: "include"
      })
        .then(async response => {
          if(response.status === 200) {
            this.setState({logout: true})
          } else {
            const err = new Error(response.statusText)
            throw err
          }
        })
        .catch(err => {
          //felmeddelande: 
          console.error(err);
      })
  } 

  render() {

    return this.state.logout ? <Redirect to={"/"} /> : null;

  }
}

export default Logout;
