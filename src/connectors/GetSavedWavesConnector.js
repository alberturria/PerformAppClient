import GetSavedWavesConnectorInterface from '../interfaces/connectors/GetSavedWavesConnectorInterface.js';
import axios from 'axios';
import WaveEntity from '../entities/WaveEntity.js';



export default class GetSavedWavesConnector extends GetSavedWavesConnectorInterface {
    constructor() {
        super();

        this.url = `${process.env.REACT_APP_URL}`;
    }

    getSavedWaves() {
        axios.defaults.withCredentials = true;
        return fetch(this.url)
        .then(response => response.json())
          .then((savedWaves) => {
            const returnedWaves = [];
            for (let index = 0; index < Object.keys(savedWaves).length; index++){
              const id = savedWaves[index]._id;
              const muscle = savedWaves[index]._muscle;
              const rms = savedWaves[index]._rms;
              const raw = savedWaves[index]._raw;
              const avgRms = savedWaves[index]._avg_rms;
              const mvc = savedWaves[index]._mvc;
              const historicMvc = savedWaves[index]._historic_mvc;
              const waveEntity = new WaveEntity(id, muscle, rms, raw, avgRms, mvc, historicMvc);
              returnedWaves.push(waveEntity);
            }

            return returnedWaves;
        })

    }
}


