import GetAllSuitesUseCaseInterface from "../interfaces/useCases/GetAllSuitesUseCaseInterface";
import GetAllSuitesConnector from "../connectors/GetAllSuitesConnector";

export default class GetAllSuitesUseCase extends GetAllSuitesUseCaseInterface {

    constructor(userId) {
        super();
        this.userId = userId;
        this.getAllSuitesConnector = new GetAllSuitesConnector(this.userId);
    }

    run() {
        return this.getAllSuitesConnector.getAllSuites();
            
    }

    getResult() {
        return this.getAllSuitesConnector.getSuites();
    }
}