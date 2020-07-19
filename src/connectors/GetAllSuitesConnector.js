import axios from 'axios';
import GetAllSuitesConnectorInterface from '../interfaces/connectors/GetAllSuitesConnectorInterface';
import SuiteEntity from '../entities/SuiteEntity';

export default class GetAllSuitesConnector extends GetAllSuitesConnectorInterface {
    constructor(userId) {
        super();

        this.userId = userId;
        this.url = `${process.env.REACT_APP_URL}${this.userId}/suites-catalog`;
    }

    getAllSuites() {
        axios.defaults.withCredentials = true;
        return axios({
          method: 'get',
          url: this.url,
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
          },
          withCredentials: false,
      })
      .then((suites) => {
        const returnedSuites = [];
        
        for (let index = 0; index < Object.keys(suites.data).length; index++){
          const suiteEntity = new SuiteEntity(suites.data[index].id, suites.data[index].name, suites.data[index].date, suites.data[index].user_id, suites.data[index].username);
          
          returnedSuites.push(suiteEntity);
        }

        this.returnedSuites = returnedSuites;
      })
    }

    getSuites(){
      return this.returnedSuites;
    }

    
}


