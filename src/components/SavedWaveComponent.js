import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from 'prop-types';
import ChartComponent from "./ChartComponent";
import GetRmsSectionsUseCase from "../useCases/GetRmsSectionsUseCase";


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
            <div className="wave-card">
                <div className="wave-title bubble">
                    <p className="wave-info-title">PACIENTE {id}</p>
                </div>
                <div className="wave-info bubble">
                    <ul>
                        <li className="li-wave-card-details"><p className='wave-field'>Nombre del músculo: </p>{parsedMuscle}</li>
                        <li className="li-wave-card-details"><p className='wave-field'>RMS medio: </p>{avgRms} </li>
                        <li className="li-wave-card-details"><p className='wave-field'>Máxima contracción voluntaria: </p>{mvc} </li>
                        <li className="li-wave-card-details"><p className='wave-field'>Máxima contracción voluntaria histórica: </p>{historicMvc} </li>
                    </ul>
                </div>
                <ChartComponent ref={this.rmsChartRef} title="RMS" data={rms} secondData={raw}/>
                <button
                    onClick={this._getRmsSections}>
                    Ver contracciones
                </button>
                {this._renderSpinner()}
                {this._renderSections()}
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
}