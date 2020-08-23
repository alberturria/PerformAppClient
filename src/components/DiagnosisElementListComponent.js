import React, { Component } from "react";
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";
import Spinner from "react-bootstrap/Spinner";
import UserEntity from "../entities/UserEntity";
import DiagnosisEntity from "../entities/DiagnosisEntity";
import DeleteDiagnosisUseCase from "../useCases/DeleteDiagnosisUseCase";
import SelectOptionsEntity from "../entities/SelectOptionsEntity";
import SendMailUseCase from "../useCases/SendMailUseCase";



class DiagnosisElementListComponent extends Component{
    constructor(props){
        super(props);
        this._deleteDiagnosis = this._deleteDiagnosis.bind(this);

        this.state = {loading: false};

        this.exportPatientRef = React.createRef();
        this.exportDiagnosisRef = React.createRef();
        this.exportMusclesRef = React.createRef();

        this._loadDiagnosisCallback = this._loadDiagnosisCallback.bind(this);
        this._editDiagnosisCallback = this._editDiagnosisCallback.bind(this);
        this._renderNotifyIfPossible = this._renderNotifyIfPossible.bind(this);
    }

    _deleteDiagnosis(closeCallback) {
        const { diagnosisEntity, reloadDiagnosesCallback, userEntity } = this.props;
        const deleteDiagnosisUseCase = new DeleteDiagnosisUseCase(userEntity.userId, diagnosisEntity.id);
        deleteDiagnosisUseCase.run()
        .then(()=> {
            closeCallback();
            reloadDiagnosesCallback();
        });
    }

    _editDiagnosisCallback() {
        const {diagnosisEntity, editDiagnosisCallback} = this.props;
        this.setState({loading: true});
        editDiagnosisCallback(diagnosisEntity.id)
    }

    _loadDiagnosisCallback(){
        const {diagnosisEntity, loadDiagnosisCallback} = this.props;
        this.setState({loading: true});
        loadDiagnosisCallback(diagnosisEntity.id)

    }

    _sendMail(closeCallback) {
        const { diagnosisEntity } = this.props;
        const selectedOptionsEntity = new SelectOptionsEntity(this.exportPatientRef.current.checked, this.exportDiagnosisRef.current.checked, this.exportMusclesRef.current.checked);
        const sendMailUseCase = new SendMailUseCase(diagnosisEntity.ownerId, diagnosisEntity.suiteId, selectedOptionsEntity);
        sendMailUseCase.run()
        .then(()=> {
            closeCallback();
        });
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

    _renderNotifyIfPossible(){
        const { diagnosisEntity } = this.props;
        if (diagnosisEntity.suiteId){
            return(
                <Popup className="own-popup"
                trigger={
                <button className="modal-button">
                    Enviar información
                </button>} modal>
                    {close => (
                    <div>
                        <a className="close" onClick={close}>
                        &times;
                        </a>
                        <div className='modal-header'>
                            Enviar información al paciente
                        </div>
                        <div className='modal-message send-email-container'>
                            {" "}
                            
                            <label for="export-patient" className='parameter'>
                                Incluir información del paciente
                                <input type="checkbox" id="export-patient" ref={this.exportPatientRef} className='checkbox-component'/>
                            </label>
                            
                            <label for="export-diagnosis" className='parameter'>
                                Incluir información del diagnóstico
                                <input type="checkbox" id="export-diagnosis" ref={this.exportDiagnosisRef} className='checkbox-component'/>
                            </label>
                            
                            <label for="export-muscles" className='parameter'>
                                Incluir datos específicos de cada señal
                                <input type="checkbox" id="export-muscles" ref={this.exportMusclesRef} className='checkbox-component'/>
                            </label>
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
                            onClick={() => this._sendMail(close)}>
                                Exportar
                            </button>
                        </div>
                    </div>
                    )}
                </Popup>
            )
        } else{
            return null;
        }
    }

    render() {
        const {diagnosisEntity} = this.props;
        return (
            <React.Fragment>
                <tr>                  
                        <td className="suite-name" onClick={this._loadDiagnosisCallback}>
                            {diagnosisEntity.name}
                        </td>
                        <td className="suite-name" onClick={this._loadDiagnosisCallback}>
                            {diagnosisEntity.suiteName}
                        </td>
                        <td className="suite-name" onClick={this._loadDiagnosisCallback}>
                            {diagnosisEntity.patientName}
                        </td>
                        <td>
                            <button className="modal-button" onClick={this._editDiagnosisCallback}>
                                Editar
                            </button>
                        </td>
                        <td>
                            {this._renderNotifyIfPossible()}
                        </td>
                        <td>
                            <Popup className="own-popup" trigger={<button className="modal-button modal-logout-button"> Borrar </button>} modal>
                                {close => (
                                <div>
                                    <a className="close" onClick={close}>
                                    &times;
                                    </a>
                                    <div className='modal-header'>
                                        Borrar diagnóstico
                                    </div>
                                    <div className='modal-message'>
                                    {" "}
                                        ¿Está seguro de que quiere borrar este diagnóstico?
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
                                        onClick={() => this._deleteDiagnosis(close)}>
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
export default DiagnosisElementListComponent

DiagnosisElementListComponent.propTypes = {
    diagnosisEntity: PropTypes.instanceOf(DiagnosisEntity),
    userEntity: PropTypes.instanceOf(UserEntity),
    reloadDiagnosesCallback: PropTypes.func.isRequired,
    loadDiagnosisCallback: PropTypes.func.isRequired,
    editDiagnosisCallback: PropTypes.func.isRequired,
}
