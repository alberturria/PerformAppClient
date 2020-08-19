import React, { Component } from "react";
import PropTypes from 'prop-types';
import UserEntity from "../entities/UserEntity";
import CSVReader from "react-csv-reader";
import ImportDataUseCase from "../useCases/ImportDataUseCase";


class DataMainPaneComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            parsedMuscle: null,
            rmsSections: null,
            loading:false,
        };

        this.handleFile = this.handleFile.bind(this);
        this.handleError = this.handleError.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleError() {
        return <p className="registration-error">Ha habido un error, inténtelo de nuevo.</p> 
    }

    handleFile(data, fileInfo) {
        const { userEntity } = this.props;
        const importDataUseCase = new ImportDataUseCase(userEntity.userId, data, fileInfo);
        importDataUseCase.run()
    }

    handleChange = (event) => {
        const { userEntity } = this.props;

        this.setState({
          csv: event.target.files[0]
        });
        
        const importDataUseCase = new ImportDataUseCase(userEntity.userId, event.target.files[0]);
        importDataUseCase.run();
    }


    render() {
        

        return (
            <div className="main-pane">
                <div className="informative-main-pane-header">
                    Data
                </div>
                <div className='informative-main-pane-message'>
                    <input
                        type="file"
                        ref={(input) => { this.filesInput = input }}
                        name="file"
                        icon='file text outline'
                        label='csv'
                        placeholder='Subir fichero'
                        onChange={this.handleChange}
                        />
                </div>
                <button className='import-data-button'>
                    Importar datos
                </button>
            </div>
        )
    }
}
export default DataMainPaneComponent

DataMainPaneComponent.propTypes = {
    userEntity: PropTypes.instanceOf(UserEntity),
}
