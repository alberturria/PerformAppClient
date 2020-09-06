import axios from 'axios';
import DeleteDiagnosisConnectorInterface from '../interfaces/connectors/DeletePatientConnectorInterface copy';

export default class DeleteDiagnosisConnector extends DeleteDiagnosisConnectorInterface {
    constructor(userEntity, diagnosisId) {
        super();

        this.userEntity = userEntity;
        this.diagnosisId = diagnosisId;
        this.url = `${process.env.REACT_APP_URL}${this.userEntity.userId}/diagnoses/${this.diagnosisId}`;
    }

    deleteDiagnosis() {
        axios.defaults.withCredentials = true;
        return axios({
          method: 'delete',
          url: this.url,
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Token ${this.userEntity.token}`
          },
          withCredentials: false,
      })
        .then((response) => 
        {
          this.userInfo = {userId: response.data.user_id, username: response.data.username };
        })
        .catch(error => console.log(error))
      
      }

    getUserId(){
      return this.userInfo;
    }

    
}


