import axios from 'axios';
import EditDiagnosisConnectorInterface from '../interfaces/connectors/EditDiagnosisConnectorInterface';
import DiagnosisEntity from '../entities/DiagnosisEntity';

export default class EditDiagnosisConnector extends EditDiagnosisConnectorInterface {
    constructor(userEntity, diagnosisEntity) {
        super();

        this.userEntity = userEntity;
        this.diagnosisEntity = diagnosisEntity;
        this.formData = new FormData();
        this.formData.append('video', this.diagnosisEntity.video);
        this._includeDiagnosisEntityToFormData();
        this.url = `${process.env.REACT_APP_URL}${this.userEntity.userId}/diagnoses/${this.diagnosisEntity.id}`;
    }

    editDiagnosis() {
        axios.defaults.withCredentials = true;
        return axios({
          method: 'put',
          url: this.url,
          data: this.formData,
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Token ${this.userEntity.token}`
          },
          withCredentials: false,
      })
        .then((response) => 
        {
          const diagnosis = response.data.diagnosis;
          this.diagnosisEntity = new DiagnosisEntity(diagnosis.id, diagnosis.name, diagnosis.description, diagnosis.video, diagnosis.suite_id, diagnosis.owner_id);
        })
        .catch((error) => { 
          return Promise.reject(error);
        })
      }

      getDiagnosisEntity(){
        return this.diagnosisEntity;
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


