import LogUserUseCaseInterface from '../interfaces/useCases/LogUserUseCaseInterface.js';
import LogUserConnector from '../connectors/LogUserConnector.js';

export default class LogUserUseCase extends LogUserUseCaseInterface {

    constructor(email, password) {
        super();
        this.email = email;
        this.password = password
        this.logUserConnector = new LogUserConnector(this.email, this.password);
    }

    run() {
        return this.logUserConnector.logUser();
            
    }

    getUserId() {
        return this.logUserConnector.getUserId();
    }
}