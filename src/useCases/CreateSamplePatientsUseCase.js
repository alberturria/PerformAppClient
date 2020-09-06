import CreateSamplePatientsUseCaseInterface from '../interfaces/useCases/CreateSamplePatientsUseCaseInterface.js';
import CreateSamplePatientsConnector from '../connectors/CreateSamplePatientsConnector.js';

export default class CreateSamplePatientsUseCase extends CreateSamplePatientsUseCaseInterface {

    constructor(userEntity) {
        super();
        this.userEntity = userEntity;
        this.createSamplePatientsConnector = new CreateSamplePatientsConnector(this.userEntity);
    }

    run() {
        return this.createSamplePatientsConnector.createSamplePatients();
            
    }

    getPatients() {
        return this.createSamplePatientsConnector.getPatients();
    }
}