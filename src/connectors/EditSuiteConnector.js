import axios from 'axios';
import NewSuiteConnectorInterface from '../interfaces/connectors/NewSuiteConnectorInterface';

export default class EditSuiteConnector extends NewSuiteConnectorInterface {
    constructor(userId, suiteEntity) {
        super();

        this.userId = userId;
        this.suiteEntity = suiteEntity;
        this.formData = new FormData();
        this.formData.append('csv', this.suiteEntity.csv);
        this.formData.append('video', this.suiteEntity.video);
        this._includeSuiteEntityToFormData();
        this.url = `${process.env.REACT_APP_URL}${this.userId}/suites/${this.suiteEntity.id}`;
    }

    editSuite() {
        axios.defaults.withCredentials = true;
        return axios({
          method: 'put',
          url: this.url,
          data: this.formData,
          headers: {
              'Content-Type': 'multipart/form-data',
          },
          withCredentials: false,
      })
        .then((response) => 
        {
          return response.status;
        })
        .catch((error) => { 
          return Promise.reject(error);
        })
      }

      _includeSuiteEntityToFormData(){
        if(this.suiteEntity.id){
          this.formData.set('id', this.suiteEntity.id);
        }
        if(this.suiteEntity.name){
          this.formData.set('name', this.suiteEntity.name);
        }
        if(this.suiteEntity.date){
          this.formData.set('date', `${this.suiteEntity.date.getFullYear()}-${this.suiteEntity.date.getMonth()+1}-${this.suiteEntity.date.getDate()}`);
        }
        if(this.suiteEntity.userId){
          this.formData.set('userId', this.suiteEntity.userId);
        }
        if(this.suiteEntity.username){
          this.formData.set('username', this.suiteEntity.username);
        }
        if(this.suiteEntity.patientId){
          this.formData.set('patientId', this.suiteEntity.patientId);
        }
        if(this.suiteEntity.diagnosisId){
          this.formData.set('diagnosisId', this.suiteEntity.diagnosisId);
        }
        if(this.suiteEntity.customFields){
          this.formData.set('customFields', JSON.stringify(this.suiteEntity.customFields));
        }
        if(this.suiteEntity.type){
          this.formData.set('type', this.suiteEntity.type);
        }
      }
}


