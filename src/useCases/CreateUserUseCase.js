import CreateUserConnector from '../connectors/CreateUserConnector.js';
import CreateUserUseCaseInterface from '../interfaces/useCases/CreateUserUseCaseInterface.js';

export default class CreateUserUseCase extends CreateUserUseCaseInterface {

    constructor(username, email, password) {
        super();
        this.username = username;
        this.email = email;
        this.password = password
        this.createUserConnector = new CreateUserConnector(this.username, this.email, this.password);
    }

    run() {
        return this.createUserConnector.createUser();
            
    }

    getUserId() {
        return this.createUserConnector.getUserId();
    }
}