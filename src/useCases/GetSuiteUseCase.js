import DeleteSuiteUseCaseInterface from "../interfaces/useCases/DeleteSuiteUseCaseInterface";
import DeleteSuiteConnector from "../connectors/DeleteSuiteConnector";
import GetSuiteUseCaseInterface from "../interfaces/useCases/GetSuiteUseCaseInterface";
import GetSuiteConnector from "../connectors/GetSuiteConnector";

export default class GetSuiteUseCase extends GetSuiteUseCaseInterface {

    constructor(userEntity, suiteId) {
        super();
        this.userEntity = userEntity;
        this.suiteId = suiteId;
        this.getSuiteConnector = new GetSuiteConnector(this.userEntity, this.suiteId);
    }

    run() {
        return this.getSuiteConnector.getSuite();
            
    }

    getSuiteEntity() {
        return this.getSuiteConnector.getSuiteEntity();
    }

    getWavesEntities() {
        return this.getSuiteConnector.getWavesEntities();
    }
}