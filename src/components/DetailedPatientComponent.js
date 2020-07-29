import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import PatientEntity from "../entities/PatientEntity";



class DetailedPatientComponent extends Component{
    constructor(props){
        super(props);
    }



    render() {
        const {patientEntity, closeDetailedPatientCallback} = this.props;

        return (
            <div className="main-pane">
                <button className="modal-button modal-logout-button detailed-suite-close" onClick={closeDetailedPatientCallback}>
                    Atrás
                </button>
                <div className="informative-main-pane-header">
                    {patientEntity.name}
                </div>
                <p>
                    Nombre: {patientEntity.name}
                </p>
                <p>
                    Email: {patientEntity.mail}
                </p>
                <p>
                    Edad: {patientEntity.age}
                </p>
                <p>
                    Teléfono: {patientEntity.phoneNumber}
                </p>
                <p>
                    Género: {patientEntity.gender}
                </p>
                <img src={patientEntity.photo} alt="Imagen del usuario"/>
                
                    
            </div>
        )
    }
}
export default DetailedPatientComponent

DetailedPatientComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
    patientEntity: PropTypes.instanceOf(PatientEntity),
    closeDetailedPatientCallback: PropTypes.func.isRequired,
}
