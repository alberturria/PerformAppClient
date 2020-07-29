import axios from 'axios';
import DeletePatientConnectorInterface from '../interfaces/connectors/DeletePatientConnectorInterface';

export default class DeletePatientConnector extends DeletePatientConnectorInterface {
    constructor(userId, patientId) {
        super();

        this.userId = userId;
        this.patientId = patientId;
        this.url = `${process.env.REACT_APP_URL}${this.userId}/patients/${this.patientId}`;
    }

    deletePatient() {
        axios.defaults.withCredentials = true;
        return axios({
          method: 'delete',
          url: this.url,
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
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


