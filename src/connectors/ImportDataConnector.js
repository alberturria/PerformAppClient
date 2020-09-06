import axios from 'axios';
import ImportDataConnectorInterface from '../interfaces/connectors/ImportDataConnectorInterface';

export default class ImportDataConnector extends ImportDataConnectorInterface {
    constructor(userEntity, data) {
        super();

        this.userEntity = userEntity;
        this.formData = new FormData();
        this.formData.append('file', data);
        this.url = `${process.env.REACT_APP_URL}import-data/${this.userEntity.userId}`;
    }

    import() {
        axios.defaults.withCredentials = true;
        return axios({
          method: 'post',
          url: this.url,
          data: this.formData,
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Token ${this.userEntity.token}`
          },
          withCredentials: false,
      })
        .then((response) => 
        {
          this.userInfo = {userId: response.data.user_id, username: response.data.username };
        })
        .catch(error => console.log(error))
      
      }

    getUserId(){
      return this.userInfo;
    }

    
}


