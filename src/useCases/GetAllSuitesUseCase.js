import GetAllSuitesUseCaseInterface from "../interfaces/useCases/GetAllSuitesUseCaseInterface";
import GetAllSuitesConnector from "../connectors/GetAllSuitesConnector";

export default class GetAllSuitesUseCase extends GetAllSuitesUseCaseInterface {

    constructor(userEntity) {
        super();
        this.userEntity = userEntity;
        this.getAllSuitesConnector = new GetAllSuitesConnector(this.userEntity);
    }

    run() {
        return this.getAllSuitesConnector.getAllSuites();
            
    }

    getResult() {
        return this.getAllSuitesConnector.getSuites();
    }
}