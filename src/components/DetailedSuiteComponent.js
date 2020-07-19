import React, { Component } from "react";
import PropTypes from 'prop-types';
import Popup from "reactjs-popup";
import SuiteEntity from "../entities/SuiteEntity";
import DeleteSuiteUseCase from "../useCases/DeleteSuiteUseCase";
import WaveEntity from "../entities/WaveEntity";
import SavedWaveComponent from "./SavedWaveComponent";



class DetailedSuiteComponent extends Component{
    constructor(props){
        super(props);

        this._renderDetailedWaves = this._renderDetailedWaves.bind(this);
    }

    _renderDetailedWaves() {
        const { waves } = this.props;
        
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
            />
            );
        return returnedWaves;
    }

    render() {
        const {suite, closeDetailedSuiteCallback} = this.props;

        return (
            <div className="main-pane">
                <button className="modal-button modal-logout-button detailed-suite-close" onClick={closeDetailedSuiteCallback}>
                    Atrás
                </button>
                <div className="informative-main-pane-header">
                    {suite.name}
                </div>
                <div className='informative-main-pane-message overflow-y'>
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
    closeDetailedSuiteCallback: PropTypes.func.isRequired,
}
