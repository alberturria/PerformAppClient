import axios from 'axios';
import WaveEntity from '../entities/WaveEntity';
import PatientEntity from '../entities/PatientEntity';
import GetPatientConnectorInterface from '../interfaces/connectors/GetPatientConnectorInterface';
import SuiteEntity from '../entities/SuiteEntity';

export default class GetPatientConnector extends GetPatientConnectorInterface{
    constructor(userEntity, patientId) {
        super();

        this.userEntity = userEntity;
        this.patientId = patientId;
        this.url = `${process.env.REACT_APP_URL}${this.userEntity.userId}/patients/${this.patientId}`;
    }

    getPatient() {
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
          const patient = response.data.patient;
          this.patientEntity = new PatientEntity(patient.id, patient.name, patient.mail, patient.gender, patient.age, patient.phone_number, patient.photo, patient.owner_id);

          const returnedSuites = [];
          const suites = response.data.suites
          for (let index = 0; index < Object.keys(suites).length; index++){
            const suiteEntity = new SuiteEntity(suites[index].id, suites[index].name, suites[index].date, suites[index].user_id, suites[index].username);
            
            returnedSuites.push(suiteEntity);
          }
  
          this.suitesEntities = returnedSuites;

        })
        .catch(error => console.log(error))
      
      }

    getPatientEntity(){
      return this.patientEntity;
    }

    getRelatedSuitesEntities(){
      return this.suitesEntities;
    }

    

    
}


