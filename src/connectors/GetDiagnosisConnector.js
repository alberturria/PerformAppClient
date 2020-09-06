import axios from 'axios';
import GetDiagnosisConnectorInterface from '../interfaces/connectors/GetDiagnosisConnectorInterface';
import DiagnosisEntity from '../entities/DiagnosisEntity';

export default class GetDiagnosisConnector extends GetDiagnosisConnectorInterface{
    constructor(userEntity, diagnosisId) {
        super();

        this.userEntity = userEntity;
        this.diagnosisId = diagnosisId;
        this.url = `${process.env.REACT_APP_URL}${this.userEntity.userId}/diagnoses/${this.diagnosisId}`;
    }

    getDiagnosis() {
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
        .then((response) => 
        {
          const diagnosis = response.data.diagnosis;
          this.diagnosisEntity = new DiagnosisEntity(diagnosis.id, diagnosis.name, diagnosis.description, diagnosis.video, diagnosis.suite_id, diagnosis.owner_id);
        })
        .catch(error => console.log(error))
      
      }

    getDiagnosisEntity(){
      return this.diagnosisEntity;
    }
    
}


