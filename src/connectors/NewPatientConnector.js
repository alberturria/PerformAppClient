import axios from 'axios';
import NewPatientConnectorInterface from '../interfaces/connectors/NewPatientConnectorInterface';

export default class NewPatientConnector extends NewPatientConnectorInterface {
    constructor(userEntity, patientEntity) {
        super();

        this.userEntity = userEntity;
        this.patientEntity = patientEntity;
        this.formData = new FormData();
        this.formData.append('photo', this.patientEntity.photo);
        this._includePatientEntityToFormData();
        this.url = `${process.env.REACT_APP_URL}${this.userEntity.userId}/patients`;
    }

    createPatient() {
        axios.defaults.withCredentials = true;
        return axios({
          method: 'post',
          url: this.url,
          data: this.formData,
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Token ${this.userEntity.token}`
          },
          withCredentials: false,
      })
      }

      _includePatientEntityToFormData(){
        if(this.patientEntity.id){
          this.formData.set('id', this.patientEntity.id);
        }
        if(this.patientEntity.name){
          this.formData.set('name', this.patientEntity.name);
        }
        if(this.patientEntity.mail){
          this.formData.set('mail', this.patientEntity.mail);
        }
        if(this.patientEntity.gender){
          this.formData.set('gender', this.patientEntity.gender);
        }
        if(this.patientEntity.age){
          this.formData.set('age', this.patientEntity.age);
        }
        if(this.patientEntity.phoneNumber){
          this.formData.set('phoneNumber', this.patientEntity.phoneNumber);
        }
        if(this.patientEntity.suite){
          this.formData.set('suite', this.patientEntity.suite);
        }
        if(this.patientEntity.ownerId){
          this.formData.set('ownerId', this.patientEntity.ownerId);
        }
      }
}


