import axios from 'axios';
import NewDiagnosisConnectorInterface from '../interfaces/connectors/NewDiagnosisConnectorInterface';

export default class NewDiagnosisConnector extends NewDiagnosisConnectorInterface {
    constructor(userId, diagnosisEntity) {
        super();

        this.userId = userId;
        this.diagnosisEntity = diagnosisEntity;
        this.formData = new FormData();
        this.formData.append('video', this.diagnosisEntity.video);
        this._includeDiagnosisEntityToFormData();
        this.url = `${process.env.REACT_APP_URL}${this.userId}/diagnoses`;
    }

    createDiagnosis() {
        axios.defaults.withCredentials = true;
        return axios({
          method: 'post',
          url: this.url,
          data: this.formData,
          headers: {
              'Content-Type': 'multipart/form-data',
          },
          withCredentials: false,
      })
      }

      _includeDiagnosisEntityToFormData(){
        if(this.diagnosisEntity.id){
          this.formData.set('id', this.diagnosisEntity.id);
        }
        if(this.diagnosisEntity.name){
          this.formData.set('name', this.diagnosisEntity.name);
        }
        if(this.diagnosisEntity.description){
          this.formData.set('description', this.diagnosisEntity.description);
        }
        if(this.diagnosisEntity.suiteId){
          this.formData.set('suiteId', this.diagnosisEntity.suiteId);
        }
        if(this.diagnosisEntity.ownerId){
          this.formData.set('ownerId', this.diagnosisEntity.ownerId);
        }
      }
}


