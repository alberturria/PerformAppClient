import axios from 'axios';
import GetRmsSectionsConnectorInterface from '../interfaces/connectors/GetRmsSectionsConnectorInterface';
import SectionEntity from '../entities/SectionEntity';

export default class GetRmsSectionsConnector extends GetRmsSectionsConnectorInterface {
    constructor(waveId) {
        super();

        this.waveId = waveId;
        this.url = `${process.env.REACT_APP_URL}get-rms-sections/${this.waveId}`;
    }

    getRmsSections() {
        axios.defaults.withCredentials = true;
        return fetch(this.url)
        .then(response => response.json())
          .then((rmsSections) => {
            const returnedSections = [];
            
            for (let index = 0; index < Object.keys(rmsSections).length; index++){
              const rmsSectionEntity = new SectionEntity(rmsSections[index]._start, rmsSections[index]._end, rmsSections[index]._values[0], this.waveId);
              
              returnedSections.push(rmsSectionEntity);
            }

            return returnedSections;
        })

    }
}


