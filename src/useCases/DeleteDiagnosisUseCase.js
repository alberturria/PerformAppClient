import DeleteDiagnosisUseCaseInterface from "../interfaces/useCases/DeleteDiagnosisUseCaseInterface";
import DeleteDiagnosisConnector from "../connectors/DeleteDiagnosisConnector";

export default class DeleteDiagnosisUseCase extends DeleteDiagnosisUseCaseInterface {

    constructor(userId, diagnosisId) {
        super();
        this.userId = userId;
        this.diagnosisId = diagnosisId;
        this.deleteDiagnosisConnector = new DeleteDiagnosisConnector(this.userId, this.diagnosisId);
    }

    run() {
        return this.deleteDiagnosisConnector.deleteDiagnosis();    
    }
}