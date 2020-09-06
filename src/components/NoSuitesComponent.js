import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import CreateSampleDataUseCase from "../useCases/CreateSampleDataUseCase";

class NoSuitesComponent extends Component{
    constructor(props){
        super(props);
        this._createSampleData = this._createSampleData.bind(this);
    }

    _createSampleData() {
        const { userEntity, reloadSuitesCallback } = this.props;
        const createSampleDataUseCase = new CreateSampleDataUseCase(userEntity); 
        createSampleDataUseCase.run()
        .then(() => {
            reloadSuitesCallback();
        });
    }

    render() {
        return (
            <div>
                <p>Actualmente no tiene ninguna prueba guardada, puede usar datos de prueba clicando en el botón</p>
                <button onClick={this._createSampleData} className='modal-button'>
                    Usar datos de prueba
                </button>
            </div>
        )
    }
}
export default NoSuitesComponent

NoSuitesComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity).isRequired,
    reloadSuitesCallback: PropTypes.func.isRequired,
}