import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import PatientEntity from "../entities/PatientEntity";
import EditPatientUseCase from "../useCases/EditPatientUseCase";



class EditDetailedPatientComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            nameValue: props.patientEntity.name,
            mailValue: props.patientEntity.mail,
            ageValue: props.patientEntity.age,
            phoneValue:  props.patientEntity.phoneNumber,
            genderValue: props.patientEntity.gender,
        }


        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.ageRef = React.createRef();
        this.phoneRef = React.createRef();
        this.genderRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.editPatient = this.editPatient.bind(this);
    }

    handleChange = (event) => {
        this.setState({
          image: event.target.files[0]
        });        
    }

    editPatient() {
        const {userEntity, patientEntity} = this.props;
        const { image } = this.state;
        const patientInfo = new PatientEntity(patientEntity.id, this.nameRef.current.value, this.emailRef.current.value, this.genderRef.current.value,
            this.ageRef.current.value, this.phoneRef.current.value, image , userEntity.userId)
        const editPatientUseCase = new EditPatientUseCase(userEntity.userId, patientInfo);
        editPatientUseCase.run()
    }




    render() {
        const { nameValue, mailValue, ageValue, phoneValue, genderValue } = this.state;
        return (
            <div className="main-pane">
                <p>
                    Nombre:
                </p>
                <input ref={this.nameRef} defaultValue={nameValue} >
                </input>
                <p>
                    Email:
                </p>
                <input ref={this.emailRef} defaultValue={mailValue}>
                </input>
                <p>
                    Edad:
                </p>
                <input ref={this.ageRef} defaultValue={ageValue}>
                </input>
                <p>
                    Teléfono:
                </p>
                <input ref={this.phoneRef} defaultValue={phoneValue}>
                </input>
                <p>
                    Género:
                </p>
                <select ref={this.genderRef} defaultValue={genderValue}>
                    <option value={1} selected>Hombre</option> 
                    <option value={2}>Mujer</option>
                    <option value={3}>Otro</option>
                </select>

                <input
                    type="file"
                    ref={(input) => { this.filesInput = input }}
                    name="file"
                    accept="image/png, image/jpeg"
                    icon='file text outline'
                    label='Subir imagen del paciente'
                    placeholder='Subir imagen'
                    onChange={this.handleChange}
                />

                <button
                className="modal-button"
                onClick={this.editPatient}>
                    Editar paciente
                </button>
            </div>
        )
    }
}
export default EditDetailedPatientComponent

EditDetailedPatientComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
    patientEntity: PropTypes.instanceOf(PatientEntity),
}