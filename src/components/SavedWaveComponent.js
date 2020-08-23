import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from 'prop-types';
import ChartComponent from "./ChartComponent";
import GetRmsSectionsUseCase from "../useCases/GetRmsSectionsUseCase";
import WaveStatisticsEntity from "../entities/WaveStatisticsEntity";


class SavedWaveComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            parsedMuscle: null,
            rmsSections: null,
            loading:false,
        };

        this.rmsChartRef = React.createRef();


        this._parseMuscleName = this._parseMuscleName.bind(this);
        this._getRmsSections = this._getRmsSections.bind(this);
        this._renderStatistics = this._renderStatistics.bind(this);
    }

    componentDidMount() {
        this._parseMuscleName();
    }

    _parseMuscleName() {
        const { muscle } = this.props;

        const parsedMuscle = muscle.split('_')[1];
        this.setState({ parsedMuscle: parsedMuscle });
    }

    _getRmsSections() {
        const { id } = this.props;
        this.setState({ loading: true });
        const getRmsSectionsUseCase = new GetRmsSectionsUseCase(id);

        getRmsSectionsUseCase.run()
            .then(() => {
                const rmsSections = getRmsSectionsUseCase.getRmsSections();
                this.setState({ rmsSections: rmsSections, loading: false });
                this.rmsChartRef.current.hoverSections(rmsSections);
            });
    }

    _renderStatistics() {
        const { statisticsEntity } = this.props;
        if (statisticsEntity){
            return(
                <div className="single-muscle-container">
                    <div className='wave-parameter-container'>
                        <p>
                            <span className='parameter'>Kurtosis:</span> {statisticsEntity.kurtosis.toFixed(3)}
                        </p>
                        <p>
                            <span className='parameter'>Entropía:</span> {statisticsEntity.entropy.toFixed(3)}
                        </p>
                        <p>
                            <span className='parameter'>Valor máximo:</span> {statisticsEntity.maximum.toFixed(3)}
                        </p>
                        <p>
                            <span className='parameter'>Valor mínimo:</span> {statisticsEntity.minimum.toFixed(3)}
                        </p>
                    </div>
                    <div className='wave-parameter-container'>
                        <p>
                            <span className='parameter'>Cruces por cero:</span> {statisticsEntity.zeroCrossingCounts}
                        </p>
                        <p>
                            <span className='parameter'>Media aritmética:</span> {statisticsEntity.arithmeticMean.toFixed(3)}
                        </p>
                        <p>
                            <span className='parameter'>Media armónica: </span>{statisticsEntity.harmonicMean.toFixed(3)}
                        </p>
                        <p>
                           <span className='parameter'>Media geométrica:</span> {statisticsEntity.geometricMean.toFixed(3)}
                        </p>
                    </div>
                    <div className='wave-parameter-container'>
                        <p>
                            <span className='parameter'>Media recortada:</span> {statisticsEntity.trimmedMean.toFixed(3)}
                        </p>
                        <p>
                           <span className='parameter'> Mediana:</span> {statisticsEntity.median.toFixed(3)}
                        </p>
                        <p>
                            <span className='parameter'>Moda:</span> {statisticsEntity.mode.toFixed(3)}
                        </p>
                        <p>
                            <span className='parameter'>Varianza:</span> {statisticsEntity.variance.toFixed(3)}
                        </p>
                    </div>
                </div>
                )
        }else{
            return null;
        }
    }

    _renderSpinner() {
        const { loading } = this.state;
        if(loading){
            return (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        }
    }

    _renderSections() {
        const { rmsSections } = this.state;

        if (rmsSections) {
            const renderedSections = rmsSections.map(({
                start, end, values, waveId
            }) => (
                <ChartComponent title={`Sección`} data={values} start={start} />
            ));

            return(
                <div className="wave-sections-container">
                    {renderedSections}
                </div>
            )
        }
    }

    render() {
        const { id, rms, raw, avgRms, mvc, historicMvc } = this.props;
        const { parsedMuscle } = this.state;

        return (
            <div className='flex-chart-container'>
                <div className="wave-title bubble">
                    <p className="wave-info-title">{parsedMuscle}</p>
                </div>
                <div className="single-muscle-container">
                    <div>
                        <p> <span className='wave-field'>Nombre del músculo:</span> {parsedMuscle}</p>
                        <p> <span className='wave-field'>RMS medio:</span> {avgRms} </p> 
                    </div>
                    <div>
                        <p> <span className='wave-field'>Máxima contracción voluntaria:</span> {mvc} </p> 
                        <p> <span className='wave-field'>Máxima contracción voluntaria histórica: </span>{historicMvc} </p>
                    </div>
                </div>
                <ChartComponent ref={this.rmsChartRef} title="RMS" data={rms} />
                <button
                    className='modal-button'
                    onClick={this._getRmsSections}>
                    Ver contracciones
                </button>
                {this._renderSpinner()}
                {this._renderSections()}
                {this._renderStatistics()}
            </div>
        )
    }
}
export default SavedWaveComponent

SavedWaveComponent.propTypes = {
    id: PropTypes.number.isRequired,
    muscle: PropTypes.string.isRequired,
    rms: PropTypes.array.isRequired,
    raw: PropTypes.array.isRequired,
    avgRms: PropTypes.number.isRequired,
    mvc: PropTypes.number.isRequired,
    historicMvc: PropTypes.number.isRequired,
    statisticsEntity: PropTypes.instanceOf(WaveStatisticsEntity).isRequired,
}