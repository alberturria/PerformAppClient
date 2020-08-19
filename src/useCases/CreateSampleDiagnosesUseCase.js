import CreateSampleDiagnosesUseCaseInterface from '../interfaces/useCases/CreateSampleDiagnosesUseCaseInterface.js';
import CreateSampleDiagnosesConnector from '../connectors/CreateSampleDiagnosesConnector.js';

export default class CreateSampleDiagnosesUseCase extends CreateSampleDiagnosesUseCaseInterface {

    constructor(userId) {
        super();
        this.userId = userId;
        this.createSampleDiagnosesConnector = new CreateSampleDiagnosesConnector(this.userId);
    }

    run() {
        return this.createSampleDiagnosesConnector.createSampleDiagnoses();
            
    }

    getDiagnoses() {
        return this.createSampleDiagnosesConnector.getDiagnoses();
    }
}