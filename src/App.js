import React, { Component } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './styles/App.scss';

import Login from "./components/Login";
import Home from "./components/Home";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedin: true
    }
  }

  componentDidMount() {
    //gör fetch och titta om cookie är giltig (om den finns). om den är ogiltig, sätt loggedin = true
    //kolla ba om den finns ? redirect("/home") : redirect ("/")
  }
  
  render() {
    return (
      this.state.loggedin ?
      <div className="App">
        
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} component={Login}/>
            <Route exact path={"/home"} component={Home}/>
            <Route exact path={"/home/newcustomer"} component={Home}/>
            <Route exact path={"/home/customers"} component={Home}/>
            <Route exact path={"/home/customers/:id"} component={Home}/>  
          </Switch>
        </BrowserRouter>
      </div>
      :
      <Redirect to="/"/>
    );
  }
}

export default App;
