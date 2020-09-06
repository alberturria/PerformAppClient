import axios from 'axios';

import GetAllDiagnosesConnectorInterface from '../interfaces/connectors/GetAllDiagnosesConnectorInterface';
import DiagnosisEntity from '../entities/DiagnosisEntity';

export default class GetAllDiagnosesConnector extends GetAllDiagnosesConnectorInterface {
    constructor(userEntity) {
        super();

        this.userEntity = userEntity;
        this.url = `${process.env.REACT_APP_URL}${this.userEntity.userId}/diagnoses`;
    }

    getAllDiagnoses() {
        axios.defaults.withCredentials = true;
        return axios({
          method: 'get',
          url: this.url,
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Token ${this.userEntity.token}`
          },
          withCredentials: false,
      })
      .then((diagnoses) => {
        const returnedDiagnoses = [];
        
        for (let index = 0; index < Object.keys(diagnoses.data).length; index++){
          const diagnosis = diagnoses.data[index];
          const diagnosisEntity = new DiagnosisEntity(diagnosis.id, diagnosis.name, diagnosis.description, diagnosis.video, diagnosis.owner_id, diagnosis.suite_id, diagnosis.suite_name,
            diagnosis.patient_name);
          
            returnedDiagnoses.push(diagnosisEntity);
        }

        this.returnedDiagnoses = returnedDiagnoses;
      })
    }

    getDiagnoses(){
      return this.returnedDiagnoses;
    }

    
}


