import CreateSampleDataUseCaseInterface from '../interfaces/useCases/CreateSampleDataUseCaseInterface.js';
import CreateSampleDataConnector from '../connectors/CreateSampleDataConnector.js';

export default class CreateSampleDataUseCase extends CreateSampleDataUseCaseInterface {

    constructor(userId) {
        super();
        this.userId = userId;
        this.createSampleDataConnector = new CreateSampleDataConnector(this.userId);
    }

    run() {
        return this.createSampleDataConnector.createSampleData();
    }
}