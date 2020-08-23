import EditDiagnosisUseCaseInterface from "../interfaces/useCases/EditDiagnosisUseCaseInterface";
import EditDiagnosisConnector from "../connectors/EditDiagnosisConnector";

export default class EditDiagnosisUseCase extends EditDiagnosisUseCaseInterface {

    constructor(userId, diagnosisEntity) {
        super();
        this.userId = userId;
        this.diagnosisEntity = diagnosisEntity;
        this.editDiagnosisConnector = new EditDiagnosisConnector(this.userId, this.diagnosisEntity);
    }

    run() {
        return this.editDiagnosisConnector.editDiagnosis();
            
    }

    getDiagnosisEntity() {
        return this.editDiagnosisConnector.getDiagnosisEntity();
    }


}