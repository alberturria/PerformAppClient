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

        if (diagnosisEntity.suiteId) {
            return(
                <p>
                    Prueba asociada: {diagnosisEntity.suiteId}
                </p>
            )
        }

        return(
            <p>
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
                <p>
                    Nombre: {diagnosisEntity.name}
                </p>
                <p>
                    Descripción: {diagnosisEntity.description}
                </p>
                <video width="320" height="240" controls>
                    <source src={diagnosisEntity.video} type="video/mp4" />
                    Su navegador no soporta la reproducción de video.
                </video> 
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
