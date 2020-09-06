import axios from 'axios';
import GetAllSuitesConnectorInterface from '../interfaces/connectors/GetAllSuitesConnectorInterface';
import SuiteEntity from '../entities/SuiteEntity';
import CustomFieldEntity from '../entities/CustomFieldEntity';

export default class GetAllSuitesConnector extends GetAllSuitesConnectorInterface {
    constructor(userEntity) {
        super();

        this.userEntity = userEntity;
        this.url = `${process.env.REACT_APP_URL}${this.userEntity.userId}/suites-catalog`;
    }

    getAllSuites() {
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
      .then((suites) => {
        const returnedSuites = [];
        
        for (let index = 0; index < Object.keys(suites.data).length; index++){
          const suite = suites.data[index];
        /*  const customFields = [];
          if (suite.custom_fields && suite.custom_fields.length>0){
             for (let indexCustomFields = 0; indexCustomFields < suite.custom_fields.length; indexCustomFields+=1){
              customFields.push(new CustomFieldEntity(suite.custom_fields[indexCustomFields].id, suite.custom_fields[indexCustomFields].parameter,
                suite.custom_fields[indexCustomFields].value, suite.custom_fields[indexCustomFields].suiteId))
             }
          }
          */
          const suiteEntity = new SuiteEntity(suite.id, suite.name, suite.date, suite.user_id, suite.username, suite.patient_id, suite.patient_name, suite.diagnosis_id, suite.diagnosis_name, null, null, null, suite.type);
          
          returnedSuites.push(suiteEntity);
        }

        this.returnedSuites = returnedSuites;
      })
    }

    getSuites(){
      return this.returnedSuites;
    }

    
}


