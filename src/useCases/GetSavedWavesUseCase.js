import GetSavedWavesUseCaseInterface from '../interfaces/useCases/GetSavedWavesUseCaseInterface.js';
import GetSavedWavesConnector from '../connectors/GetSavedWavesConnector.js';

export default class GetSavedWavesUseCase extends GetSavedWavesUseCaseInterface {

    constructor() {
        super();
        this.getSavedWavesConnector = new GetSavedWavesConnector();
    }

    run() {
        return this.getSavedWavesConnector.getSavedWaves().then((returnedWaves) => this.savedWaves = returnedWaves);
            
    }

    getSavedWaves() {
        return this.savedWaves;
    }
}