import axios from 'axios';

import CreateSampleDiagnosesConnectorInterface from '../interfaces/connectors/CreateSampleDiagnosesConnectorInterface';
import DiagnosisEntity from '../entities/DiagnosisEntity';

export default class CreateSampleDiagnosesConnector extends CreateSampleDiagnosesConnectorInterface {
    constructor(userId) {
        super();

        this.userId = userId;
        this.url = `${process.env.REACT_APP_URL}${this.userId}/diagnoses-sample-data`;
    }

    createSampleDiagnoses() {
        axios.defaults.withCredentials = true;
        return axios({
          method: 'post',
          url: this.url,
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
          },
          withCredentials: false,
      })
      .then((diagnoses) => {
        const returnedDiagnoses = [];
        
        for (let index = 0; index < Object.keys(diagnoses.data).length; index++){
          const diagnosis = diagnoses.data[index];
          const diagnosisEntity = new DiagnosisEntity(diagnosis.id, diagnosis.description, diagnosis.video, diagnosis.owner_id, diagnosis.suite_id);
          
            returnedDiagnoses.push(diagnosisEntity);
        }

        this.returnedDiagnoses = returnedDiagnoses;
      })
    }

    getDiagnoses(){
      return this.returnedDiagnoses;
    }

    
}


