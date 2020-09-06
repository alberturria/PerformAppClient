import EditSuiteUseCaseInterface from "../interfaces/useCases/EditSuiteUseCaseInterface";
import EditSuiteConnector from "../connectors/EditSuiteConnector";

export default class EditSuiteUseCase extends EditSuiteUseCaseInterface {

    constructor(userEntity, suiteEntity) {
        super();
        this.userEntity = userEntity;
        this.suiteEntity = suiteEntity;
        this.editSuiteConnector = new EditSuiteConnector(this.userEntity, this.suiteEntity);
    }

    run() {
        return this.editSuiteConnector.editSuite();
            
    }

    getDiagnosisEntity() {
        return this.editSuiteConnector.getSuiteEntity();
    }


}