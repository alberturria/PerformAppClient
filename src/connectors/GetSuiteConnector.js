import axios from 'axios';
import GetSuiteConnectorInterface from '../interfaces/connectors/GetSuiteConnectorInterface';
import WaveEntity from '../entities/WaveEntity';
import SuiteEntity from '../entities/SuiteEntity';
import CustomFieldEntity from '../entities/CustomFieldEntity';

export default class GetSuiteConnector extends GetSuiteConnectorInterface {
    constructor(userEntity, suiteId) {
        super();

        this.userEntity = userEntity;
        this.suiteId = suiteId;
        this.url = `${process.env.REACT_APP_URL}${this.userEntity.userId}/suites/${this.suiteId}`;
    }

    getSuite() {
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
          const suite = response.data.suite;
          const customFields = [];
          if (suite.custom_fields && suite.custom_fields.length>0){
             for (let indexCustomFields = 0; indexCustomFields < suite.custom_fields.length; indexCustomFields+=1){
              customFields.push(new CustomFieldEntity(suite.custom_fields[indexCustomFields].id, suite.custom_fields[indexCustomFields].parameter,
                suite.custom_fields[indexCustomFields].value, suite.custom_fields[indexCustomFields].suiteId))
             }
          }


          this.suiteEntity = new SuiteEntity(response.data.suite.id, response.data.suite.name, response.data.suite.date, response.data.suite.user_id,
            response.data.suite.username, suite.patient_id, suite.patient_name, suite.diagnosis_id, suite.diagnosis_name, null, suite.video, customFields, suite.type);
          this.wavesEntities = [];

          for (let index = 0; index < Object.keys(response.data.waves).length; index++){
            const id = response.data.waves[index]._id;
            const muscle = response.data.waves[index]._muscle;
            const rms = response.data.waves[index]._rms;
            const raw = response.data.waves[index]._raw;
            const avgRms = response.data.waves[index]._avg_rms;
            const mvc = response.data.waves[index]._mvc;
            const historicMvc = response.data.waves[index]._historic_mvc;
            const waveEntity = new WaveEntity(id, muscle, rms, raw, avgRms, mvc, historicMvc);
            this.wavesEntities.push(waveEntity);
          }
        })
        .catch(error => console.log(error))
      
      }

    getSuiteEntity(){
      return this.suiteEntity;
    }

    
    getWavesEntities(){
      return this.wavesEntities;
    }
    
}


