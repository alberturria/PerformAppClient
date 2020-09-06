
import NewSuiteUseCaseInterface from '../interfaces/useCases/NewSuiteUseCaseInterface.js';
import NewSuiteConnector from '../connectors/NewSuiteConnector.js';

export default class NewSuiteUseCase extends NewSuiteUseCaseInterface {

    constructor(userEntity, suiteEntity) {
        super();
        this.userEntity = userEntity;
        this.suiteEntity = suiteEntity;
        this.newSuiteConnector = new NewSuiteConnector(this.userEntity, this.suiteEntity);
    }

    run() {
        return this.newSuiteConnector.createSuite();
    }
}