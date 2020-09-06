import DeleteSuiteUseCaseInterface from "../interfaces/useCases/DeleteSuiteUseCaseInterface";
import DeleteSuiteConnector from "../connectors/DeleteSuiteConnector";

export default class DeleteSuiteUseCase extends DeleteSuiteUseCaseInterface {

    constructor(userEntity, suiteId) {
        super();
        this.userEntity = userEntity;
        this.suiteId = suiteId;
        this.deleteSuiteConnector = new DeleteSuiteConnector(this.userEntity, this.suiteId);
    }

    run() {
        return this.deleteSuiteConnector.deleteSuite();
            
    }
}