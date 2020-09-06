
import NewDiagnosisUseCaseInterface from '../interfaces/useCases/NewDiagnosisUseCaseInterface.js';
import NewDiagnosisConnector from '../connectors/NewDiagnosisConnector.js';

export default class NewDiagnosisUseCase extends NewDiagnosisUseCaseInterface {

    constructor(userEntity, diagnosisEntity) {
        super();
        this.userEntity = userEntity;
        this.diagnosisEntity = diagnosisEntity;
        this.newDiagnosisConnector = new NewDiagnosisConnector(this.userEntity, this.diagnosisEntity);
    }

    run() {
        return this.newDiagnosisConnector.createDiagnosis();
    }
}