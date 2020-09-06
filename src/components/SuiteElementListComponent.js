import React, { Component } from "react";
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";
import SuiteEntity from "../entities/SuiteEntity";
import DeleteSuiteUseCase from "../useCases/DeleteSuiteUseCase";
import Spinner from "react-bootstrap/Spinner";
import ExportSuiteUseCase from "../useCases/ExportSuiteUseCase";
import SelectOptionsEntity from "../entities/SelectOptionsEntity";
import UserEntity from "../entities/UserEntity";



class SuiteElementListComponent extends Component{
    constructor(props){
        super(props);
        this._deleteSuite = this._deleteSuite.bind(this);

        this.state = {loading: false};

        this.exportPatientRef = React.createRef();
        this.exportDiagnosisRef = React.createRef();
        this.exportMusclesRef = React.createRef();


        this._loadSuiteCallback = this._loadSuiteCallback.bind(this);
        this._exportToPDF = this._exportToPDF.bind(this);
        this._editSuiteCallback = this._editSuiteCallback.bind(this);
    }

    _deleteSuite(closeCallback) {
        const { suiteEntity, userEntity, reloadSuitesCallback } = this.props;
        const deleteSuiteUseCase = new DeleteSuiteUseCase(userEntity, suiteEntity.id);
        deleteSuiteUseCase.run()
        .then(()=> {
            closeCallback();
            reloadSuitesCallback();
        });
    }

    _loadSuiteCallback(){
        const {suiteEntity, loadSuiteCallback} = this.props;
        this.setState({loading: true});
        loadSuiteCallback(suiteEntity.id)

    }

    _editSuiteCallback() {
        const {suiteEntity, editSuiteCallback} = this.props;
        this.setState({loading: true});
        editSuiteCallback(suiteEntity.id)
    }

    _exportToPDF(closeCallback) {
        const { suiteEntity, reloadSuitesCallback, userEntity } = this.props;
        const selectedOptionsEntity = new SelectOptionsEntity(this.exportPatientRef.current.checked, this.exportDiagnosisRef.current.checked, this.exportMusclesRef.current.checked);
        const exportSuiteUseCase = new ExportSuiteUseCase(userEntity, suiteEntity.id, selectedOptionsEntity);
        exportSuiteUseCase.run()
        .then(()=> {
            closeCallback();
            reloadSuitesCallback();
        });
    }

    _renderType() {
        const { suiteEntity } = this.props;
        if (suiteEntity.type === 1){
            return 'Genérica';
        } else if (suiteEntity.type === 2) {
            return 'Pádel';
        } else {
            return 'Rehabilitación';
        }
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
        const {suiteEntity} = this.props;
        return (
            <React.Fragment>
                <tr>
                    <td className="suite-name" onClick={this._loadSuiteCallback}>
                        {suiteEntity.name}
                    </td>
                    <td className="suite-name" onClick={this._loadSuiteCallback}>
                        {suiteEntity.diagnosisName}
                    </td>
                    <td className="suite-name" onClick={this._loadSuiteCallback}>
                        {suiteEntity.patientName}
                    </td>
                    <td className="suite-name" onClick={this._loadSuiteCallback}>
                        {this._renderType()}
                    </td>
                    <td className="suite-date" onClick={this._loadSuiteCallback}>
                        {suiteEntity.date}
                    </td>
                    <td>
                        <button className="modal-button" onClick={this._editSuiteCallback}>
                            Editar
                        </button>
                    </td>
                    <td>
                        <Popup className="own-popup"
                        trigger={
                        <button className="modal-button">
                            Exportar a PDF
                        </button>} modal>
                            {close => (
                            <div>
                                <a className="close" onClick={close}>
                                &times;
                                </a>
                                <div className='modal-header'>
                                    Exportar prueba
                                </div>
                                <div className='modal-message send-email-container'>
                                    {" "}
                                    
                                    <label for="export-patient" className='parameter'>
                                        Incluir paciente (Si es posible)
                                        <input type="checkbox" id="export-patient" ref={this.exportPatientRef} className='checkbox-component'/>
                                    </label>
                                    
                                    <label for="export-diagnosis" className='parameter'>
                                        Incluir diagnóstico (Si es posible)
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
                                    onClick={() => this._exportToPDF(close)}>
                                        Exportar
                                    </button>
                                </div>
                            </div>
                            )}
                        </Popup>
                    </td>
                    <td>
                        <Popup className="own-popup" trigger={<button className="modal-button modal-logout-button"> Borrar </button>} modal>
                            {close => (
                            <div>
                                <a className="close" onClick={close}>
                                &times;
                                </a>
                                <div className='modal-header'>
                                    Borrar prueba
                                </div>
                                <div className='modal-message'>
                                {" "}
                                    ¿Está seguro de que quiere borrar esta prueba?
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
                                    onClick={() => this._deleteSuite(close)}>
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
export default SuiteElementListComponent

SuiteElementListComponent.propTypes = {
    suiteEntity: PropTypes.instanceOf(SuiteEntity),
    loadSuiteCallback: PropTypes.func.isRequired,
    editSuiteCallback: PropTypes.func.isRequired,
    reloadSuitesCallback: PropTypes.func.isRequired,
    userEntity: PropTypes.instanceOf(UserEntity).isRequired,
}
