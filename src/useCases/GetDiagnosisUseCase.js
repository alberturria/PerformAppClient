import GetDiagnosisUseCaseInterface from "../interfaces/useCases/GetDiagnosisUseCaseInterface";
import GetDiagnosisConnector from "../connectors/GetDiagnosisConnector";

export default class GetDiagnosisUseCase extends GetDiagnosisUseCaseInterface {

    constructor(userEntity, diagnosisId) {
        super();
        this.userEntity = userEntity;
        this.diagnosisId = diagnosisId;
        this.getDiagnosisConnector = new GetDiagnosisConnector(this.userEntity, this.diagnosisId);
    }

    run() {
        return this.getDiagnosisConnector.getDiagnosis();
            
    }

    getDiagnosisEntity() {
        return this.getDiagnosisConnector.getDiagnosisEntity();
    }


}