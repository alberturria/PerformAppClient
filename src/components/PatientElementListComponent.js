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
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        }
    }

    render() {
        const {patientEntity} = this.props;
        return (
            <li className="suite-li">
                <div className="suite-li-div" onClick={this._loadPatientCallback}>
                    {this._renderSpinnerIfNeeded()}
                    <div className="suite-name">
                        {patientEntity.name}
                    </div>
                    <div className="suite-date">
                        {patientEntity.mail}
                    </div>
                    <div className="suite-owner">
                        {patientEntity.gender}
                    </div>
                </div>
                <button className="modal-button" onClick={this._editPatientCallback}>
                    Editar
                </button>
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

            </li>
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
