import React, { Component } from "react";
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";
import SuiteEntity from "../entities/SuiteEntity";
import DeleteSuiteUseCase from "../useCases/DeleteSuiteUseCase";
import Spinner from "react-bootstrap/Spinner";



class SuiteElementListComponent extends Component{
    constructor(props){
        super(props);
        this._deleteSuite = this._deleteSuite.bind(this);

        this.state = {loading: false};

        this._loadSuiteCallback = this._loadSuiteCallback.bind(this);
    }

    _deleteSuite(closeCallback) {
        const { suiteEntity, reloadSuitesCallback } = this.props;
        const deleteSuiteUseCase = new DeleteSuiteUseCase(suiteEntity.userId, suiteEntity.id);
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
            <li className="suite-li">
                <div className="suite-li-div" onClick={this._loadSuiteCallback}>
                    {this._renderSpinnerIfNeeded()}
                    <div className="suite-name">
                        {suiteEntity.name}
                    </div>
                    <div className="suite-date">
                        {suiteEntity.date}
                    </div>
                    <div className="suite-owner">
                        {suiteEntity.username}
                    </div>
                </div>
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

            </li>
        )
    }
}
export default SuiteElementListComponent

SuiteElementListComponent.propTypes = {
    suiteEntity: PropTypes.instanceOf(SuiteEntity),
    loadSuiteCallback: PropTypes.func.isRequired,
    reloadSuitesCallback: PropTypes.func.isRequired,
}
