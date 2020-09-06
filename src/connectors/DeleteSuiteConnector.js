import axios from 'axios';
import DeleteSuiteConnectorInterface from '../interfaces/connectors/DeleteSuiteConnectorInterface';

export default class DeleteSuiteConnector extends DeleteSuiteConnectorInterface {
    constructor(userEntity, suiteId) {
        super();

        this.userEntity = userEntity;
        this.suiteId = suiteId;
        this.url = `${process.env.REACT_APP_URL}${this.userEntity.userId}/suites/${this.suiteId}`;
    }

    deleteSuite() {
        axios.defaults.withCredentials = true;
        return axios({
          method: 'delete',
          url: this.url,
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Token ${this.userEntity.token}`
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


