import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import DiagnosisEntity from "../entities/DiagnosisEntity";
import EditDiagnosisUseCase from "../useCases/EditDiagnosisUseCase";
import GetAllSuitesUseCase from "../useCases/GetAllSuitesUseCase";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



class EditDetailedDiagnosisComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            nameValue: props.diagnosisEntity.name,
            descriptionValue: props.diagnosisEntity.description,
            videoValue: props.diagnosisEntity.video,
            suiteValue:  props.diagnosisEntity.suite,
            success: false,
            error: false,
        }


        this.nameRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.suiteRef = React.createRef();
        this.videoRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.editDiagnosis = this.editDiagnosis.bind(this);
    }

    componentDidMount() {
        const { userEntity } = this.props;
        this.setState({ loading: true });
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
            videoValue: event.target.files[0]
        });        
    }

    editDiagnosis() {
        const {userEntity, diagnosisEntity} = this.props;
        const { videoValue } = this.state;
        const diagnosisInfo = new DiagnosisEntity(diagnosisEntity.id, this.nameRef.current.value, this.descriptionRef.current.value, videoValue,
           userEntity.userId, this.suiteRef.current.value)
        const editDiagnosisUseCase = new EditDiagnosisUseCase(userEntity, diagnosisInfo);
        editDiagnosisUseCase.run()
        .then(() => {
            this.setState({success: true})
        })
        .catch(() => {
            this.setState({error: true});
        });
    }

    handleClose () {
        this.setState({success: false, error:false});
     };


    render() {
        const { nameValue, descriptionValue, suiteValue, suitesOptions, success, error} = this.state;
        const { diagnosisEntity } = this.props;
        return (
            <div className="main-pane">
                <div className="informative-main-pane-header">
                    {diagnosisEntity.name}
                </div>
                <div className='detailed-diagnosis-container'>
                    <div className='edit-diagnosis-container'>
                        <label className='parameter'>
                            Nombre:
                        
                            <input ref={this.nameRef} defaultValue={nameValue} className='input-parameter' >
                            </input>
                        </label>
                        <label className='parameter'>
                            Prueba relacionada:
                            <select ref={this.suiteRef} defaultValue={suiteValue} className='input-parameter'>
                                {suitesOptions}
                            </select>
                        </label>
                    </div>
                    <div className='edit-diagnosis-container'>
                        <div className='video-diagnosis-container'>
                            <label className='parameter'>
                                Descripción:
                            </label>
                            <textarea ref={this.descriptionRef} defaultValue={descriptionValue} className='input-parameter diagnosis-description-textarea'>
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
                </div>
                
                <button
                className="modal-button"
                onClick={this.editDiagnosis}>
                    Editar diagnóstico
                </button>
                <Snackbar open={success} autoHideDuration={4000} onClose={this.handleClose}>
                    <Alert  severity="success">
                    El diagnóstico ha sido editado correctamente
                    </Alert>
                </Snackbar>
                <Snackbar open={error} autoHideDuration={4000} onClose={this.handleClose}>
                    <Alert  severity="error">
                    El diagnóstico no ha podido ser editado
                    </Alert>
                </Snackbar>
            </div>
        )
    }
}
export default EditDetailedDiagnosisComponent

EditDetailedDiagnosisComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
    diagnosisEntity: PropTypes.instanceOf(DiagnosisEntity),
}