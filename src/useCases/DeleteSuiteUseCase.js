import DeleteSuiteUseCaseInterface from "../interfaces/useCases/DeleteSuiteUseCaseInterface";
import DeleteSuiteConnector from "../connectors/DeleteSuiteConnector";

export default class DeleteSuiteUseCase extends DeleteSuiteUseCaseInterface {

    constructor(userId, suiteId) {
        super();
        this.userId = userId;
        this.suiteId = suiteId;
        this.deleteSuiteConnector = new DeleteSuiteConnector(this.userId, this.suiteId);
    }

    run() {
        return this.deleteSuiteConnector.deleteSuite();
            
    }
}