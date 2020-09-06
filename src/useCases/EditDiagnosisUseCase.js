import EditDiagnosisUseCaseInterface from "../interfaces/useCases/EditDiagnosisUseCaseInterface";
import EditDiagnosisConnector from "../connectors/EditDiagnosisConnector";

export default class EditDiagnosisUseCase extends EditDiagnosisUseCaseInterface {

    constructor(userEntity, diagnosisEntity) {
        super();
        this.userEntity = userEntity;
        this.diagnosisEntity = diagnosisEntity;
        this.editDiagnosisConnector = new EditDiagnosisConnector(this.userEntity, this.diagnosisEntity);
    }

    run() {
        return this.editDiagnosisConnector.editDiagnosis();
            
    }

    getDiagnosisEntity() {
        return this.editDiagnosisConnector.getDiagnosisEntity();
    }


}