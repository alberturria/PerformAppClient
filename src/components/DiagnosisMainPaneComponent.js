import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import NoSuitesComponent from "./NoSuitesComponent";
import NewPatientComponent from "./NewPatientComponent";
import PatientElementListComponent from "./PatientElementListComponent";
import GetAllPatientsUseCase from "../useCases/GetAllPatientsUseCase.js";
import GetPatientUseCase from "../useCases/GetPatientUseCase";
import DetailedPatientComponent from "./DetailedPatientComponent";
import EditDetailedPatientComponent from "./EditDetailedPatientComponent";


class DiagnosisMainPaneComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            diagnoses: null,
            loading: false,
            editing: false,
            newDiagnosis: false,
        };

        this.references = {};

        this.loadDiagnosis = this.loadDiagnosis.bind(this);
        this.showEditDiagnosis = this.showEditDiagnosis.bind(this);
        this.getOrCreateRef = this.getOrCreateRef.bind(this);
        this.loadAllDiagnoses = this.loadAllDiagnoses.bind(this);
        this._renderNewDiagnosis = this._renderNewDiagnosis.bind(this);
        this._closeDetailedPatient = this._closeDetailedPatient.bind(this);
    }

    componentDidMount() {
        this.loadAllDiagnoses();
    }

    _renderNewDiagnosis() {
        this.setState({newPatient: true});
    }

    loadAllDiagnoses() {
        const { userEntity } = this.props;
        this.setState({ loading: true });
        const getAllPatientsUseCase = new GetAllPatientsUseCase(userEntity.userId);
        getAllPatientsUseCase.run()
        .then(() => {
            const diagnoses = getAllPatientsUseCase.getResult();
            this.setState({ diagnoses: diagnoses, loading:false });
        });
    }

    getOrCreateRef(id) {
        if (!this.references.hasOwnProperty(id)) {
            this.references[id] = React.createRef();
        }
        return this.references[id];
    }

    loadDiagnosis(patientId) {
        const { userEntity } = this.props;
        const getPatientUseCase = new GetPatientUseCase(userEntity.userId, patientId); 
        getPatientUseCase.run()
        .then(() => {
            const patient = getPatientUseCase.getPatientEntity();
            const relatedSuites = getPatientUseCase.getRelatedSuitesEntities();
            this.references[patientId].current.setState({loading: false});

            this.setState({loadedPatient: patient, loadedRelatedSuites: relatedSuites});
        });
    }

    showEditDiagnosis(patientId) {
        const { userEntity } = this.props;
        const getPatientUseCase = new GetPatientUseCase(userEntity.userId, patientId); 
        getPatientUseCase.run()
        .then(() => {
            const patient = getPatientUseCase.getPatientEntity();
            this.references[patientId].current.setState({loading: false});

            this.setState({loadedPatient: patient, editing: true});
        });

    }

    _closeDetailedPatient() {
        this.setState({loadedPatient: null, loadedWaves: null});
    }


    _renderDiagnoses() {
        const { loading, diagnoses } = this.state;
        const { userEntity } = this.props;
        if( loading ){
            return (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        }
        if (diagnoses === null && loading) {
            return(
                <p>No tienes pruebas, importa una desde 'Datos'</p>
            )
        }
        if (diagnoses !== null && loading === false)
        {
            const renderedDiagnoses = diagnoses.map((patient, key) =>
                <PatientElementListComponent
                loadDiagnosisCallback={this.loadDiagnosis}
                editPatientCallback={this.showEditDiagnosis}
                key={key} patientEntity={patient}
                ref={this.getOrCreateRef(patient.id)}
                reloadPatientsCallback={this.loadAllDiagnoses}
                userEntity={userEntity}
                />
            );
            if(renderedDiagnoses.length > 0){
                return(
                    <ul className='suite-ul'>
                        { renderedDiagnoses }
                    </ul>
                );
            }else{
                return(
                    <NoSuitesComponent userEntity={userEntity} reloadSuitesCallback={this.loadAllDiagnoses}/>
                );
            }
        }
    }


    render() {
        const { userEntity } = this.props;
        const { newPatient, loadedPatient, loadedRelatedSuites, editing } = this.state;
        
        if (newPatient){
            return <NewPatientComponent userEntity={userEntity} />
        }

        if(loadedPatient && editing) {
            return <EditDetailedPatientComponent userEntity={userEntity} patientEntity={loadedPatient} closeDetailedPatientCallback={this._closeDetailedPatient} />
        }

        if(loadedPatient && loadedRelatedSuites) {
            return <DetailedPatientComponent userEntity={userEntity} patientEntity={loadedPatient} relatedSuites={loadedRelatedSuites} closeDetailedPatientCallback={this._closeDetailedPatient} />
        }

        return (
            <div className="main-pane">
                <div className="informative-main-pane-header">
                    Diagnósticos
                </div>
                <button className="modal-button" onClick={this._renderNewDiagnosis}>
                    Crear diagnóstico
                </button>
                <div className='informative-main-pane-message'>
                    {this._renderDiagnoses()}
                </div>
            </div>
        )
    }
}
export default DiagnosisMainPaneComponent

DiagnosisMainPaneComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
}
