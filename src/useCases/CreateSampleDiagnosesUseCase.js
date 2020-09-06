import CreateSampleDiagnosesUseCaseInterface from '../interfaces/useCases/CreateSampleDiagnosesUseCaseInterface.js';
import CreateSampleDiagnosesConnector from '../connectors/CreateSampleDiagnosesConnector.js';

export default class CreateSampleDiagnosesUseCase extends CreateSampleDiagnosesUseCaseInterface {

    constructor(userEntity) {
        super();
        this.userEntity = userEntity;
        this.createSampleDiagnosesConnector = new CreateSampleDiagnosesConnector(this.userEntity);
    }

    run() {
        return this.createSampleDiagnosesConnector.createSampleDiagnoses();
            
    }

    getDiagnoses() {
        return this.createSampleDiagnosesConnector.getDiagnoses();
    }
}