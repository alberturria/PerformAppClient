import CreateSampleDataUseCaseInterface from '../interfaces/useCases/CreateSampleDataUseCaseInterface.js';
import CreateSampleDataConnector from '../connectors/CreateSampleDataConnector.js';

export default class CreateSampleDataUseCase extends CreateSampleDataUseCaseInterface {

    constructor(userEntity) {
        super();
        this.userEntity = userEntity;
        this.createSampleDataConnector = new CreateSampleDataConnector(this.userEntity);
    }

    run() {
        return this.createSampleDataConnector.createSampleData();
    }
}