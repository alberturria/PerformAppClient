import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import NoSuitesComponent from "./NoSuitesComponent";
import DetailedPatientComponent from "./DetailedPatientComponent";
import EditDetailedPatientComponent from "./EditDetailedPatientComponent";
import GetAllDiagnosesUseCase from "../useCases/GetAllDiagnosesUseCase";
import NewDiagnosisComponent from "./NewDiagnosisComponent";
import GetDiagnosisUseCase from "../useCases/GetDiagnosisUseCase";
import DiagnosisElementListComponent from "./DiagnosisElementListComponent";
import DetailedDiagnosisComponent from "./DetailedDiagnosisComponent";
import EditDetailedDiagnosisComponent from "./EditDetailedDiagnosisComponent";
import CreateSampleDiagnosesUseCase from "../useCases/CreateSampleDiagnosesUseCase";


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
        this._closeDetailedDiagnosis = this._closeDetailedDiagnosis.bind(this);
        this._renderCreateSampleDiagnoses = this._renderCreateSampleDiagnoses.bind(this);
        this._createSampleDiagnoses = this._createSampleDiagnoses.bind(this);
    }

    componentDidMount() {
        this.loadAllDiagnoses();
    }

    _renderNewDiagnosis() {
        this.setState({newDiagnosis: true});
    }

    loadAllDiagnoses() {
        const { userEntity } = this.props;
        this.setState({ loading: true });
        const getAllDiagnosesUseCase = new GetAllDiagnosesUseCase(userEntity.userId);
        getAllDiagnosesUseCase.run()
        .then(() => {
            const diagnoses = getAllDiagnosesUseCase.getResult();
            this.setState({ diagnoses: diagnoses, loading:false });
        });
    }

    getOrCreateRef(id) {
        if (!this.references.hasOwnProperty(id)) {
            this.references[id] = React.createRef();
        }
        return this.references[id];
    }

    loadDiagnosis(diagnosisId) {
        const { userEntity } = this.props;
        const getDiagnosisUseCase = new GetDiagnosisUseCase(userEntity.userId, diagnosisId); 
        getDiagnosisUseCase.run()
        .then(() => {
            const diagnosis = getDiagnosisUseCase.getDiagnosisEntity();
            this.references[diagnosisId].current.setState({loading: false});

            this.setState({loadedDiagnosis: diagnosis});
        });
    }

    showEditDiagnosis(diagnosisId) {
        const { userEntity } = this.props;
        const getDiagnosisUseCase = new GetDiagnosisUseCase(userEntity.userId, diagnosisId); 
        getDiagnosisUseCase.run()
        .then(() => {
            const diagnosis = getDiagnosisUseCase.getDiagnosisEntity();
            this.references[diagnosisId].current.setState({loading: false});

            this.setState({loadedDiagnosis: diagnosis, editing: true});
        });

    }

    _closeDetailedDiagnosis() {
        this.setState({loadedDiagnosis: null, loadedWaves: null});
    }

    _createSampleDiagnoses() {
        const { userEntity } = this.props;
        this.setState({ loading: true });
        const createSampleDiagnosesUseCase = new CreateSampleDiagnosesUseCase(userEntity.userId);
        createSampleDiagnosesUseCase.run()
        .then(() => {
            const diagnoses = createSampleDiagnosesUseCase.getDiagnoses();
            this.setState({ diagnoses: diagnoses, loading:false });
        });
    }

    _renderCreateSampleDiagnoses() {
        const { diagnoses, loading } = this.state;
        if ((!diagnoses || diagnoses.length === 0) && !loading) {
            return (
                <div className='informative-main-pane-message'>
                <p>Actualmente no tiene ningún diagnóstico guardado, puede usar datos de prueba clicando en el botón</p>
                <button className="modal-button" onClick={this._createSampleDiagnoses}>
                    Usar datos de prueba
                </button>
            </div>
            );
        }
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
            const renderedDiagnoses = diagnoses.map((diagnosis, key) =>
                <DiagnosisElementListComponent
                loadDiagnosisCallback={this.loadDiagnosis}
                editDiagnosisCallback={this.showEditDiagnosis}
                key={key} diagnosisEntity={diagnosis}
                ref={this.getOrCreateRef(diagnosis.id)}
                reloadDiagnosesCallback={this.loadAllDiagnoses}
                userEntity={userEntity}
                />
            );
            if(renderedDiagnoses.length > 0){
                return(
                    <table>
                    <thead>
                        <tr>
                            <th>
                                Nombre
                            </th>
                            <th>
                                Prueba
                            </th>
                            <th>
                                Paciente
                            </th>
                            <th>

                            </th>
                            <th>

                            </th>
                            <th>
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { renderedDiagnoses }
                    </tbody>
                </table>
                );
            }
        }
    }


    render() {
        const { userEntity } = this.props;
        const { newDiagnosis, loadedDiagnosis, editing } = this.state;
        
        if (newDiagnosis){
            return <NewDiagnosisComponent userEntity={userEntity} />
        }

        if(loadedDiagnosis && editing) {
            return <EditDetailedDiagnosisComponent userEntity={userEntity} diagnosisEntity={loadedDiagnosis} closeDetailedDiagnosisCallback={this._closeDetailedDiagnosis} />
        }

        if(loadedDiagnosis) {
            return <DetailedDiagnosisComponent userEntity={userEntity} diagnosisEntity={loadedDiagnosis} closeDetailedDiagnosisCallback={this._closeDetailedDiagnosis} />
        }

        return (
            <div className="main-pane">
                <div className="informative-main-pane-header">
                    Diagnósticos
                </div>
                <button className="modal-button" onClick={this._renderNewDiagnosis}>
                    Crear diagnóstico
                </button>
                {this._renderCreateSampleDiagnoses()}
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
