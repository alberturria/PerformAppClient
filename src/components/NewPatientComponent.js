import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import PatientEntity from "../entities/PatientEntity";
import NewPatientUseCase from "../useCases/NewPatientUseCase";



class NewPatientComponent extends Component{
    constructor(props){
        super(props);


        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.ageRef = React.createRef();
        this.phoneRef = React.createRef();
        this.genderRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.createPatient = this.createPatient.bind(this);
    }

    handleChange = (event) => {
        this.setState({
          image: event.target.files[0]
        });        
    }

    createPatient() {
        const {userEntity} = this.props;
        const { image } = this.state;
        const patientInfo = new PatientEntity(null, this.nameRef.current.value, this.emailRef.current.value, this.genderRef.current.value,
            this.ageRef.current.value, this.phoneRef.current.value, image , userEntity.userId)
        const newPatientUseCase = new NewPatientUseCase(userEntity.userId, patientInfo);
        newPatientUseCase.run()
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
                    Email:
                </p>
                <input ref={this.emailRef}>
                </input>
                <p>
                    Edad:
                </p>
                <input ref={this.ageRef}>
                </input>
                <p>
                    Teléfono:
                </p>
                <input ref={this.phoneRef}>
                </input>
                <p>
                    Género:
                </p>
                <select ref={this.genderRef}>
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
                onClick={this.createPatient}>
                    Crear paciente
                </button>
            </div>
        )
    }
}
export default NewPatientComponent

NewPatientComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
}
