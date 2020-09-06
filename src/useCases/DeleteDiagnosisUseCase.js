import DeleteDiagnosisUseCaseInterface from "../interfaces/useCases/DeleteDiagnosisUseCaseInterface";
import DeleteDiagnosisConnector from "../connectors/DeleteDiagnosisConnector";

export default class DeleteDiagnosisUseCase extends DeleteDiagnosisUseCaseInterface {

    constructor(userEntity, diagnosisId) {
        super();
        this.userEntity = userEntity;
        this.diagnosisId = diagnosisId;
        this.deleteDiagnosisConnector = new DeleteDiagnosisConnector(this.userEntity, this.diagnosisId);
    }

    run() {
        return this.deleteDiagnosisConnector.deleteDiagnosis();    
    }
}