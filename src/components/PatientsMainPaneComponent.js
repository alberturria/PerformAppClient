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
import CreateSamplePatientsUseCase from "../useCases/CreateSamplePatientsUseCase";


class PatientsMainPaneComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            patients: null,
            loading: false,
            editing: false,
            newPatient: false,
        };

        this.references = {};

        this.loadPatient = this.loadPatient.bind(this);
        this.showEditPatient = this.showEditPatient.bind(this);
        this.getOrCreateRef = this.getOrCreateRef.bind(this);
        this.loadAllPatients = this.loadAllPatients.bind(this);
        this._renderNewPatient = this._renderNewPatient.bind(this);
        this._closeDetailedPatient = this._closeDetailedPatient.bind(this);
        this._renderCreateSamplePatients = this._renderCreateSamplePatients.bind(this);
        this._createSamplePatients = this._createSamplePatients.bind(this);
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
        const getAllPatientsUseCase = new GetAllPatientsUseCase(userEntity);
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
        const getPatientUseCase = new GetPatientUseCase(userEntity, patientId); 
        getPatientUseCase.run()
        .then(() => {
            const patient = getPatientUseCase.getPatientEntity();
            const relatedSuites = getPatientUseCase.getRelatedSuitesEntities();
            this.references[patientId].current.setState({loading: false});

            this.setState({loadedPatient: patient, loadedRelatedSuites: relatedSuites});
        });
    }

    showEditPatient(patientId) {
        const { userEntity } = this.props;
        const getPatientUseCase = new GetPatientUseCase(userEntity, patientId); 
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

    _createSamplePatients() {
        const { userEntity } = this.props;
        this.setState({ loading: true });
        const createSamplePatientsUseCase = new CreateSamplePatientsUseCase(userEntity);
        createSamplePatientsUseCase.run()
        .then(() => {
            const patients = createSamplePatientsUseCase.getPatients();
            this.setState({ patients: patients, loading:false });
        });
    }

    _renderCreateSamplePatients() {
        const { patients, loading } = this.state;
        if ((!patients || patients.length === 0) && !loading) {
            return (
                <div className='informative-main-pane-message'>
                <p>Actualmente no tiene ningún diagnóstico guardado, puede usar datos de prueba clicando en el botón</p>
                <button className="modal-button" onClick={this._createSamplePatients}>
                    Usar datos de prueba
                </button>
            </div>
            );
        }
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
                editPatientCallback={this.showEditPatient}
                key={key} patientEntity={patient}
                ref={this.getOrCreateRef(patient.id)}
                reloadPatientsCallback={this.loadAllPatients}
                userEntity={userEntity}
                />
            );
            if(renderedPatients.length > 0){
                return(
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Nombre
                                </th>
                                <th>
                                    Correo electrónico
                                </th>
                                <th>
                                    Género
                                </th>
                                <th>
                                    Edad
                                </th>
                                <th>
                                    Número de teléfono
                                </th>
                                <th>

                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            { renderedPatients }
                        </tbody>
                    </table>
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
                    Pacientes
                </div>
                <button className="modal-button" onClick={this._renderNewPatient}>
                    Crear paciente
                </button>
                {this._renderCreateSamplePatients()}
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
