import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import DiagnosisEntity from "../entities/DiagnosisEntity";
import NewDiagnosisUseCase from "../useCases/NewDiagnosisUseCase";



class NewDiagnosisComponent extends Component{
    constructor(props){
        super(props);


        this.nameRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.suiteRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.createDiagnosis = this.createDiagnosis.bind(this);
    }

    handleChange = (event) => {
        this.setState({
            video: event.target.files[0]
        });        
    }

    createDiagnosis() {
        const {userEntity} = this.props;
        const { video } = this.state;
        let suiteId = this.suiteRef.current.value;
        if (this.suiteRef.current.value === ''){
            suiteId = null;
        }
        const diagnosisInfo = new DiagnosisEntity(null, this.nameRef.current.value, this.descriptionRef.current.value, video , userEntity.userId, suiteId)
        const newDiagnosisUseCase = new NewDiagnosisUseCase(userEntity.userId, diagnosisInfo);
        newDiagnosisUseCase.run()
    }




    render() {

        return (
            <div className="main-pane">
                <p>
                    Nombre:
                </p>
                <input ref={this.nameRef}>
                </input>
                <p>
                    Descripción:
                </p>
                <input ref={this.descriptionRef}>
                </input>
                <p>
                    Prueba:
                </p>
                <select ref={this.suiteRef}>
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
                    label='Subir video del diagnóstico'
                    placeholder='Subir video'
                    onChange={this.handleChange}
                />

                <button
                className="modal-button"
                onClick={this.createDiagnosis}>
                    Crear diagnóstico
                </button>
            </div>
        )
    }
}
export default NewDiagnosisComponent

NewDiagnosisComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
}
