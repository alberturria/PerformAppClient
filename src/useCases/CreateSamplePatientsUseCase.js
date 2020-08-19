import CreateSamplePatientsUseCaseInterface from '../interfaces/useCases/CreateSamplePatientsUseCaseInterface.js';
import CreateSamplePatientsConnector from '../connectors/CreateSamplePatientsConnector.js';

export default class CreateSamplePatientsUseCase extends CreateSamplePatientsUseCaseInterface {

    constructor(userId) {
        super();
        this.userId = userId;
        this.createSamplePatientsConnector = new CreateSamplePatientsConnector(this.userId);
    }

    run() {
        return this.createSamplePatientsConnector.createSamplePatients();
            
    }

    getPatients() {
        return this.createSamplePatientsConnector.getPatients();
    }
}