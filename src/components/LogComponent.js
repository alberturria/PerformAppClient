import React, { Component } from "react";
import PropTypes from 'prop-types';
import LogUserUseCase from "../useCases/LogUserUseCase";



class LogComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            parsedMuscle: null,
            rmsSections: null,
            loading:false,
        };

        this.usernameRef = React.createRef();
        this.emailRef = React.createRef();
        this.passwordRef = React.createRef();


        this._handleClick = this._handleClick.bind(this);
    }


    _handleClick() {
        const {logUserCallback} = this.props;
        const logUserUseCase = new LogUserUseCase(this.emailRef.current.value, this.passwordRef.current.value);
        logUserUseCase.run()
        .then(()=> {
            const userInformation = logUserUseCase.getUserId();
            const userId = userInformation['userId'];
            const username = userInformation['username'];
            const token = userInformation['token'];
            if (userId !== null)
                logUserCallback(userId, username, token);
            else{
                this.setState({error: true});
            }
        })

    }

    _renderError(){
        const {error} = this.state;

        if (error){
            return <p className="registration-error">Ha habido un error con su registro, inténtelo de nuevo.</p>
        }
    }


    render() {
        const { needCreateCallback } = this.props;
        return (
            <div className="registration-pane">
                <h3>Regístrese</h3>
                <p className="registration-attribute">Email</p>
                <input type="email" ref={this.emailRef} className="input-login"/>
                <p className="registration-attribute">Constraseña</p>
                <input type="password" ref={this.passwordRef} className="input-login"/>
                <button type="button" className="registration-button" onClick={this._handleClick}>Log in</button>

                <p>Si necesita crear un nuevo usuario pulse <a onClick={needCreateCallback} className="link">aquí</a></p>
                {this._renderError()}
            </div>
        )
    }
}
export default LogComponent

LogComponent.propTypes = {
    needCreateCallback: PropTypes.func.isRequired,
    logUserCallback: PropTypes.func.isRequired,
}
