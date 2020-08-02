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
        this._renderRelatedSuites = this._renderRelatedSuites.bind(this);
        this.loadSuite = this.loadSuite.bind(this);
        this.loadAllSuites = this.loadAllSuites.bind(this);
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
                <p>
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
                <p>
                    Nombre: {patientEntity.name}
                </p>
                <p>
                    Email: {patientEntity.mail}
                </p>
                <p>
                    Edad: {patientEntity.age}
                </p>
                <p>
                    Teléfono: {patientEntity.phoneNumber}
                </p>
                <p>
                    Género: {patientEntity.gender}
                </p>
                <img src={patientEntity.photo} alt="Imagen del usuario"/>
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
