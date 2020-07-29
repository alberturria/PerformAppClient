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


class PatientsMainPaneComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            patients: null,
            loading: false,
            newPatient: false,
        };

        this.references = {};

        this.loadPatient = this.loadPatient.bind(this);
        this.getOrCreateRef = this.getOrCreateRef.bind(this);
        this.loadAllPatients = this.loadAllPatients.bind(this);
        this._renderNewPatient = this._renderNewPatient.bind(this);
        this._closeDetailedPatient = this._closeDetailedPatient.bind(this);
    }

    componentDidMount() {
        this.loadAllPatients();
    }

    _renderNewPatient() {
        this.setState({newPatient: true});
    }

    loadAllPatients() {
        const { userEntity } = this.props;
        this.setState({ loading: true });
        const getAllPatientsUseCase = new GetAllPatientsUseCase(userEntity.userId);
        getAllPatientsUseCase.run()
        .then(() => {
            const patients = getAllPatientsUseCase.getResult();
            this.setState({ patients: patients, loading:false });
        });
    }

    getOrCreateRef(id) {
        if (!this.references.hasOwnProperty(id)) {
            this.references[id] = React.createRef();
        }
        return this.references[id];
    }

    loadPatient(patientId) {
        const { userEntity } = this.props;
        const getPatientUseCase = new GetPatientUseCase(userEntity.userId, patientId); 
        getPatientUseCase.run()
        .then(() => {
            const patient = getPatientUseCase.getPatientEntity();
            this.references[patientId].current.setState({loading: false});

            this.setState({loadedPatient: patient});
        });

    }

    _closeDetailedPatient() {
        this.setState({loadedPatient: null, loadedWaves: null});
    }


    _renderPatients() {
        const { loading, patients } = this.state;
        const { userEntity } = this.props;
        if( loading ){
            return (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        }
        if (patients === null && loading) {
            return(
                <p>No tienes pruebas, importa una desde 'Datos'</p>
            )
        }
        if (patients !== null && loading === false)
        {
            const renderedPatients = patients.map((patient, key) =>
                <PatientElementListComponent
                loadPatientCallback={this.loadPatient}
                key={key} patientEntity={patient}
                ref={this.getOrCreateRef(patient.id)}
                reloadPatientsCallback={this.loadAllPatients}
                userEntity={userEntity}
                />
            );
            if(renderedPatients.length > 0){
                return(
                    <ul className='suite-ul'>
                        { renderedPatients }
                    </ul>
                );
            }else{
                return(
                    <NoSuitesComponent userEntity={userEntity} reloadSuitesCallback={this.loadAllPatients}/>
                );
            }
        }
    }


    render() {
        const { userEntity } = this.props;
        const { newPatient, loadedPatient } = this.state;
        
        if (newPatient){
            return <NewPatientComponent userEntity={userEntity} />
        }

        if(loadedPatient) {
            return <DetailedPatientComponent userEntity={userEntity} patientEntity={loadedPatient} closeDetailedPatientCallback={this._closeDetailedPatient} />
        }

        return (
            <div className="main-pane">
                <div className="informative-main-pane-header">
                    Pacientes
                </div>
                <button className="modal-button" onClick={this._renderNewPatient}>
                    Crear paciente
                </button>
                <div className='informative-main-pane-message'>
                    {this._renderPatients()}
                </div>
            </div>
        )
    }
}
export default PatientsMainPaneComponent

PatientsMainPaneComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
}
