import React, { Component } from "react";
import PropTypes from 'prop-types';
import SuiteEntity from "../entities/SuiteEntity";
import WaveEntity from "../entities/WaveEntity";
import SavedWaveComponent from "./SavedWaveComponent";
import GetDiagnosisUseCase from "../useCases/GetDiagnosisUseCase";
import GetPatientUseCase from "../useCases/GetPatientUseCase";
import UserEntity from "../entities/UserEntity";
import GroupSignalChartComponent from "./GroupSignalChartComponent";
import ColumnComponent from "./ColumnComponent";
import PieComponent from "./PieComponent";
import GetWaveStatisticsUseCase from "../useCases/GetWaveStatisticsUseCase";
import GetFatigueAnalysisUseCase from "../useCases/GetFatigueAnalysisUseCase";



class DetailedSuiteComponent extends Component{
    constructor(props){
        super(props);

        this.state = { diagnosis: null, patient: null, activationData: null, simmetryData: null, statistics: null, fatigueEntities: null };
        this._renderDetailedWaves = this._renderDetailedWaves.bind(this);
        this._renderDiagnosis = this._renderDiagnosis.bind(this);
        this._renderPatient = this._renderPatient.bind(this);
        this._renderSuiteVideo = this._renderSuiteVideo.bind(this);
        this._calculateActivation = this._calculateActivation.bind(this);
        this._calculateSymmetry = this._calculateSymmetry.bind(this);
        this._renderGender = this._renderGender.bind(this);
        this._renderCustomFields = this._renderCustomFields.bind(this);
        this._renderFatigueAnalysis = this._renderFatigueAnalysis.bind(this);
    }

    componentDidMount() {
        const { suite, userEntity } = this.props;
        const getDiagnosisUseCase = new GetDiagnosisUseCase(userEntity.userId, suite.diagnosisId);
        getDiagnosisUseCase.run()
        .then(() => {
            const diagnosis = getDiagnosisUseCase.getDiagnosisEntity();
            this.setState({ diagnosis: diagnosis, loading:false });
        });

        const getPatientUseCase = new GetPatientUseCase(userEntity.userId, suite.patientId);
        getPatientUseCase.run()
        .then(() => {
            const patient = getPatientUseCase.getPatientEntity();
            this.setState({ patient: patient, loading:false });
        });

        const getWaveStatisticsUseCase = new GetWaveStatisticsUseCase(userEntity.userId, suite.id);
        getWaveStatisticsUseCase.run()
        .then(() => {
            const statistics = getWaveStatisticsUseCase.getStatisticsEntities();
            this.setState({ statistics: statistics, loading:false });
        });

        const getFatigueAnalysisUseCase = new GetFatigueAnalysisUseCase(userEntity.userId, suite.id);
        getFatigueAnalysisUseCase.run()
        .then(() => {
            const fatigueEntities = getFatigueAnalysisUseCase.getFatigueEntities();
            this.setState({ fatigueEntities: fatigueEntities, loading:false });
        });

        this._calculateActivation();
        this._calculateSymmetry();
    }

    _calculateActivation() {
        const { waves } = this.props;
        const activationData = [];
        let totalRMS = 0;
        for(let index=0; index < waves.length; index+=1){
            totalRMS = totalRMS + waves[index].avgRms;
        }

        for(let index=0; index < waves.length; index+=1){
            const value = waves[index].avgRms * 100 / totalRMS;
            const label = waves[index].muscle.split('_')[1];
            activationData.push({ y: value, label: label})
        }
       this.setState({activationData: activationData});
    }

    _calculateSymmetry() {
        const { waves } = this.props;
        const symmetryData = [];
        let firstCoupleSymmetry = 0;
        let secondCoupleSymmetry = 0;
        let firstCoupleLabel = `${waves[0].muscle.split('_')[1]} - ${waves[2].muscle.split('_')[1]}`;
        let secondCoupleLabel = `${waves[1].muscle.split('_')[1]} - ${waves[3].muscle.split('_')[1]}`;
        
        if (waves[0].avgRms > waves[2].avgRms){
            firstCoupleSymmetry = (waves[2].avgRms / waves[0].avgRms) * 100;
        } else{
            firstCoupleSymmetry = (waves[0].avgRms / waves[2].avgRms) * 100;
        }

        if (waves[1].avgRms > waves[3].avgRms){
            secondCoupleSymmetry = (waves[3].avgRms / waves[1].avgRms) * 100;
        } else{
            secondCoupleSymmetry = (waves[1].avgRms / waves[3].avgRms) * 100;
        }

       symmetryData.push({ y: firstCoupleSymmetry, label:firstCoupleLabel});
       symmetryData.push({ y: secondCoupleSymmetry, label:secondCoupleLabel});
       this.setState({simmetryData: symmetryData});
    }

    _renderGender() {
        const { patient } = this.state;
        if(patient.gender === 1){
            return 'Hombre';
        }
        else if(patient.gender === 2){
            return 'Mujer';
        }
        else{
            return 'Otro';
        }
    }

    _renderDetailedWaves() {
        const { waves } = this.props;
        const { statistics } = this.state;
        
        if (statistics){
            const returnedWaves = waves.map((wave, key) =>
                <SavedWaveComponent
                    key={key}
                    id={wave.id}
                    muscle={wave.muscle}
                    rms={wave.rms}
                    raw={wave.raw}
                    avgRms={wave.avgRms}
                    mvc={wave.mvc}
                    historicMvc={wave.historicMvc}
                    statisticsEntity={statistics[key]}
                />
                );
                const renderedContent = [];

                for (var i = 0; i < returnedWaves.length; i+=2){
                    renderedContent.push(
                        <div className='dual-chart-container'>
                            {returnedWaves[i]}
                            {returnedWaves[i+1]}
                        </div>
                    )
                }
            return renderedContent;
        } else {
            return null;
        }
    }

    _renderDiagnosis() {
        const { diagnosis } = this.state;
        if (diagnosis) {
            return(
                <React.Fragment>
                    <div className='detailed-diagnosis-container'>
                        <p>
                            <span className='parameter'>Nombre del diagnóstico:</span> {diagnosis.name}
                        </p>
                        <div className='video-diagnosis-container'>
                        <span className='parameter'>Vídeo asociado al diagnóstico: </span>
                            <video width="320" height="240" controls>
                                <source src={diagnosis.video} type="video/mp4" />
                                Su navegador no soporta la reproducción de video.
                            </video> 
                        </div>
                    </div>
                    <div className='diagnosis-description'>
                        <span className='parameter'>Descripción:</span> {diagnosis.description}
                    </div>
                </React.Fragment>
            );

        }
        return null;
    }

    _renderPatient() {
        const { patient } = this.state;
        if (patient) {
            return(
                <div className='detailed-patient-container'>
                    <img src={patient.photo} alt="Imagen del usuario" width='250px'/>
                    <div className='patient-info-container'>
                        <p>
                            <span className='parameter'>Nombre:</span> {patient.name}
                        </p>
                        <p>
                            <span className='parameter'>Email:</span> {patient.mail}
                        </p>
                        <p>
                            <span className='parameter'>Género:</span> {this._renderGender()}
                        </p>
                    </div>
                    <div className='patient-info-container'>
                        <p>
                            <span className='parameter'>Edad:</span> {patient.age} años
                        </p>
                        <p>
                            <span className='parameter'>Teléfono:</span> {patient.phoneNumber}
                        </p>
                    </div>
                </div>
            );

        }
        return null;
    }

    _renderSuiteVideo() {
        const { suite } = this.props;
        if (suite.video) {
            return (
                <React.Fragment>
                    <p className='parameter'>Video durante la realización de la prueba</p>
                    <video width="320" height="240" controls>
                        <source src={suite.video} type="video/mp4" />
                        Su navegador no soporta la reproducción de video.
                    </video>
                </React.Fragment>
            )
        }
    }

    _renderCustomFields() {
        const { suite } = this.props;
        const customFields = suite.customFields;
        const renderedCustomFields = [];
        for(var i = 0; i < customFields.length; i+=1) {
            renderedCustomFields.push(
                <div>
                    <p>
                        <span className='parameter'>{customFields[i].parameter}:</span> {customFields[i].value}
                    </p>
                </div>
            );
        }
        return(
            <React.Fragment>
                {renderedCustomFields}
            </React.Fragment>
        )
    }

    _renderFatigueAnalysis() {
        const { fatigueEntities } = this.state;
        const renderedFatigueEntities = [];
        if(fatigueEntities) {
            for(var i = 0; i < fatigueEntities.length; i+=1) {
                const musclesNames = `${fatigueEntities[i].muscle1Name.split('_')[1]} - ${fatigueEntities[i].muscle2Name.split('_')[1]}`;
                const value = (fatigueEntities[i].muscle2Power * 100) / fatigueEntities[i].muscle1Power;
                if (value > 100 ) {
                    const renderedValue = ((fatigueEntities[i].muscle2Power * 100) / fatigueEntities[i].muscle1Power) - 100;
                    renderedFatigueEntities.push(
                            <p>
                                La pareja de músculos {musclesNames} han sufrido un aumento de la fatiga un {renderedValue.toFixed(2)}%
                            </p>
                    );

                } else {
                    const renderedValue = 100 - ((fatigueEntities[i].muscle2Power * 100) / fatigueEntities[i].muscle1Power);
                    renderedFatigueEntities.push(
                            <p>
                                La pareja de músculos {musclesNames} han sufrido un decremento de la fatiga un {renderedValue.toFixed(2)}%
                            </p>
                    );
                }
            }
            return(
                <div className='fatigue-container'>
                    <p className='parameter'>Análisis de fatiga</p>
                    {renderedFatigueEntities}
                </div>
            )
        } else {
            return null;
        }
    }   

    render() {
        const {suite, waves, closeDetailedSuiteCallback} = this.props;
        const {activationData, simmetryData} = this.state;
        const rawData = [];
        const rawNames = [];
        const filteredData = [];
        const filteredNames = [];
        
        for (var i=0; i < waves.length; i+=1) {
            const wave_cutted_raw = [];
            for (var j=0; j < waves.length; j+=25){
                wave_cutted_raw.push(waves[i].raw[j]);
            }
            rawData.push(wave_cutted_raw);
            rawNames.push(waves[i].muscle.split('_')[1]);
            filteredData.push(waves[i].rms);
            filteredNames.push(waves[i].muscle.split('_')[1]);
        }

        return (
            <div className="main-pane">
                <button className="modal-button modal-logout-button detailed-suite-close" onClick={closeDetailedSuiteCallback}>
                    Atrás
                </button>
                <div className="informative-main-pane-header">
                    {suite.name}
                </div>
                {this._renderCustomFields()}
                {this._renderSuiteVideo()}
                {this._renderDiagnosis()}
                {this._renderPatient()}
                <div className='informative-main-pane-message'>
                    <div className='dual-chart-container'>
                        <div className='flex-chart-container'>
                            <GroupSignalChartComponent title='Señales sin filtrar' data={rawData} names={rawNames}  legendX='Tiempo (0.025s)'/>
                        </div>
                        <div className='flex-chart-container'>
                            <GroupSignalChartComponent title='Señales filtradas' data={filteredData} names={filteredNames} legendX='Tiempo (0.25s)'/>
                        </div>
                    </div>
                    {this._renderFatigueAnalysis()}
                    <div className='dual-chart-container'>
                        <div className='flex-chart-container'>
                            <PieComponent title='Activación Muscular' data={activationData} yAxisTitle='Porcentaje de activación (%)'/>
                        </div>
                        <div className='flex-chart-container'>
                            <ColumnComponent title='Simetría Muscular' data={simmetryData} yAxisTitle='Porcentaje de simetría (%)'/>
                        </div>
                    </div>
                    {this._renderDetailedWaves()}
                </div>
            </div>
        )
    }
}
export default DetailedSuiteComponent

DetailedSuiteComponent.propTypes = {
    suite: PropTypes.instanceOf(SuiteEntity),
    waves: PropTypes.arrayOf(WaveEntity).isRequired,
    userEntity: PropTypes.arrayOf(UserEntity).isRequired,
    closeDetailedSuiteCallback: PropTypes.func.isRequired,
}
