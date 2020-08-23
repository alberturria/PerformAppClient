import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import PatientEntity from "../entities/PatientEntity";
import SuiteEntity from "../entities/SuiteEntity";
import SuiteElementListComponent from "./SuiteElementListComponent";
import NoSuitesComponent from "./NoSuitesComponent";
import GetSuiteUseCase from "../useCases/GetSuiteUseCase";
import GetAllSuitesUseCase from "../useCases/GetAllSuitesUseCase";



class DetailedPatientComponent extends Component{
    constructor(props){
        super(props);
        this.references = {};
        this._renderRelatedSuites = this._renderRelatedSuites.bind(this);
        this.getOrCreateRef = this.getOrCreateRef.bind(this);
        this.loadSuite = this.loadSuite.bind(this);
        this.loadAllSuites = this.loadAllSuites.bind(this);
        this._renderGender = this._renderGender.bind(this);
    }

    getOrCreateRef(id) {
        if (!this.references.hasOwnProperty(id)) {
            this.references[id] = React.createRef();
        }
        return this.references[id];
    }

    loadAllSuites() {
        const { userEntity } = this.props;
        this.setState({ loading: true });
        const getAllSuitesUseCase = new GetAllSuitesUseCase(userEntity.userId);
        getAllSuitesUseCase.run()
        .then(() => {
            const suites = getAllSuitesUseCase.getResult();
            this.setState({ suites: suites, loading:false });
        });
    }

    loadSuite(suiteID) {
        const { userEntity } = this.props;
        const getSuiteUseCase = new GetSuiteUseCase(userEntity.userId, suiteID); 
        getSuiteUseCase.run()
        .then(() => {
            const suite = getSuiteUseCase.getSuiteEntity();
            const waves = getSuiteUseCase.getWavesEntities();
            this.references[suiteID].current.setState({loading: false});

            this.setState({loadedSuite: suite,  loadedWaves:waves });
        });

    }

    _renderGender() {
        const {patientEntity} = this.props;
        if(patientEntity.gender === 1){
            return 'Hombre';
        }
        else if(patientEntity.gender === 2){
            return 'Mujer';
        }
        else{
            return 'Otro';
        }
    }

    _renderRelatedSuites() {
        const { relatedSuites } = this.props

        const renderedSuites = relatedSuites.map((suite, key) =>
            <SuiteElementListComponent
            key={key} suiteEntity={suite}
            loadSuiteCallback={this.loadSuite}
            ref={this.getOrCreateRef(suite.id)}
            reloadSuitesCallback={this.loadAllSuites}
            />
        );
        if(renderedSuites.length > 0){
            return(
                <ul className='suite-ul'>
                    { renderedSuites }
                </ul>
            );
        }else{
            return(
                <p className='parameter'>
                    Este paciente aún no tiene pruebas.
                </p>
            );
        }

    }

    render() {
        const {patientEntity, closeDetailedPatientCallback} = this.props;

        return (
            <div className="main-pane">
                <button className="modal-button modal-logout-button detailed-suite-close" onClick={closeDetailedPatientCallback}>
                    Atrás
                </button>
                <div className="informative-main-pane-header">
                    {patientEntity.name}
                </div>
                <div className='detailed-patient-container'>
                    <img src={patientEntity.photo} alt="Imagen del usuario" width='250px'/>
                    <div className='patient-info-container'>
                        <p>
                            <span className='parameter'>Nombre:</span> {patientEntity.name}
                        </p>
                        <p>
                            <span className='parameter'>Email:</span> {patientEntity.mail}
                        </p>
                        <p>
                            <span className='parameter'>Género:</span> {this._renderGender()}
                        </p>
                    </div>
                    <div className='patient-info-container'>
                        <p>
                            <span className='parameter'>Edad:</span> {patientEntity.age}
                        </p>
                        <p>
                            <span className='parameter'>Teléfono:</span> {patientEntity.phoneNumber}
                        </p>
                    </div>
                    
                    
                </div>
                {this._renderRelatedSuites()}  
            </div>
        )
    }
}
export default DetailedPatientComponent

DetailedPatientComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
    patientEntity: PropTypes.instanceOf(PatientEntity),
    closeDetailedPatientCallback: PropTypes.func.isRequired,
    relatedSuites: PropTypes.arrayOf(PropTypes.instanceOf(SuiteEntity)),
}
