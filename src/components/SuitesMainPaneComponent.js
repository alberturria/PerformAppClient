import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import GetAllSuitesUseCase from "../useCases/GetAllSuitesUseCase";
import SuiteElementListComponent from "./SuiteElementListComponent";
import GetSuiteUseCase from "../useCases/GetSuiteUseCase";
import DetailedSuiteComponent from "./DetailedSuiteComponent";
import NoSuitesComponent from "./NoSuitesComponent";
import NewSuiteComponent from "./NewSuiteComponent";
import EditDetailedSuiteComponent from "./EditDetailedSuiteComponent";


class SuitesMainPaneComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            suites: null,
            loading: false,
        };

        this.references = {};

        this.loadSuite = this.loadSuite.bind(this);
        this._closeDetailedSuite = this._closeDetailedSuite.bind(this);
        this.getOrCreateRef = this.getOrCreateRef.bind(this);
        this.loadAllSuites = this.loadAllSuites.bind(this);
        this._renderNewSuite = this._renderNewSuite.bind(this);
        this.showEditSuite = this.showEditSuite.bind(this);
    }

    componentDidMount() {
        this.loadAllSuites();
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

    getOrCreateRef(id) {
        if (!this.references.hasOwnProperty(id)) {
            this.references[id] = React.createRef();
        }
        return this.references[id];
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

    showEditSuite(suiteId) {
        const { userEntity } = this.props;
        const getSuiteUseCase = new GetSuiteUseCase(userEntity.userId, suiteId); 
        getSuiteUseCase.run()
        .then(() => {
            const suite = getSuiteUseCase.getSuiteEntity();
            this.references[suiteId].current.setState({loading: false});

            this.setState({loadedSuite: suite, editing: true});
        });

    }

    _closeDetailedSuite() {
        this.setState({loadSuite: null, loadedWaves: null});
    }

    _renderNewSuite() {
        this.setState({ newSuite: true });
    }


    _renderSuites() {
        const { loading, suites } = this.state;
        const { userEntity } = this.props;
        if( loading ){
            return (
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            )
        }
        if (suites === null && loading) {
            return(
                <p>No tienes pruebas, importa una desde 'Datos'</p>
            )
        }
        if (suites !== null && loading === false)
        {
            const renderedSuites = suites.map((suite, key) =>
                <SuiteElementListComponent
                key={key} suiteEntity={suite}
                loadSuiteCallback={this.loadSuite}
                ref={this.getOrCreateRef(suite.id)}
                reloadSuitesCallback={this.loadAllSuites}
                editSuiteCallback={this.showEditSuite}
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
                    <NoSuitesComponent userEntity={userEntity} reloadSuitesCallback={this.loadAllSuites}/>
                );
            }
        }
    }


    render() {
        const { userEntity } = this.props;
        const { loadedSuite, loadedWaves, newSuite, editing } = this.state;

        if (newSuite){
            return <NewSuiteComponent userEntity={userEntity} />
        }

        if(loadedSuite && editing) {
            return <EditDetailedSuiteComponent suiteEntity={loadedSuite} userEntity={userEntity} closeDetailedSuiteCallback={this._closeDetailedSuite} />
        }
        
        if (loadedSuite && loadedWaves){
            return <DetailedSuiteComponent suite={loadedSuite} waves={loadedWaves} closeDetailedSuiteCallback={this._closeDetailedSuite} />
        }

        return (
            <div className="main-pane">
                <div className="informative-main-pane-header">
                    Pruebas
                </div>
                <button className="modal-button" onClick={this._renderNewSuite}>
                    Crear prueba
                </button>
                <div className='informative-main-pane-message'>
                    {this._renderSuites()}
                </div>
            </div>
        )
    }
}
export default SuitesMainPaneComponent

SuitesMainPaneComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
}
