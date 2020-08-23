import EditSuiteUseCaseInterface from "../interfaces/useCases/EditSuiteUseCaseInterface";
import EditSuiteConnector from "../connectors/EditSuiteConnector";

export default class EditSuiteUseCase extends EditSuiteUseCaseInterface {

    constructor(userId, suiteEntity) {
        super();
        this.userId = userId;
        this.suiteEntity = suiteEntity;
        this.editSuiteConnector = new EditSuiteConnector(this.userId, this.suiteEntity);
    }

    run() {
        return this.editSuiteConnector.editSuite();
            
    }

    getDiagnosisEntity() {
        return this.editSuiteConnector.getSuiteEntity();
    }


}