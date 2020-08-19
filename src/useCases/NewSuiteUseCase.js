
import NewSuiteUseCaseInterface from '../interfaces/useCases/NewSuiteUseCaseInterface.js';
import NewSuiteConnector from '../connectors/NewSuiteConnector.js';

export default class NewSuiteUseCase extends NewSuiteUseCaseInterface {

    constructor(userId, suiteEntity) {
        super();
        this.userId = userId;
        this.suiteEntity = suiteEntity;
        this.newSuiteConnector = new NewSuiteConnector(this.userId, this.suiteEntity);
    }

    run() {
        return this.newSuiteConnector.createSuite();
    }
}