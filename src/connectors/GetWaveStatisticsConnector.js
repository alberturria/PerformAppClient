import axios from 'axios';
import DiagnosisEntity from '../entities/DiagnosisEntity';
import GetWaveStatisticsConnectorInterface from '../interfaces/connectors/GetWaveStatisticsConnectorInterface';
import WaveStatisticsEntity from '../entities/WaveStatisticsEntity';

export default class GetWaveStatisticsConnector extends GetWaveStatisticsConnectorInterface{
    constructor(userId, suiteId) {
        super();

        this.userId = userId;
        this.suiteId = suiteId;
        this.url = `${process.env.REACT_APP_URL}${this.userId}/wave-statistics/${this.suiteId}`;
    }

    getStatistics() {
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
          this.returnedStatistics = [];
          const data = response.data;

          for (let index = 0; index < Object.keys(data).length; index++){
            const statisticEntity = new WaveStatisticsEntity(data[index]._id, data[index].kurtosis, data[index].entropy, data[index].maximum, data[index].minimum, data[index].zero_crossing_counts,
               data[index].arithmetic_mean, data[index].harmonic_mean, data[index].geometric_mean, data[index].trimmed_mean, data[index].median, data[index].mode, data[index].variance, data[index].energy,
               data[index].mdf, data[index].mnf);
            
              this.returnedStatistics.push(statisticEntity);
          }
        })
        .catch(error => console.log(error))
      
      }

      getStatisticsEntities(){
        return this.returnedStatistics;
      }
    
}


