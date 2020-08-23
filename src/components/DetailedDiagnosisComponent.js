import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import DiagnosisEntity from "../entities/DiagnosisEntity";



class DetailedDiagnosisComponent extends Component{
    constructor(props){
        super(props);
        this._renderRelatedSuite = this._renderRelatedSuite.bind(this);
    }

    _renderRelatedSuite() {
        const { diagnosisEntity } = this.props;

        if (diagnosisEntity.suiteName) {
            return(
                <p>
                    <span  className='parameter'>Prueba asociada:</span> {diagnosisEntity.suiteName}
                </p>
            )
        }

        return(
            <p className='parameter'>
                Este diagnóstico no tiene ninguna prueba asociada.
            </p>
        )
    }

   
    render() {
        const {diagnosisEntity, closeDetailedDiagnosisCallback} = this.props;

        return (
            <div className="main-pane">
                <button className="modal-button modal-logout-button detailed-suite-close" onClick={closeDetailedDiagnosisCallback}>
                    Atrás
                </button>
                <div className="informative-main-pane-header">
                    {diagnosisEntity.name}
                </div>
                <div className='detailed-diagnosis-container'>
                    <p>
                        <span className='parameter'>Nombre:</span> {diagnosisEntity.name}
                    </p>
                    <div className='video-diagnosis-container'>
                    <span className='parameter'>Vídeo asociado: </span>
                        <video width="320" height="240" controls>
                            <source src={diagnosisEntity.video} type="video/mp4" />
                            Su navegador no soporta la reproducción de video.
                        </video> 
                    </div>
                </div>
                <div className='diagnosis-description'>
                    <span className='parameter'>Descripción:</span> {diagnosisEntity.description}
                </div>
                    {this._renderRelatedSuite}

            </div>
        )
    }
}
export default DetailedDiagnosisComponent

DetailedDiagnosisComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
    diagnosisEntity: PropTypes.instanceOf(DiagnosisEntity),
    closeDetailedDiagnosisCallback: PropTypes.func.isRequired,
}
