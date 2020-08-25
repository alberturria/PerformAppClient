import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import PatientEntity from "../entities/PatientEntity";
import NewPatientUseCase from "../useCases/NewPatientUseCase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GetAllDiagnosesUseCase from "../useCases/GetAllDiagnosesUseCase";
import GetAllPatientsUseCase from "../useCases/GetAllPatientsUseCase";
import SuiteEntity from "../entities/SuiteEntity";
import NewSuiteUseCase from "../useCases/NewSuiteUseCase";
import CustomFieldEntity from "../entities/CustomFieldEntity";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class NewSuiteComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            startDate: new Date(),
            customFields: [],
            success: false,
            error: false
          }; 
        this.parameterReferences = {};
        this.valueReferences = {};
        this.nameRef = React.createRef();
        this.patientRef = React.createRef();
        this.diagnosisRef = React.createRef();
        this.dataRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleVideoChange = this.handleVideoChange.bind(this);
        this.getOrCreateValueRef = this.getOrCreateValueRef.bind(this);
        this.getOrCreateParameterRef = this.getOrCreateParameterRef.bind(this);
        this.createSuite = this.createSuite.bind(this);
        this.addCustomField = this.addCustomField.bind(this);
    }

    componentDidMount() {
        const { userEntity } = this.props;
        this.setState({ loading: true });
        const getAllDiagnosesUseCase = new GetAllDiagnosesUseCase(userEntity.userId);
        getAllDiagnosesUseCase.run()
        .then(() => {
            const diagnoses = getAllDiagnosesUseCase.getResult();
            const diagnosesOptions = [];
            diagnosesOptions.push(<option key={-1} value={null}></option>);
            for (var k = 0; k < diagnoses.length; k++) {
                diagnosesOptions.push(<option key={k} value={diagnoses[k].id}> {diagnoses[k].name} </option>);
            }
            this.setState({ diagnosesOptions: diagnosesOptions, loading:false });
        });

        this.setState({ loading: true });
        const getAllPatientsUseCase = new GetAllPatientsUseCase(userEntity.userId);
        getAllPatientsUseCase.run()
        .then(() => {
            const patients = getAllPatientsUseCase.getResult();
            const patientsOptions = [];
            patientsOptions.push(<option key={-1} value={null}></option>);
            for (var k = 0; k < patients.length; k++) {
                patientsOptions.push(<option key={k} value={patients[k].id}> {patients[k].name} </option>);
            }
            this.setState({ patientsOptions: patientsOptions, loading:false });
        });
    }

    handleChange = (event) => {
        this.setState({
          csv: event.target.files[0]
        });        
    }

    handleDateChange = date => {
        this.setState({
          startDate: date
        });
    };

    handleVideoChange = (event) => {
        this.setState({
            video: event.target.files[0]
        });        
    }

    getOrCreateParameterRef(id) {
        if (!this.parameterReferences.hasOwnProperty(id)) {
            this.parameterReferences[id] = React.createRef();
        }
        return this.parameterReferences[id];
    }

    getOrCreateValueRef(id) {
        if (!this.valueReferences.hasOwnProperty(id)) {
            this.valueReferences[id] = React.createRef();
        }
        return this.valueReferences[id];
    }

    createSuite() {
        const {userEntity} = this.props;
        const { video, csv, startDate, customFields } = this.state;
        const customFieldsEntities = [];
        for (var i=0; i < customFields.length; i++){
            const customFieldEntity = new CustomFieldEntity(null, this.parameterReferences[i].current.value, this.valueReferences[i].current.value, null);
            customFieldsEntities.push(customFieldEntity);
        }
        const suiteInfo = new SuiteEntity(null, this.nameRef.current.value, startDate, userEntity.userId, userEntity.username, this.patientRef.current.value, null, this.diagnosisRef.current.value, null, csv, video, customFieldsEntities);
        const newSuiteUseCase = new NewSuiteUseCase(userEntity.userId, suiteInfo);
        newSuiteUseCase.run()
        .then(() => {
            this.setState({success: true})
        })
        .catch(() => {
            this.setState({error: true});
        });
    }

    handleClose () {
        this.setState({success: false, error:false});
     };

    addCustomField() {
        const { customFields } = this.state;
        const newCustomField = new CustomFieldEntity(null, null, null, null);
        customFields.push(newCustomField);
        this.setState({customFields});
    }


    _renderCustomFields(){
        const { customFields } = this.state;
        const renderedCustomFields = [];
        for(var i = 0; i < customFields.length; i+=1) {
            renderedCustomFields.push(
                <div>
                    <label className='parameter'>
                        Campo:
                        <input ref={this.getOrCreateParameterRef(i)} className='input-parameter'></input>
                    </label>
                    <label className='parameter'>
                        Valor:
                        <input ref={this.getOrCreateValueRef(i)} className='input-parameter'></input>
                    </label>
                </div>
            );
        }
        return(
            <React.Fragment>
                {renderedCustomFields}
                <button
                    className="modal-button"
                    onClick={this.addCustomField}
                >
                    Añadir campo personalizado
                </button>
            </React.Fragment>
        )
    }

    render() {
        const {patientsOptions, diagnosesOptions, success, error} = this.state;

        return (
            <div className="main-pane">
                <div className="informative-main-pane-header">
                    Crear nueva prueba
                </div>

                <div className='edit-suite-container'>
                    <div className='edit-suite-column-container'>
                    <label className='parameter'>
                        Nombre:
                        <input ref={this.nameRef} className='input-parameter'>
                        </input>
                    </label>
                    <label className='parameter'>
                        Fecha:
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            selected={this.state.startDate}
                            onChange={this.handleDateChange}
                            className='input-parameter'
                        />
                    </label>
                    <label className='parameter'>
                    Paciente:
                        <select ref={this.patientRef} className='input-parameter'>
                            {patientsOptions}
                        </select>
                    </label>
                    
                    <label className='parameter'>
                        Diagnóstico:
                        <select ref={this.diagnosisRef} className='input-parameter'>
                            {diagnosesOptions}
                        </select>
                    </label>
                    

                    <label className='parameter'>
                        Datos:
                        <input
                            type="file"
                            ref={(input) => { this.filesInput = input }}
                            name="file"
                            accept=".csv"
                            icon='file text outline'
                            label='Subir datos de la prueba'
                            placeholder='Subir datos'
                            onChange={this.handleChange}
                            className='input-parameter'
                        />
                    </label>            
                </div>
                <div className='video-diagnosis-container'>

                    <label className='parameter'>
                        Tipo:
                        <select ref={this.typeRef} className='input-parameter'>
                            <option value={null}></option> 
                            <option value={1}>Genérica</option> 
                            <option value={2}>Padel</option>
                            <option value={3}>Rehabilitación</option>
                        </select>
                    </label>

                    <label className='parameter'>
                        Vídeo:
                    </label>
                    <input
                        type="file"
                        ref={(input) => { this.filesInput = input }}
                        name="file"
                        accept="video/*"
                        icon='file text outline'
                        label='Subir video del diagnóstico'
                        placeholder='Subir video'
                        onChange={this.handleVideoChange}
                        className='input-parameter'
                    />

                    {this._renderCustomFields()}

                </div>
            </div>
                <button
                className="modal-button"
                onClick={this.createSuite}>
                    Crear prueba
                </button>
                <Snackbar open={success} autoHideDuration={4000} onClose={this.handleClose}>
                    <Alert  severity="success">
                    La prueba ha sido creada
                    </Alert>
                </Snackbar>
                <Snackbar open={error} autoHideDuration={4000} onClose={this.handleClose}>
                    <Alert  severity="error">
                    La prueba no ha podido ser creada
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}
export default NewSuiteComponent

NewSuiteComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
}
