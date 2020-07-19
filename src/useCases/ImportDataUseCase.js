import ImportDataUseCaseInterface from "../interfaces/useCases/ImportDataUseCaseInterface";
import ImportDataConnector from "../connectors/ImportDataConnector";

export default class ImportDataUseCase extends ImportDataUseCaseInterface {

    constructor(userId, data) {
        super();
        this.userId = userId;
        this.data = data;
        this.importDataConnector = new ImportDataConnector(this.userId, this.data);
    }

    run() {
        return this.importDataConnector.import();
            
    }
}