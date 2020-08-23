
import NewDiagnosisUseCaseInterface from '../interfaces/useCases/NewDiagnosisUseCaseInterface.js';
import NewDiagnosisConnector from '../connectors/NewDiagnosisConnector.js';

export default class NewDiagnosisUseCase extends NewDiagnosisUseCaseInterface {

    constructor(userId, diagnosisEntity) {
        super();
        this.userId = userId;
        this.diagnosisEntity = diagnosisEntity;
        this.newDiagnosisConnector = new NewDiagnosisConnector(this.userId, this.diagnosisEntity);
    }

    run() {
        return this.newDiagnosisConnector.createDiagnosis();
    }
}