import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import PatientEntity from "../entities/PatientEntity";
import NewPatientUseCase from "../useCases/NewPatientUseCase";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class NewPatientComponent extends Component{
    constructor(props){
        super(props);


        this.state = {success: false, error: false};

        this.nameRef = React.createRef();
        this.emailRef = React.createRef();
        this.ageRef = React.createRef();
        this.phoneRef = React.createRef();
        this.genderRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.createPatient = this.createPatient.bind(this);
    }

    handleChange = (event) => {
        this.setState({
          image: event.target.files[0]
        });        
    }

    handleClose () {
        this.setState({success: false, error:false});
     };

    createPatient() {
        const {userEntity} = this.props;
        const { image } = this.state;
        const patientInfo = new PatientEntity(null, this.nameRef.current.value, this.emailRef.current.value, this.genderRef.current.value,
            this.ageRef.current.value, this.phoneRef.current.value, image , userEntity.userId)
        const newPatientUseCase = new NewPatientUseCase(userEntity.userId, patientInfo);
        newPatientUseCase.run()
        .then(() => {
            this.setState({success: true})
        })
        .catch(() => {
            this.setState({error: true});
        });
    }




    render() {
        const {success, error} = this.state;

        return (
            <div className="main-pane">
                <div className="informative-main-pane-header">
                        Crear nuevo paciente
                    </div>
                 <div className='detailed-patient-container'>
                    <div className='patient-info-container'>
                        <label className='parameter'>
                            Nombre:
                            
                            <input ref={this.nameRef} className='input-parameter' >
                            </input>
                        </label>
                        <br/>
                        <label className='parameter'>
                            Email:
                            
                            <input ref={this.emailRef} className='input-parameter'>
                            </input>
                        </label>
                        <br/>
                        <label className='parameter'>
                            Género:
                            
                            <select ref={this.genderRef}>
                                <option value={1} selected>Hombre</option> 
                                <option value={2}>Mujer</option>
                                <option value={3}>Otro</option>
                            </select>
                        </label>
                    </div>
                    <div className='patient-info-container'>
                        <label className='parameter'>
                            Edad:
                            <input ref={this.ageRef} className='input-parameter'>
                            </input>
                        </label>
                        <br/>
                        <label className='parameter'>
                            Teléfono:
                            <input ref={this.phoneRef} className='input-parameter'>
                            </input>  
                        </label>
                        <br/>
                        <label className='parameter'>
                            Imágen del usuario:
                            <input
                                type="file"
                                ref={(input) => { this.filesInput = input }}
                                name="file"
                                accept="image/png, image/jpeg"
                                icon='file text outline'
                                label='Subir imagen del paciente'
                                placeholder='Subir imagen'
                                onChange={this.handleChange}
                                className='input-parameter'
                            />
                        </label>
                    </div>
                </div>
                <button
                className="modal-button"
                onClick={this.createPatient}>
                    Crear paciente
                </button>
                <Snackbar open={success} autoHideDuration={4000} onClose={this.handleClose}>
                    <Alert  severity="success">
                    El paciente ha sido creado
                    </Alert>
                </Snackbar>
                <Snackbar open={error} autoHideDuration={4000} onClose={this.handleClose}>
                    <Alert  severity="error">
                    El paciente no ha podido ser creado
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}
export default NewPatientComponent

NewPatientComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
}
