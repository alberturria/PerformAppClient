import axios from 'axios';
import ExportSuiteConnectorInterface from '../interfaces/connectors/ExportSuiteConnectorInterface';

export default class ExportSuiteConnector extends ExportSuiteConnectorInterface {
    constructor(userEntity, suiteId, selectOptions) {
        super();

        this.userEntity = userEntity;
        this.suiteId = suiteId;
        this.selectOptions = selectOptions;
        this.url = `${process.env.REACT_APP_URL}${this.userEntity.userId}/export-to-pdf/${this.suiteId}`;
    }

    export() {
        axios.defaults.withCredentials = true;
        return axios({
          method: 'post',
          url: this.url,
          data: this.selectOptions,
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Token ${this.userEntity.token}`
          },
          withCredentials: false,
      })
        .then((response) => 
        {
          const blob = new Blob([response.data], {type: 'application/pdf'});
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Report.pdf`);
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => { 
          return error;
        })
      }    
}


