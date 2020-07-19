import GetRmsSectionsUseCaseInterface from "../interfaces/useCases/GetRmsSectionsUseCaseInterface";
import GetRmsSectionsConnector from "../connectors/GetRmsSectionsConnector";

export default class GetRmsSectionsUseCase extends GetRmsSectionsUseCaseInterface {

    constructor(waveId) {
        super();
        this.waveId = waveId;
        this.GetRmsSectionsConnector = new GetRmsSectionsConnector(waveId);
    }

    run() {
        return this.GetRmsSectionsConnector.getRmsSections().then((sections) => this.sections = sections);
            
    }

    getRmsSections() {
        return this.sections;
    }
}