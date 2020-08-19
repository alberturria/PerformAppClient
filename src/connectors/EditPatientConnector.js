import axios from 'axios';
import EditPatientConnectorInterface from '../interfaces/connectors/EditPatientConnectorInterface';
import PatientEntity from '../entities/PatientEntity';
import SuiteEntity from '../entities/SuiteEntity';

export default class EditPatientConnector extends EditPatientConnectorInterface {
    constructor(userId, patientEntity) {
        super();

        this.userId = userId;
        this.patientEntity = patientEntity;
        this.formData = new FormData();
        this.formData.append('photo', this.patientEntity.photo);
        this._includePatientEntityToFormData();
        this.url = `${process.env.REACT_APP_URL}${this.userId}/patients/${this.patientEntity.id}`;
    }

    editPatient() {
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
          const patient = response.data.patient;
          this.patientEntity = new PatientEntity(patient.id, patient.name, patient.mail, patient.gender, patient.age, patient.phone_number, patient.photo, patient.owner_id);

          const returnedSuites = [];
          const suites = response.data.suites
          for (let index = 0; index < Object.keys(suites).length; index++){
            const suiteEntity = new SuiteEntity(suites.data[index].id, suites.data[index].name, suites.data[index].date, suites.data[index].user_id, suites.data[index].username);
            
            returnedSuites.push(suiteEntity);
          }
  
          this.suitesEntities = returnedSuites;
        })
        .catch((error) => { 
          return error;
        })
      }

      getPatientEntity(){
        return this.patientEntity;
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


