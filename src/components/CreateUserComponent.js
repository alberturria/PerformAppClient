import React, { Component } from "react";
import PropTypes from 'prop-types';
import GetRmsSectionsUseCase from "../useCases/GetRmsSectionsUseCase";
import CreateUserUseCase from "../useCases/CreateUserUseCase";


class CreateUserComponent extends Component{
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
        const createUserUseCase = new CreateUserUseCase(this.usernameRef.current.value, this.emailRef.current.value, this.passwordRef.current.value);
        createUserUseCase.run()
        .then(()=> {
            const userInformation = createUserUseCase.getUserId();
            const userId = userInformation['userId'];
            const username = userInformation['username'];
            logUserCallback(userId, username);
        })
    }

    _getRmsSections() {
        const { id } = this.props;
        this.setState({ loading: true });
        const getRmsSectionsUseCase = new GetRmsSectionsUseCase(id);

        getRmsSectionsUseCase.run()
            .then(() => {
                const rmsSections = getRmsSectionsUseCase.getRmsSections();
                this.setState({ rmsSections: rmsSections, loading: false });
                this.rmsChartRef.current.hoverSections(rmsSections);
            });
    }

    render() {
        const { backToInitCallback } = this.props;

        return (
            <div className="registration-pane">
                <h3>Nuevo usuario</h3>
                <p className="registration-attribute">Nombre de usuario</p>
                <input type="text" ref={this.usernameRef} className="input-login"/>
                <p className="registration-attribute">Correo electrónico</p>
                <input type="email" ref={this.emailRef} className="input-login"/>
                <p className="registration-attribute">Contraseña</p>
                <input type="password" ref={this.passwordRef} className="input-login"/>
                <button type="button" className="registration-button" onClick={this._handleClick}>Crear usuario</button>
                <p>Para volver a la página principal pulse <a onClick={backToInitCallback} className="link">aquí</a></p>
            </div>
        )
    }
}
export default CreateUserComponent

CreateUserComponent.propTypes = {
    logUserCallback: PropTypes.func.isRequired,
    backToInitCallback: PropTypes.func.isRequired,
}
