import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GetAllDiagnosesUseCase from "../useCases/GetAllDiagnosesUseCase";
import GetAllPatientsUseCase from "../useCases/GetAllPatientsUseCase";
import SuiteEntity from "../entities/SuiteEntity";
import CustomFieldEntity from "../entities/CustomFieldEntity";
import EditSuiteUseCase from "../useCases/EditSuiteUseCase";



class EditDetailedSuiteComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            startDate: new Date(props.suiteEntity.date),
            customFields: []
          }; 
        this.parameterReferences = {};
        this.valueReferences = {};
        this.nameRef = React.createRef();
        this.patientRef = React.createRef();
        this.diagnosisRef = React.createRef();
        this.typeRef = React.createRef();
        this.dataRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleVideoChange = this.handleVideoChange.bind(this);
        this.getOrCreateValueRef = this.getOrCreateValueRef.bind(this);
        this.getOrCreateParameterRef = this.getOrCreateParameterRef.bind(this);
        this.editSuite = this.editSuite.bind(this);
        this.addCustomField = this.addCustomField.bind(this);
    }

    componentDidMount() {
        const { userEntity, suiteEntity } = this.props;
        this.setState({ loading: true });
        if (suiteEntity.customFields.length > 0){
            this.setState({customFields: suiteEntity.customFields});
        }
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

    editSuite() {
        const {userEntity, suiteEntity} = this.props;
        const { video, csv, startDate, customFields } = this.state;
        const customFieldsEntities = [];
        for (var i=0; i < customFields.length; i++){
            const customFieldEntity = new CustomFieldEntity(null, this.parameterReferences[i].current.value, this.valueReferences[i].current.value, null);
            customFieldsEntities.push(customFieldEntity);
        }
        const suiteInfo = new SuiteEntity(suiteEntity.id, this.nameRef.current.value, startDate, userEntity.userId, userEntity.username, this.patientRef.current.value, null, this.diagnosisRef.current.value, null, csv, video, customFieldsEntities, this.typeRef.current.value);
        const editSuiteUseCase = new EditSuiteUseCase(userEntity.userId, suiteInfo);
        editSuiteUseCase.run()
    }

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
                        <input ref={this.getOrCreateParameterRef(i)} defaultValue={customFields[i].parameter} className='input-parameter'></input>
                    </label>
                    <label className='parameter'>
                        Valor:
                        <input ref={this.getOrCreateValueRef(i)} defaultValue={customFields[i].value} className='input-parameter'></input>
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
        const {patientsOptions, diagnosesOptions} = this.state;
        const { suiteEntity } = this.props;

        return (
            <div className="main-pane">
                <div className="informative-main-pane-header">
                    {suiteEntity.name}
                </div>

                <div className='edit-suite-container'>
                    <div className='edit-suite-column-container'>
                    <label className='parameter'>
                        Nombre:
                        <input ref={this.nameRef} defaultValue={suiteEntity.name} className='input-parameter'>
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
                        <select ref={this.patientRef} defaultValue={suiteEntity.patientId} className='input-parameter'>
                            {patientsOptions}
                        </select>
                    </label>
                    
                    <label className='parameter'>
                        Diagnóstico:
                        <select ref={this.diagnosisRef} defaultValue={suiteEntity.diagnosisId} className='input-parameter'>
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
                        <select ref={this.typeRef} defaultValue={suiteEntity.type} className='input-parameter'>
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
                onClick={this.editSuite}>
                    Editar prueba
                </button>
            </div>
        )
    }
}
export default EditDetailedSuiteComponent

EditDetailedSuiteComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
    suiteEntity: PropTypes.instanceOf(SuiteEntity),
}
