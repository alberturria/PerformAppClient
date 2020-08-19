import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import NewPatientUseCase from "../useCases/NewPatientUseCase";
import DiagnosisEntity from "../entities/DiagnosisEntity";
import EditDiagnosisUseCase from "../useCases/EditDiagnosisUseCase";



class EditDetailedDiagnosisComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            nameValue: props.diagnosisEntity.name,
            descriptionValue: props.diagnosisEntity.description,
            videoValue: props.diagnosisEntity.video,
            suiteValue:  props.diagnosisEntity.suite,
        }


        this.nameRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.suiteRef = React.createRef();
        this.videoRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.editDiagnosis = this.editDiagnosis.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            videoValue: event.target.files[0]
        });        
    }

    editDiagnosis() {
        const {userEntity, diagnosisEntity} = this.props;
        const { videoValue } = this.state;
        const diagnosisInfo = new DiagnosisEntity(diagnosisEntity.id, this.nameRef.current.value, this.descriptionRef.current.value, videoValue,
           userEntity.userId, this.suiteRef.current.value)
        const editDiagnosisUseCase = new EditDiagnosisUseCase(userEntity.userId, diagnosisInfo);
        editDiagnosisUseCase.run()
    }




    render() {
        const { nameValue, descriptionValue, suiteValue } = this.state;
        return (
            <div className="main-pane">
                <p>
                    Nombre:
                </p>
                <input ref={this.nameRef} defaultValue={nameValue} >
                </input>
                <p>
                    Descripción:
                </p>
                <input ref={this.descriptionRef} defaultValue={descriptionValue}>
                </input>
                <p>
                    Prueba relacionada:
                </p>
                <select ref={this.suiteRef} defaultValue={suiteValue}>
                    <option value={null} selected></option> 
                    <option value={2}>Mujer</option>
                    <option value={3}>Otro</option>
                </select>

                <input
                    type="file"
                    ref={(input) => { this.filesInput = input }}
                    name="file"
                    accept="video/*"
                    icon='file text outline'
                    label='Subir vídeo del diagnóstico'
                    placeholder='Subir vídeo'
                    onChange={this.handleChange}
                />

                <button
                className="modal-button"
                onClick={this.editDiagnosis}>
                    Editar diagnóstico
                </button>
            </div>
        )
    }
}
export default EditDetailedDiagnosisComponent

EditDetailedDiagnosisComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
    diagnosisEntity: PropTypes.instanceOf(DiagnosisEntity),
}