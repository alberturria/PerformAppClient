import axios from 'axios';
import WaveEntity from '../entities/WaveEntity';
import PatientEntity from '../entities/PatientEntity';
import GetPatientConnectorInterface from '../interfaces/connectors/GetPatientConnectorInterface';

export default class GetPatientConnector extends GetPatientConnectorInterface{
    constructor(userId, patientId) {
        super();

        this.userId = userId;
        this.patientId = patientId;
        this.url = `${process.env.REACT_APP_URL}${this.userId}/patients/${this.patientId}`;
    }

    getPatient() {
        axios.defaults.withCredentials = true;
        return axios({
          method: 'get',
          url: this.url,
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
          },
          withCredentials: false,
      })
        .then((response) => 
        {
          const data = response.data.patient;
          this.patientEntity = new PatientEntity(data.id, data.name, data.mail, data.gender, data.age, data.phone_number, data.photo, data.owner_id);

        })
        .catch(error => console.log(error))
      
      }

    getPatientEntity(){
      return this.patientEntity;
    }

    

    
}


