import axios from 'axios';
import LogUserConnectorInterface from '../interfaces/connectors/LogUserConnectorIntrerface';

export default class LogUserConnector extends LogUserConnectorInterface {
    constructor(email, password) {
        super();

        this.email = email;
        this.password = password;
        this.userId = null;
        this.url = `https://performapp.herokuapp.com/log-user`;
    }

    logUser() {
      /*
        axios.defaults.xsrfHeaderName = "X-CSRFToken";
        axios.defaults.xsrfCookieName = 'csrftoken';
        const data = {email: this.email, password: this.password}
        
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
        .catch(error => this.userInfo = {userId: null, username: null })
        */

       const data = {email: this.email, password: this.password}
       
       return fetch(this.url, {
         method: 'POST', // or 'PUT'
         body: JSON.stringify(data), // data can be `string` or {object}!
         headers:{
           'Content-Type': 'application/json'
         }
       }).then(res => res.json())
       .catch(error => 
        console.error('Error:', error)
        )
       .then(response => 
        console.log('Success:', response)
        );
      }

      

    getUserId(){
      return this.userInfo;
    }

    
}


