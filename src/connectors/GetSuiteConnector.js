import axios from 'axios';
import GetSuiteConnectorInterface from '../interfaces/connectors/GetSuiteConnectorInterface';
import WaveEntity from '../entities/WaveEntity';
import SuiteEntity from '../entities/SuiteEntity';

export default class GetSuiteConnector extends GetSuiteConnectorInterface {
    constructor(userId, suiteId) {
        super();

        this.userId = userId;
        this.suiteId = suiteId;
        this.url = `${process.env.REACT_APP_URL}${this.userId}/suites/${this.suiteId}`;
    }

    getSuite() {
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
          this.suiteEntity = new SuiteEntity(response.data.suite.id, response.data.suite.name, response.data.suite.date, response.data.suite.user_id, response.data.suite.username);
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


