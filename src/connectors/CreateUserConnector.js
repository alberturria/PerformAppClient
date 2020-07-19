import axios from 'axios';
import CreateUserConnectorInterface from '../interfaces/connectors/CreateUserConnectorInterface';

export default class CreateUserConnector extends CreateUserConnectorInterface {
    constructor(username, email, password) {
        super();

        this.username = username;
        this.email = email;
        this.password = password;
        this.url = `${process.env.REACT_APP_URL}create-user`;
    }

    createUser() {
        axios.defaults.withCredentials = true;
        const data = {username: this.username, email: this.email, password: this.password}
        return axios({
          method: 'post',
          url: this.url,
          data: data,
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
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


