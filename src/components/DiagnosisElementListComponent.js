import React, { Component } from "react";
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";
import Spinner from "react-bootstrap/Spinner";
import UserEntity from "../entities/UserEntity";
import DiagnosisEntity from "../entities/DiagnosisEntity";
import DeleteDiagnosisUseCase from "../useCases/DeleteDiagnosisUseCase";



class DiagnosisElementListComponent extends Component{
    constructor(props){
        super(props);
        this._deleteDiagnosis = this._deleteDiagnosis.bind(this);

        this.state = {loading: false};

        this._loadDiagnosisCallback = this._loadDiagnosisCallback.bind(this);
        this._editDiagnosisCallback = this._editDiagnosisCallback.bind(this);
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
        const {diagnosisEntity} = this.props;
        return (
            <li className="suite-li">
                <div className="suite-li-div" onClick={this._loadDiagnosisCallback}>
                    {this._renderSpinnerIfNeeded()}
                    <div className="suite-name">
                        {diagnosisEntity.name}
                    </div>
                </div>
                <button className="modal-button" onClick={this._editDiagnosisCallback}>
                    Editar
                </button>
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

            </li>
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
