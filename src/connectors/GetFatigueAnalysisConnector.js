import axios from 'axios';
import WaveStatisticsEntity from '../entities/WaveStatisticsEntity';
import GetFatigueAnalysisConnectorInterface from '../interfaces/connectors/GetFatigueAnalysisConnectorInterface';
import FatigueEntity from '../entities/FatigueEntity';

export default class GetFatigueAnalysisConnector extends GetFatigueAnalysisConnectorInterface{
    constructor(userId, suiteId) {
        super();

        this.userId = userId;
        this.suiteId = suiteId;
        this.url = `${process.env.REACT_APP_URL}${this.userId}/fatigue-analysis/${this.suiteId}`;
    }

    getFatigueAnalysis() {
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
          this.returnedFatigues = [];
          const data = response.data;

          for (let index = 0; index < Object.keys(data).length; index++){
            const fatigueEntity = new FatigueEntity(data[index].muscle_1_power, data[index].muscle_1_name, data[index].muscle_2_power, data[index].muscle_2_name);
            
              this.returnedFatigues.push(fatigueEntity);
          }
        })
        .catch(error => console.log(error))
      
      }

      getFatigueEntities(){
        return this.returnedFatigues;
      }
    
}


