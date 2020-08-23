import GetDiagnosisUseCaseInterface from "../interfaces/useCases/GetDiagnosisUseCaseInterface";
import GetDiagnosisConnector from "../connectors/GetDiagnosisConnector";

export default class GetDiagnosisUseCase extends GetDiagnosisUseCaseInterface {

    constructor(userId, diagnosisId) {
        super();
        this.userId = userId;
        this.diagnosisId = diagnosisId;
        this.getDiagnosisConnector = new GetDiagnosisConnector(this.userId, this.diagnosisId);
    }

    run() {
        return this.getDiagnosisConnector.getDiagnosis();
            
    }

    getDiagnosisEntity() {
        return this.getDiagnosisConnector.getDiagnosisEntity();
    }


}