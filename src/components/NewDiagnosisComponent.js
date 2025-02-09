import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import DiagnosisEntity from "../entities/DiagnosisEntity";
import NewDiagnosisUseCase from "../useCases/NewDiagnosisUseCase";
import GetAllSuitesUseCase from "../useCases/GetAllSuitesUseCase";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class NewDiagnosisComponent extends Component{
    constructor(props){
        super(props);


        this.state = {suitesOptions: null};

        this.nameRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.suiteRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.createDiagnosis = this.createDiagnosis.bind(this);
    }

    componentDidMount() {
        const {userEntity} = this.props;
        const getAllSuitesUseCase = new GetAllSuitesUseCase(userEntity);
        getAllSuitesUseCase.run()
        .then(() => {
            const suites = getAllSuitesUseCase.getResult();
            const suitesOptions = [];
            suitesOptions.push(<option key={-1} value={null}></option>);
            for (var k = 0; k < suites.length; k++) {
                suitesOptions.push(<option key={k} value={suites[k].id}> {suites[k].name} </option>);
            }
            this.setState({ suitesOptions: suitesOptions, loading:false });
        });
    }

    handleChange = (event) => {
        this.setState({
            video: event.target.files[0]
        });        
    }

    handleClose () {
       this.setState({success: false, error:false});
    };

    createDiagnosis() {
        const {userEntity} = this.props;
        const { video } = this.state;
        let suiteId = this.suiteRef.current.value;
        if (this.suiteRef.current.value === ''){
            suiteId = null;
        }
        const diagnosisInfo = new DiagnosisEntity(null, this.nameRef.current.value, this.descriptionRef.current.value, video , userEntity.userId, suiteId)
        const newDiagnosisUseCase = new NewDiagnosisUseCase(userEntity, diagnosisInfo);
        newDiagnosisUseCase.run()
        .then(() => {
            this.setState({success: true})
        })
        .catch(() => {
            this.setState({error: true});
        });
    }

    render() {
        const { suitesOptions, success, error } = this.state;

        return (
            <div className="main-pane">
                 <div className="informative-main-pane-header">
                    Crear nuevo diagnóstico
                </div>
                    <div className='edit-diagnosis-container'>
                        <label className='parameter'>
                            Nombre:
                        
                            <input ref={this.nameRef} className='input-parameter' >
                            </input>
                        </label>
                        <label className='parameter'>
                            Prueba relacionada:
                            <select ref={this.suiteRef} className='input-parameter'>
                                {suitesOptions}
                            </select>
                        </label>
                    </div>
                    <div className='edit-diagnosis-container'>
                        <div className='video-diagnosis-container'>
                            <label className='parameter'>
                                Descripción:
                            </label>
                            <textarea ref={this.descriptionRef} className='input-parameter diagnosis-description-textarea'>
                            </textarea>
                            </div>
                        <label className='parameter'>
                            Nuevo vídeo:
                            <input
                                type="file"
                                ref={(input) => { this.filesInput = input }}
                                name="file"
                                accept="video/*"
                                icon='file text outline'
                                label='Subir vídeo del diagnóstico'
                                placeholder='Subir vídeo'
                                onChange={this.handleChange}
                                className='input-parameter'
                            />
                        </label>
                    </div>
                <button
                className="modal-button"
                onClick={this.createDiagnosis}>
                    Crear diagnóstico
                </button>
                <Snackbar open={success===true} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert  severity="success">
                    El diagnóstico ha sido creado
                    </Alert>
                </Snackbar>
                <Snackbar open={error===true} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert  severity="error">
                    El diagnóstico no ha podido ser creado
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}
export default NewDiagnosisComponent

NewDiagnosisComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
}
