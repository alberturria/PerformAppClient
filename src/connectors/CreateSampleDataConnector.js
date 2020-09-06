import axios from 'axios';
import CreateSampleDataConnectorInterface from '../interfaces/connectors/CreateSampleDataConnectorInterface';

export default class CreateSampleDataConnector extends CreateSampleDataConnectorInterface {
    constructor(userEntity) {
        super();

        this.userEntity = userEntity;
        this.url = `${process.env.REACT_APP_URL}${this.userEntity.userId}/create-sample-data`;
    }

    createSampleData() {
        axios.defaults.withCredentials = true;
        const data = {userId: this.userId}
        return axios({
          method: 'post',
          url: this.url,
          data: data,
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Token ${this.userEntity.token}`
          },
          withCredentials: false,
      })
        .then((response) => 
        {
          return response.status;
        })
        .catch((error) => { 
          return error;
        })
      }    
}


