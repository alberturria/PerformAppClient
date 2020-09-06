import ImportDataUseCaseInterface from "../interfaces/useCases/ImportDataUseCaseInterface";
import ImportDataConnector from "../connectors/ImportDataConnector";

export default class ImportDataUseCase extends ImportDataUseCaseInterface {

    constructor(userEntity, data) {
        super();
        this.userEntity = userEntity;
        this.data = data;
        this.importDataConnector = new ImportDataConnector(this.userEntity, this.data);
    }

    run() {
        return this.importDataConnector.import();
            
    }
}