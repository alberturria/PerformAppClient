import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Menu from "./components/Menu";
import CreateUserComponent from './components/CreateUserComponent';
import LogComponent from './components/LogComponent';
import UserEntity from './entities/UserEntity';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { logged: false };
    this._logUser = this._logUser.bind(this);
    this._needCreateCallback = this._needCreateCallback.bind(this);
    this._backToInit = this._backToInit.bind(this);
    this._logoutUser = this._logoutUser.bind(this);
  }

  _logUser(userId, username){
    this.setState({logged: true, needsCreateUser: false, loggedUserId: userId, username: username});
  }

  _needCreateCallback() {
    this.setState({needsCreateUser: true});
  }

  _backToInit(){
    this.setState({logged: false, needsCreateUser: false});
  }

  _logoutUser() {
    this.setState({logged: false, needsCreateUser: false, loggedUserId: null, username: null});
  }

  render(){
    const {logged, needsCreateUser, loggedUserId, username} = this.state;
    const userEntity = new UserEntity(loggedUserId, username);
    if (logged){
      return (<Menu logOutCallback={this._logoutUser} userEntity={userEntity} />);
    }
    if(needsCreateUser) {
      return (
        <div className="App">
          <CreateUserComponent logUserCallback={this._logUser} backToInitCallback={this._backToInit}/>
        </div>
      );
    }
    return (
      <div className="App">
        <LogComponent needCreateCallback={this._needCreateCallback} logUserCallback={this._logUser}/>        
      </div>
    );
  }
}

export default App;
