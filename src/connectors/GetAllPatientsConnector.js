import axios from 'axios';

import PatientEntity from '../entities/PatientEntity';
import GetAllPatientsConnectorInterface from '../interfaces/connectors/GetAllPatientsConnectorInterface';

export default class GetAllPatientsConnector extends GetAllPatientsConnectorInterface {
    constructor(userId) {
        super();

        this.userId = userId;
        this.url = `${process.env.REACT_APP_URL}${this.userId}/patients`;
    }

    getAllPatients() {
        axios.defaults.withCredentials = true;
        return axios({
          method: 'get',
          url: this.url,
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
          },
          withCredentials: false,
      })
      .then((patients) => {
        const returnedPatients = [];
        
        for (let index = 0; index < Object.keys(patients.data).length; index++){
          const patientEntity = new PatientEntity(patients.data[index].id, patients.data[index].name, patients.data[index].mail, patients.data[index].gender, patients.data[index].age,
            patients.data[index].phone_number, patients.data[index].photo, patients.data[index].owner_id);
          
          returnedPatients.push(patientEntity);
        }

        this.returnedPatients = returnedPatients;
      })
    }

    getPatients(){
      return this.returnedPatients;
    }

    
}


