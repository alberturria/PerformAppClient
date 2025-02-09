import axios from 'axios';
import SendMailConnectorInterface from '../interfaces/connectors/SendMailConnectorInterface';

export default class SendMailConnector extends SendMailConnectorInterface {
    constructor(userEntity, suiteId, selectOptions) {
        super();

        this.userEntity = userEntity;
        this.suiteId = suiteId;
        this.selectOptions = selectOptions;
        this.url = `${process.env.REACT_APP_URL}${this.userEntity.userId}/send-mail/${this.suiteId}`;
    }

    sendMail() {
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
      .catch((error) => { 
          return error;
        })
      }
}


