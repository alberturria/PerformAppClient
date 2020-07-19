import React, { Component } from "react";
import GetSavedWavesUseCase from "../useCases/GetSavedWavesUseCase";
import NoWavesComponent from "./NoWavesComponent";
import SavedWaveComponent from "./SavedWaveComponent";
import PropTypes from 'prop-types';
import 'react-tabs/style/react-tabs.css';
import LogOutComponent from "./LogOutComponent";
import UserEntity from "../entities/UserEntity";
import InformativeMainPaneComponent from "./InformativeMainPaneComponent";
import DataMainPaneComponent from "./DataMainPaneComponent";
import SuitesMainPaneComponent from "./SuitesMainPaneComponent";


class Menu extends Component {
  constructor(props){
    super(props);

    this.state = {
      savedWaves: [],
      selectedTab:0
    } 

    this._showInicio = this._showInicio.bind(this);
    this._renderSavedWaves = this._renderSavedWaves.bind(this);
    this._selectDatosTab = this._selectDatosTab.bind(this);
    this._selectPruebasTab = this._selectPruebasTab.bind(this);
    this._renderMainPane = this._renderMainPane.bind(this);
  }

  componentDidMount() {
    this._showInicio();
  }


  _showInicio() {
    const getSavedWavesUseCase = new GetSavedWavesUseCase(); 
    getSavedWavesUseCase.run()
      .then(() => {
        const savedWaves = getSavedWavesUseCase.getSavedWaves();
        this.setState({savedWaves: savedWaves});
      });
  }

  _selectDatosTab() {
    this.setState({selectedTab: 3});
  }

  _selectPruebasTab() {
    this.setState({selectedTab: 2});
  }

  _renderSavedWaves() {
    const { savedWaves } = this.state;

    if (savedWaves.length === 0) {
        return <NoWavesComponent />;
    }

    return savedWaves.map(({
        id, muscle, rms, raw, avgRms, mvc, historicMvc
    }) => (
        <SavedWaveComponent
            id={id}
            muscle={muscle}
            rms={rms}
            raw={raw}
            avgRms={avgRms}
            mvc={mvc}
            historicMvc={historicMvc}
        />
    ));
  }

  _renderMainPane() {
    const { userEntity } = this.props;
    const { selectedTab } = this.state;

    if(selectedTab === 3){
      return (<DataMainPaneComponent userEntity={userEntity}/>);
    } else if(selectedTab === 2){
      return (<SuitesMainPaneComponent userEntity={userEntity}/>);
    }
    return (<InformativeMainPaneComponent userEntity={userEntity}/>);
  }

  render() {
    const { logOutCallback } = this.props;
    return (
      <React.Fragment>
        <div className='nav-main'>
          <div className='nav-logo'>
          </div>
          <div >
            <ul className='nav-main-list'>
              <li className='nav-main-list-li'>
                <button className='nav-main-list-button'>Inicio</button>
              </li>
              <li className='nav-main-list-li'>
                <button className='nav-main-list-button' onClick={this._selectPruebasTab}>Pruebas</button>
              </li>
              <li className='nav-main-list-li'>
                <button className='nav-main-list-button' onClick={this._selectDatosTab}>Datos</button>
              </li>
            </ul>

            <ul className='nav-second-list'>
              <li className='nav-main-list-li'>
                <LogOutComponent logOutCallback={logOutCallback} />
              </li>
            </ul>

          </div>

        </div>
       {this._renderMainPane()}
      </React.Fragment>
    );
  }
}

export default Menu;

Menu.propTypes = {
  logOutCallback: PropTypes.func.isRequired,
  userEntity: PropTypes.instanceOf(UserEntity).isRequired,
}