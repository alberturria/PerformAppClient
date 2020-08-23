import React, { Component } from "react";
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";
import Spinner from "react-bootstrap/Spinner";
import PatientEntity from "../entities/PatientEntity";
import UserEntity from "../entities/UserEntity";
import DeletePatientUseCase from "../useCases/DeletePatientUseCase";



class PatientElementListComponent extends Component{
    constructor(props){
        super(props);
        this._deletePatient = this._deletePatient.bind(this);

        this.state = {loading: false};

        this._loadPatientCallback = this._loadPatientCallback.bind(this);
        this._editPatientCallback = this._editPatientCallback.bind(this);
        this._renderPatientGender = this._renderPatientGender.bind(this);
    }

    _deletePatient(closeCallback) {
        const { patientEntity, reloadPatientsCallback, userEntity } = this.props;
        const deleteSuiteUseCase = new DeletePatientUseCase(userEntity.userId, patientEntity.id);
        deleteSuiteUseCase.run()
        .then(()=> {
            closeCallback();
            reloadPatientsCallback();
        });
    }

    _editPatientCallback() {
        const {patientEntity, editPatientCallback} = this.props;
        this.setState({loading: true});
        editPatientCallback(patientEntity.id)
    }

    _loadPatientCallback(){
        const {patientEntity, loadPatientCallback} = this.props;
        this.setState({loading: true});
        loadPatientCallback(patientEntity.id)

    }

    _renderSpinnerIfNeeded() {
        const {loading} = this.state;
        if( loading ){
            return (
                <td>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                </td>
            )
        }
    }

    _renderPatientGender() {
        const {patientEntity} = this.props;
        if(patientEntity.gender === 1){
            return 'Hombre';
        }
        else if(patientEntity.gender === 2){
            return 'Mujer';
        }
        else{
            return 'Otro';
        }
    }

    render() {
        const {patientEntity} = this.props;
        return (
            <React.Fragment>
                <tr>
                    <td className="patient-name" onClick={this._loadPatientCallback}>
                        {patientEntity.name}
                    </td>
                    <td className="patient-mail" onClick={this._loadPatientCallback}>
                        {patientEntity.mail}
                    </td>
                    <td className="patient-gender" onClick={this._loadPatientCallback}>
                        {this._renderPatientGender()}
                    </td>
                    <td className="patient-age" onClick={this._loadPatientCallback}>
                        {patientEntity.age}
                    </td>
                    <td className="patient-phone" onClick={this._loadPatientCallback}>
                        {patientEntity.phoneNumber}
                    </td>
                    <td>
                        <button className="modal-button" onClick={this._editPatientCallback}>
                            Editar
                        </button>
                    </td>
                <td>
                    <Popup className="own-popup" trigger={<button className="modal-button modal-logout-button"> Borrar </button>} modal>
                    {close => (
                    <div>
                        <a className="close" onClick={close}>
                        &times;
                        </a>
                        <div className='modal-header'>
                            Borrar paciente
                        </div>
                        <div className='modal-message'>
                        {" "}
                            ¿Está seguro de que quiere borrar este paciente?
                        </div>
                        <div className='modal-buttons'>
                            <button
                                className="modal-button"
                                onClick={() => {
                                close();
                                }}
                            >
                                Cancelar
                            </button>
                            <button
                            className="modal-button modal-logout-button"
                            onClick={() => this._deletePatient(close)}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                    )}
                    </Popup>
                </td>
                {this._renderSpinnerIfNeeded()}
                </tr>
            </React.Fragment>
        )
    }
}
export default PatientElementListComponent

PatientElementListComponent.propTypes = {
    patientEntity: PropTypes.instanceOf(PatientEntity),
    userEntity: PropTypes.instanceOf(UserEntity),
    reloadPatientsCallback: PropTypes.func.isRequired,
    loadPatientCallback: PropTypes.func.isRequired,
    editPatientCallback: PropTypes.func.isRequired,
}
